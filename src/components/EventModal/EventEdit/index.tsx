import { yupResolver } from "@hookform/resolvers/yup"
import moment from "moment"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import ChevronLeft from "../../../assets/icons/chevron_left.svg?react"
import { useAuthContext } from "../../../context/Auth"
import { useToastsContext } from "../../../context/Toasts"
import eventService from "../../../services/eventService"
import { IEventEditProps } from "../../../types/components/EventModal"
import { IListAttendantResponseItem, IListClientResponseItem } from "../../../types/services/clientService"
import { getErrorMessageOrDefault } from "../../../util/getErrorMessageOrDefault"
import getInitials from "../../../util/getInitials"
import getRandomColor from "../../../util/getRandomColor"
import Button from "../../Button"
import Input from "../../Input"
import Spinner from "../../Spinner"
import TagsInput from "../../TagsInput"
import AttendantsModal from "./AttendantsModal"
import ClientsModal from "./ClientsModal"
import styles from "./eventEdit.module.css"

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Insira um título para o evento"),
    description: yup
        .string()
        .required("Insira uma descrição para o evento"),
    tags: yup
        .array()
        .of(
            yup
                .string()
                .required("Insira ao menos uma tag")
        ),
    link: yup
        .string()
        .url("Insira um link válido"),
    ocurrenceDate: yup
        .date()
        .min(moment().add(-1, "d"), "Insira uma data futura")
        .required("Insira uma data para o evento"),
    ocurranceTime: yup
        .string()
        .required("Insira um horário para o evento"),
    client: yup
        .object()
        .shape({
            id: yup
                .number()
                .required(),
            name: yup
                .string()
        })
        .required("Insira um cliente para o evento"),
    consultorId: yup
        .number()
        .required("Insira um consultor para o evento"),
    eventAttendants: yup
        .array()
        .of(
            yup.object().shape({
                id: yup
                    .number()
                    .required(),
                name: yup
                    .string()
            })
        )
        .required("Insira ao menos um participante")
})

export default function EventEdit({
    event,
    client,
    attendants,
    eventClientLoading,
    eventAttendantsLoading,
    onActionClick
}: IEventEditProps) {

    const defaultValues = {
        title: event?.title || "",
        description: event?.description || "",
        tags: event?.tags || [] as string[],
        link: event?.link || "",
        ocurrenceDate: event?.ocurrence || new Date(),
        ocurranceTime: moment(event?.ocurrence).format("HH:mm"),
        client: {
            id: client?.id || 0,
            name: client?.name
        },
        consultorId: event?.consultorId || 0,
        eventAttendants: attendants ? attendants.map(attendant => ({
            id: attendant.id,
            name: attendant.name
        })) : []
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        },
        setValue,
        getValues
    } = useForm({
        mode: 'all',
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { user } = useAuthContext()
    const { addToast } = useToastsContext()

    const [clientModalOpen, setClientModalOpen] = useState(false)
    const [attendantModalOpen, setAttendantModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleSelectClient(client: IListClientResponseItem) {
        setValue("client", {
            id: client.id,
            name: client.name
        })
    }

    function handleSelectAttendants(attendants: IListAttendantResponseItem[]) {
        setValue("eventAttendants", attendants.map(attendant => ({
            id: attendant.id,
            name: attendant.name
        })))
    }

    async function handleCreate(model: any) {
        setLoading(true)

        try {
            const data = await eventService.newEvent({
                title: model.title,
                description: model.description,
                link: model.link,
                tags: model.tags,
                ocurrence: moment(model.ocurrenceDate).toDate(),
                clientId: model.client.id,
                eventAttendants: model.eventAttendants.map((attendant: any) => ({
                    attendantId: attendant.id
                }))
            })

            if (data.createdId) {
                addToast({
                    title: "Evento criado",
                    message: "O evento foi criado com sucesso!",
                    type: "info"
                })
            }
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao criar o evento",
                message: message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    async function handleEdit(model: any) {
        setLoading(true)

        try {
            const data = await eventService.newEvent({
                id: event!.id,
                title: model.title,
                description: model.description,
                link: model.link,
                tags: model.tags,
                ocurrence: moment(model.ocurrenceDate).toDate(),
                clientId: model.client.id,
                eventAttendants: model.eventAttendants.map((attendant: any) => ({
                    attendantId: attendant.id
                }))
            })

            if (data.updatedId) {
                addToast({
                    title: "Evento atualizado",
                    message: "O evento foi atualizado com sucesso!",
                    type: "info"
                })
            }
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao atualizar o evento",
                message: message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (user) {
            setValue("consultorId", user.id)
        }
    }, [user])

    return (
        <>
            <form
                className={styles.content}
                onSubmit={handleSubmit(handleEdit, console.log)}
            >
                <div className={styles.header}>
                    <h2>
                        {event ? "Editar evento" : "Novo evento"}
                    </h2>
                    <button
                        type="button"
                        title="Voltar para a visualização"
                        className={styles.action}
                        onClick={onActionClick}
                    >
                        <ChevronLeft />
                    </button>
                </div>
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            {...field}
                            placeholder="Título*"
                            error={error?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            {...field}
                            placeholder="Descrição*"
                            error={error?.message}
                            lines={4}
                        />
                    )}
                />
                <div className={styles.sectionDouble}>
                    <Controller
                        name="ocurrenceDate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <Input
                                {...field}
                                value={moment(field.value).format("yyyy-MM-DD")}
                                type="date"
                                min={moment().format("yyyy-MM-DD")}
                                error={error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="ocurranceTime"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <Input
                                {...field}
                                type="time"
                                error={error?.message}
                            />
                        )}
                    />
                </div>
                <Controller
                    name="link"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            {...field}
                            placeholder="Link"
                            error={error?.message}
                        />
                    )}
                />
                <div className={styles.section}>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TagsInput
                                {...field}
                                placeholder="Tags"
                                error={error?.message}
                            />
                        )}
                    />
                    <p className={styles.observation}>
                        Descreva o evento com palavras-chave. Separe as tags com vírgula.
                    </p>
                </div>
                <div className={styles.section}>
                    <h3 className={styles.subtitle}>
                        Cliente
                    </h3>
                    {eventClientLoading ?
                        <Spinner />
                        :
                        getValues("client").id !== 0 &&
                        <div className={styles.selectedClient}>
                            <div
                                key={getValues("client").id}
                                className={styles.avatar}
                                style={{
                                    backgroundColor: getRandomColor()
                                }}
                                title={getValues("client").name}
                            >
                                {getInitials(getValues("client").name || "")}
                            </div>
                            <p className={styles.subtitle}>
                                {getValues("client").name}
                            </p>
                        </div>
                    }
                    <Button
                        variant="secondary"
                        onClick={() => setClientModalOpen(true)}
                        type="button"
                    >
                        {getValues("client").id === 0 ?
                            "Selecionar cliente"
                            :
                            "Trocar cliente"
                        }
                    </Button>
                </div>
                <div className={styles.section}>
                    <h3 className={styles.subtitle}>
                        Participantes
                    </h3>
                    {eventAttendantsLoading ?
                        <Spinner />
                        :
                        getValues("eventAttendants").length > 0 &&
                        <div className={styles.selectedList}>
                            {getValues("eventAttendants").map((attendant: any) => (
                                <div
                                    key={attendant.id}
                                    className={styles.avatar}
                                    style={{
                                        backgroundColor: getRandomColor()
                                    }}
                                    title={attendant.name}
                                >
                                    {getInitials(attendant.name)}
                                </div>
                            ))}
                        </div>
                    }
                    <Button
                        variant="secondary"
                        onClick={() => setAttendantModalOpen(true)}
                        type="button"
                    >
                        Adicionar participantes
                    </Button>
                </div>
                <Button
                    type="submit"
                    disabled={!isDirty || !isValid || loading}
                >
                    {loading ?
                        <Spinner
                            size={1}
                            color="white"
                        />
                        :
                        "Salvar"
                    }
                </Button>
            </form>
            <ClientsModal
                open={clientModalOpen}
                onClose={() => setClientModalOpen(false)}
                handleSelectClient={handleSelectClient}
                consultorId={getValues("consultorId")}
            />
            <AttendantsModal
                open={attendantModalOpen}
                onClose={() => setAttendantModalOpen(false)}
                handleSelectAttendants={handleSelectAttendants}
                clientId={getValues("client").id}
                consultorId={getValues("consultorId")}
            />
        </>
    )
}