import { IEventModalProps } from "../../types/components/EventModal";
import Modal from "../Modal";
import EventEdit from "./EventEdit";
import EventView from "./EventView";

export default function EventModal({
    event,
    open,
    onClose,
    ...props
}: IEventModalProps) {

    return (
        <Modal
            {...props}
            open={open}
            onClose={onClose}
            title={"Evento"}
        >
            <EventEdit
                event={event!}
            />
        </Modal>
    )
}