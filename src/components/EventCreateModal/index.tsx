import { yupResolver } from "@hookform/resolvers/yup";
import { Close, Face3Outlined, FaceOutlined, LinkOutlined, NotesOutlined, TodayOutlined } from "@mui/icons-material";
import { Autocomplete, Avatar, Button, Card, CardHeader, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import eventService from "../../services/eventService";
import { IEventCreateModalFormValues, IEventCreateModalProps } from "../../types/components/EventCreateModal";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getFieldErrorNestedMessages from "../../util/getFieldErrorNestedMessage";
import getInitials from "../../util/getInitials";
import AttendantSearchModal from "../AttendantSearchModal";
import ClientSearchModal from "../ClientSearchModal";
import { useToastsContext } from "../../context/Toasts";
import moment from "moment";

const schema: yup.ObjectSchema<IEventCreateModalFormValues> = yup.object().shape({
    title: yup
        .string()
        .required("Insira um título para o evento"),
    description: yup
        .string()
        .required("Insira uma descrição para o evento"),
    ocurrence: yup
        .date()
        .min(new Date(), "A data do evento deve ser uma data futura")
        .required("Insira uma data para o evento"),
    link: yup
        .string(),
    tags: yup
        .array(
            yup
                .string()
                .required("Insira uma tag válida")
        ),
    client: yup
        .object()
        .shape({
            id: yup
                .number()
                .positive("Selecione um cliente para o evento")
                .integer("Selecione um cliente para o evento")
                .required("Selecione um cliente para o evento"),
            name: yup
                .string()
                .required("O cliente selecionado é inválido")
        })
        .required("Selecione um cliente para o evento"),
    attendants: yup
        .array(
            yup
                .object()
                .shape({
                    id: yup
                        .number()
                        .required("Inclua ao menos um participante para o evento"),
                    name: yup
                        .string()
                        .required("Insira ao menos um participante para o evento")
                })
                .required("Inclua ao menos um participante para o evento")
        )
        .min(1, "Insira ao menos um participante para o evento")
        .required("Insira ao menos um participante para o evento")
})

export default function EventCreateModal({
    open,
    onClose,
    refreshData
}: IEventCreateModalProps) {

    const defaultValues: IEventCreateModalFormValues = {
        title: "",
        description: "",
        ocurrence: new Date(),
        link: "",
        tags: [],
        client: {
            id: 0,
            name: ""
        },
        attendants: []
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        },
        reset,
        getValues,
        setError,
        clearErrors,
        watch,
        resetField
    } = useForm<IEventCreateModalFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { addToast } = useToastsContext()

    const [clientSearchModalOpen, setClientSearchModalOpen] = useState(false)
    const [attendantSearchModalOpen, setAttendantSearchModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleCreate(values: IEventCreateModalFormValues) {
        setLoading(true)

        try {
            const data = await eventService.newEvent({
                title: values.title,
                description: values.description,
                ocurrence: values.ocurrence,
                link: values.link,
                tags: values.tags,
                clientId: values.client.id,
                eventAttendants: values.attendants.map(attendant => ({
                    attendantId: attendant.id
                }))
            })

            if (!data.createdId) {
                throw new Error("Evento não criado")
            }

            addToast({
                title: "Evento criado com sucesso",
                message: "O evento foi criado com sucesso",
                type: "success"
            })

            refreshData()
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
            onClose()
        }
    }

    useEffect(() => {
        resetField("attendants")

        if (watch("client.id") === 0) {
            setError("attendants", {
                type: "deps",
                message: "Primeiro selecione um cliente para adicionar participantes ao evento"
            })
        }
        else {
            clearErrors("attendants")
        }
    }, [watch("client.id")])

    useEffect(() => {
        if (open) {
            reset(defaultValues)
        }
    }, [open])

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(handleCreate)
            }}
        >
            <DialogTitle>
                Novo evento
            </DialogTitle>
            <DialogContent className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Título"
                            fullWidth
                            required
                            error={!!error}
                            helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Descrição detalhada"
                            fullWidth
                            multiline
                            minRows={4}
                            required
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="ocurrence"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            value={moment(field.value).format("YYYY-MM-DDTHH:mm")}
                            onChange={event => field.onChange(new Date(event.target.value))}
                            type="datetime-local"
                            fullWidth
                            required
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TodayOutlined />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="link"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Link onde o evento ocorrerá"
                            type="url"
                            fullWidth
                            required
                            error={!!error}
                            helperText={error?.message}
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
                    render={({ field, fieldState: { error } }) => (
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
                                    error={!!error}
                                    helperText={error?.message || "Pressione Enter para adicionar uma tag"}
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="client"
                    render={({ field, fieldState: { error } }) => (
                        <div className="flex flex-col gap-2">
                            <Typography className="font-bold">
                                Cliente
                            </Typography>
                            {field.value?.id !== 0 &&
                                <Card
                                    variant="outlined"
                                >
                                    <CardHeader
                                        avatar={
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
                                        }
                                        title={
                                            <Typography
                                                variant="h3"
                                                className="font-bold text-base"
                                            >
                                                {field.value.name}
                                            </Typography>
                                        }
                                        action={
                                            <Tooltip
                                                title="Remover cliente"
                                                arrow
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() => field.onChange({ id: 0, name: "" })}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    />
                                </Card>
                            }
                            <Button
                                variant="outlined"
                                fullWidth
                                color={!!error ? "error" : "primary"}
                                onClick={() => setClientSearchModalOpen(true)}
                                startIcon={
                                    <FaceOutlined />
                                }
                            >
                                {field.value.id === 0 ?
                                    "Selecionar cliente"
                                    :
                                    "Alterar cliente"
                                }
                            </Button>
                            {!!error &&
                                <FormHelperText error>
                                    {getFieldErrorNestedMessages(error).join(". ")}
                                </FormHelperText>
                            }
                            <ClientSearchModal
                                open={clientSearchModalOpen}
                                onClose={() => setClientSearchModalOpen(false)}
                                selected={field.value.id === 0 ? undefined : field.value as any}
                                onSelect={client => field.onChange(client ? client : { id: 0, name: "" })}
                            />
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="attendants"
                    render={({ field, fieldState: { error } }) => (
                        <div className="flex flex-col gap-2">
                            <Typography className="font-bold">
                                Participantes
                            </Typography>
                            {field.value.length > 0 &&
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-1">
                                        {field.value.map(attendant => (
                                            <Tooltip
                                                key={attendant.id}
                                                title={attendant.name}
                                                arrow
                                            >
                                                <Avatar
                                                    key={attendant.id}
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
                                        <Tooltip
                                            title="Remover todos"
                                            arrow
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() => field.onChange([])}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Typography
                                        className="text-xs"
                                    >
                                        {field.value.map(attendant => attendant.name).join(", ")}
                                    </Typography>
                                </div>
                            }
                            <Button
                                variant="outlined"
                                fullWidth
                                color={!!error ? "error" : "primary"}
                                onClick={() => setAttendantSearchModalOpen(true)}
                                disabled={getValues("client.id") === 0}
                                startIcon={
                                    <Face3Outlined />
                                }
                            >
                                {field.value.length > 0 ?
                                    "Alterar participantes"
                                    :
                                    "Escolher participantes"
                                }
                            </Button>
                            {!!error &&
                                <FormHelperText error>
                                    {getFieldErrorNestedMessages(error).join(". ")}
                                </FormHelperText>
                            }
                            <AttendantSearchModal
                                open={attendantSearchModalOpen}
                                onClose={() => setAttendantSearchModalOpen(false)}
                                clientId={getValues("client.id")}
                                selected={field.value as any[]}
                                onSelect={attendants => field.onChange(attendants)}
                            />
                        </div>
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    type="submit"
                    disabled={!isDirty || !isValid || loading}
                >
                    {loading ?
                        <CircularProgress size={24} color="inherit" />
                        :
                        "Criar"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}