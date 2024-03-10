import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IEventDataAttendant, IEventDataClient, IEventModalProps } from "../../types/components/EventModal";
import { classes } from "../../util/classes";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import EventEdit from "./EventEdit";
import EventView from "./EventView";
import styles from "./eventModal.module.css";

export default function EventModal({
    event,
    open,
    onClose,
    mode = "view"
}: IEventModalProps) {

    const { addToast } = useToastsContext()

    const [viewMode, setViewMode] = useState<"edit" | "view" | "create">(mode)
    const [client, setClient] = useState<IEventDataClient>()
    const [attendants, setAttendants] = useState<IEventDataAttendant[]>([])
    const [clientLoading, setClientLoading] = useState(false)
    const [attendantsLoading, setAttendantsLoading] = useState(false)

    function handleClose() {
        setClient(undefined)
        setAttendants([])
        setViewMode("view")
        onClose()
    }

    function handleAction() {
        if (viewMode == "edit")
            setViewMode("view")
        else
            setViewMode("edit")
    }

    async function fetchClient() {
        setClientLoading(true)

        try {
            const data = await clientService.getClientById(event!.clientId)

            setClient(data)
        }
        catch (error) {
            console.error(error)
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao obter o cliente associado ao evento",
                message: message,
                type: "error"
            })
        }
        finally {
            setClientLoading(false)
        }
    }

    async function fetchAttendants() {
        setAttendantsLoading(true)

        try {
            var attendantsData: IEventDataAttendant[] = []

            for (const attendant of event!.eventAttendants) {
                const data = await clientService.getAttendantById(attendant.attendantId)
                attendantsData.push(data)
            }

            setAttendants(attendantsData)
        }
        catch (error) {
            console.error(error)
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao obter os atendentes associados ao evento",
                message: message,
                type: "error"
            })
        }
        finally {
            setAttendantsLoading(false)
        }
    }

    useEffect(() => {
        if (event) {
            if (event.clientId)
                fetchClient()
            if (event.eventAttendants)
                fetchAttendants()
        }
    }, [open, event])

    useEffect(() => {
        setViewMode(mode)
    }, [mode]);

    function getModeComponent() {
        switch (viewMode) {
            case "edit":
                return (
                    <EventEdit
                        event={event}
                        client={client}
                        attendants={attendants}
                        eventClientLoading={clientLoading}
                        eventAttendantsLoading={attendantsLoading}
                        onActionClick={handleAction}
                    />
                )
            case "view":
                return (
                    <EventView
                        event={event}
                        client={client}
                        attendants={attendants}
                        eventClientLoading={clientLoading}
                        eventAttendantsLoading={attendantsLoading}
                        onActionClick={handleAction}
                    />
                )
            case "create":
                return (
                    <EventEdit
                        onActionClick={handleAction}
                    />
                )
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            center
            showCloseIcon={false}
            classNames={{
                modal: classes(styles.modal, "modal")
            }}
        >
            {getModeComponent()}
        </Modal>
    )
}