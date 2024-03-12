import { yupResolver } from "@hookform/resolvers/yup";
import { LinkOutlined, NotesOutlined, UndoOutlined } from "@mui/icons-material";
import { Autocomplete, Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormHelperText, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import eventService from "../../services/eventService";
import { IEventEditModalFormValues, IEventEditModalProps } from "../../types/components/EventEditModal";
import { IGetAttendantByIdResponse } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";
import AttendantSearchModal from "../AttendantSearchModal";
import ClientSearchModal from "../ClientSearchModal";

const schema: yup.ObjectSchema<IEventEditModalFormValues> = yup.object({
    title: yup
        .string()
        .required("Informe o título do evento"),
    description: yup
        .string()
        .required("Informe a descrição do evento")
        .max(500, "A descrição deve ter no máximo 500 caracteres"),
    ocurrence: yup
        .date()
        .required("Informe a data do evento")
        .min(new Date(), "A data do evento deve ser uma data futura")
        .typeError("Informe uma data válida"),
    link: yup
        .string()
        .url("Informe uma URL válida"),
    tags: yup
        .array()
        .of(
            yup
                .string()
                .required("Informe a tag")
        ),
    client: yup
        .object()
        .shape({
            id: yup
                .number()
                .required("Informe o cliente"),
            name: yup
                .string()
                .required("Informe o cliente")
        })
        .required("Adicione um cliente")
        .typeError("Adicione um cliente"),
    attendants: yup
        .array()
        .of(
            yup
                .object()
                .shape({
                    id: yup
                        .number()
                        .required("Informe o participante"),
                    name: yup
                        .string()
                        .required("Informe o participante")
                })
                .required("Informe o participante")
        )
        .required("Adicione ao menos um participante")
        .typeError("Adicione ao menos um participante")
        .min(1, "Adicione ao menos um participante")
})

export default function EventEditModal({
    open,
    onClose,
    event,
    openViewModal
}: IEventEditModalProps) {

    const { addToast } = useToastsContext()

    const defaultValues: IEventEditModalFormValues = {
        title: "",
        description: "",
        ocurrence: new Date(),
        link: "",
        tags: [],
        client: undefined,
        attendants: undefined
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        },
        reset
    } = useForm<IEventEditModalFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const [clientSearchModalOpen, setClientSearchModalOpen] = useState(false)
    const [attendantSearchModalOpen, setAttendantSearchModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function fetchClient() {
        try {
            const data = await clientService.getClientById(event!.clientId)
            return data
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar o cliente",
                message,
                type: "error"
            })
        }
    }

    async function fetchAttendants() {
        try {
            var attendants: IGetAttendantByIdResponse[] = []

            for (const attendant of event!.eventAttendants) {
                const data = await clientService.getAttendantById(attendant.attendantId)
                attendants.push(data)
            }

            return attendants
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar os participantes",
                message,
                type: "error"
            })
        }
    }

    async function setDefaultValues() {
        const client = await fetchClient()
        const attendants = await fetchAttendants()

        reset({
            title: event?.title,
            description: event?.description,
            ocurrence: event?.ocurrence,
            link: event?.link,
            tags: event?.tags,
            client: client,
            attendants: attendants
        })
    }

    function handleClose() {
        reset(defaultValues)
        onClose()
    }

    function handleOpenViewModal() {
        if (event) {
            onClose()
            openViewModal!(event)
        }
    }

    async function editEvent(data: IEventEditModalFormValues) {
        setLoading(true)

        try {
            await eventService.update({
                id: event!.id!,
                title: data.title === event!.title ? undefined : data.title,
                description: data.description === event!.description ? undefined : data.description,
                ocurrence: data.ocurrence === event!.ocurrence ? undefined : data.ocurrence,
                link: data.link === event!.link ? undefined : data.link,
                tags: data.tags === event!.tags ? undefined : data.tags,
                clientId: data.client!.id === event!.clientId ? undefined : data.client!.id!,
                eventAttendants: data.attendants!.map(attendant => ({
                    attendantId: attendant.id!
                }))
            })

            addToast({
                title: "Evento editado",
                message: "O evento foi editado com sucesso",
                type: "success"
            })

            handleClose()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao editar o evento",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    async function createEvent(data: IEventEditModalFormValues) {
        setLoading(true)

        try {
            const response = await eventService.newEvent({
                title: data.title,
                description: data.description,
                ocurrence: data.ocurrence,
                link: data.link,
                tags: data.tags,
                clientId: data.client!.id!,
                eventAttendants: data.attendants!.map(attendant => ({
                    attendantId: attendant.id!
                }))
            })

            if (!response.createdId) {
                throw new Error("Erro ao criar o evento")
            }

            addToast({
                title: "Evento criado",
                message: "O evento foi criado com sucesso",
                type: "success"
            })

            handleClose()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao criar o evento",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    async function onSubmit(data: IEventEditModalFormValues) {
        if (event) {
            await editEvent(data)
        }
        else {
            await createEvent(data)
        }
    }

    useEffect(() => {
        if (event) {
            setDefaultValues()
        }
        else {
            reset(defaultValues)
        }
    }, [event])

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit)
            }}
        >
            <DialogTitle>
                {event ? "Editar evento" : "Novo evento"}
            </DialogTitle>
            <DialogContent className="flex flex-col items-start gap-4">
                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Título do evento"
                            autoComplete="on"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotesOutlined />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Descrição do evento"
                            autoComplete="on"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            multiline
                            rows={4}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="ocurrence"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DDTHH:mm")}
                            type="datetime-local"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="link"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Link do evento"
                            autoComplete="url"
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkOutlined />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="tags"
                    render={({ field, fieldState }) => (
                        <div
                            className="w-full"
                        >
                            <Autocomplete
                                onChange={(_, value) => field.onChange(value)}
                                value={field.value}
                                options={[]}
                                multiple
                                fullWidth
                                freeSolo
                                renderTags={(value, props) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option}
                                            color="primary"
                                            {...props({ index })}
                                        />
                                    ))
                                }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        placeholder="Tags"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <FormHelperText>
                                Digite a tag e pressione Enter para adicionar
                            </FormHelperText>
                        </div>
                    )}
                />
                <Divider
                    className="w-full"
                />
                <Controller
                    control={control}
                    name="client"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            {field.value &&
                                <div
                                    className="flex flex-col gap-2"
                                >
                                    <Typography
                                        className="font-bold"
                                    >
                                        Cliente
                                    </Typography>
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        <Avatar
                                            alt={field.value.name}
                                            sx={{
                                                bgcolor: getColorFromString(field.value.name),
                                                fontSize: 14,
                                                width: 32,
                                                height: 32
                                            }}
                                        >
                                            {getInitials(field.value.name)}
                                        </Avatar>
                                        <Typography
                                            className="font-bold"
                                        >
                                            {field.value.name}
                                        </Typography>
                                    </div>
                                </div>
                            }
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setClientSearchModalOpen(true)}
                                color={error ? "error" : "primary"}
                            >
                                {field.value ? "Alterar cliente" : "Adicionar cliente"}
                            </Button>
                            {error &&
                                <FormHelperText
                                    error={!!error}
                                >
                                    {error?.message}
                                </FormHelperText>
                            }
                            <ClientSearchModal
                                open={clientSearchModalOpen}
                                onClose={() => setClientSearchModalOpen(false)}
                                selected={field.value as any}
                                onSelect={client => field.onChange(client)}
                            />
                        </>
                    )}
                />
                <Controller
                    control={control}
                    name="attendants"
                    render={({ field, fieldState: { error } }) => (
                        <>
                            {((field.value?.length ?? 0) > 0) &&
                                <div
                                    className="flex flex-col gap-2"
                                >
                                    <Typography
                                        className="font-bold"
                                    >
                                        Participantes
                                    </Typography>
                                    <div
                                        className="flex items-center gap-2"
                                    >
                                        {field.value?.map((attendant, index) => (
                                            <Tooltip
                                                key={index}
                                                title={attendant.name}
                                                arrow
                                            >
                                                <Avatar
                                                    alt={attendant.name}
                                                    sx={{
                                                        bgcolor: getColorFromString(attendant.name),
                                                        fontSize: 14,
                                                        width: 32,
                                                        height: 32
                                                    }}
                                                >
                                                    {getInitials(attendant.name)}
                                                </Avatar>
                                            </Tooltip>

                                        ))}
                                    </div>
                                </div>
                            }
                            <Button
                                fullWidth
                                variant="outlined"
                                color={error ? "error" : "primary"}
                                onClick={() => setAttendantSearchModalOpen(true)}
                            >
                                {(field.value?.length ?? 0 > 0) ? "Alterar participantes" : "Adicionar participantes"}
                            </Button>
                            {error &&
                                <FormHelperText
                                    error={!!error}
                                >
                                    {error?.message}
                                </FormHelperText>
                            }
                            <AttendantSearchModal
                                open={attendantSearchModalOpen}
                                onClose={() => setAttendantSearchModalOpen(false)}
                                selected={field.value as any[]}
                                onSelect={attendants => field.onChange(attendants)}
                            />
                        </>
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    disabled={!isDirty || !isValid || loading}
                    type="submit"
                >
                    Salvar
                </Button>
            </DialogActions>
            {(openViewModal && event) &&
                <Tooltip
                    title="Cancelar edição"
                    placement="left"
                    arrow
                >
                    <Fab
                        className="fixed bottom-8 right-8"
                        onClick={handleOpenViewModal}
                    >
                        <UndoOutlined />
                    </Fab>
                </Tooltip>
            }
        </Dialog>
    )
}