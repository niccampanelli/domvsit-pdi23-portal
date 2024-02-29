import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import Done from "../../../../assets/icons/done.svg?react";
import { useToastsContext } from "../../../../context/Toasts";
import clientService from "../../../../services/clientService";
import { IEventAttedantsModalProps } from "../../../../types/components/EventModal";
import { IListAttendantResponseItem, ListAttendantResponseType } from "../../../../types/services/clientService";
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault";
import getInitials from "../../../../util/getInitials";
import getRandomColor from "../../../../util/getRandomColor";
import Input from "../../../Input";
import Spinner from "../../../Spinner";
import styles from "./attendantModal.module.css";
import { classes } from "../../../../util/classes";

export default function AttendantsModal({
    open,
    onClose,
    handleSelectAttendants,
    clientId,
    consultorId
}: IEventAttedantsModalProps) {

    const { addToast } = useToastsContext()

    const [search, setSearch] = useState("")
    const [attendants, setAttendants] = useState<Array<IListAttendantResponseItem & { selected?: boolean }>>([])
    const [selected, setSelected] = useState<Array<IListAttendantResponseItem & { selected?: boolean }>>([])
    const [pageData, setPageData] = useState<Omit<ListAttendantResponseType, "data"> | undefined>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)

    async function fetchAttendants() {
        setLoading(true)

        try {
            const data = await clientService.listAttendant({
                page,
                limit,
                search,
                clientId
            })

            setPageData(data)
            setAttendants(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar os participantes",
                message: message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    function detectBottom(e: any) {
        const element = e.target

        const scrollBottom = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight

        if (scrollBottom && !loading) {
            setPage(prev => prev + 1)
        }
    }

    function selectAttendant(attendant: IListAttendantResponseItem) {
        setAttendants(previous => {
            return previous.map(item => {
                if (item.id === attendant.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }

                return item
            })
        })
    }

    useEffect(() => {
        fetchAttendants()
    }, [])

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            fetchAttendants()
        }, 500)

        return () => clearTimeout(searchTimeout)
    }, [search])

    useEffect(() => {
        if (attendants.length > 0) {
            setSelected(attendants.filter(attendant => attendant.selected))
        }
    }, [attendants])

    useEffect(() => {
        if (selected.length > 0) {
            handleSelectAttendants(selected)
        }
    }, [selected])

    return (
        <Modal
            open={open}
            onClose={onClose}
            center
            showCloseIcon={false}
            classNames={{
                modal: classes(styles.modal, "modal")
            }}
        >
            <div className={styles.content}>
                <Input
                    placeholder="Buscar"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                {selected.length > 0 &&
                    <>
                        <div className={styles.section}>
                            <h3 className={styles.subtitle}>
                                Selecionados
                            </h3>
                            <ul className={styles.selectedList}>
                                {selected.map(attendant => (
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
                            </ul>
                            <p className={styles.selectedNames}>
                                {selected.map(attendant => attendant.name).join(", ")}.
                            </p>
                        </div>
                        <div className="separator" />
                    </>
                }
                <div className={styles.section}>
                    <ul
                        className={styles.list}
                    >
                        {loading ?
                            <Spinner />
                            :
                            attendants.map(attendant => (
                                <div
                                    key={attendant.id}
                                    className={styles.item}
                                    onClick={() => selectAttendant(attendant)}
                                >
                                    <div
                                        className={styles.avatar}
                                        style={{
                                            backgroundColor: getRandomColor()
                                        }}
                                    >
                                        {getInitials(attendant.name)}
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.name}>
                                            {attendant.name}
                                        </p>
                                        <p className={styles.role}>
                                            {attendant.role}
                                        </p>
                                    </div>
                                    {attendant.selected &&
                                        <Done className={styles.checked} />
                                    }
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Modal>
    )
}