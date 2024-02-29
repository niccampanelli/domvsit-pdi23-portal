import { useEffect, useState } from "react"
import Modal from "react-responsive-modal"
import Done from "../../../../assets/icons/done.svg?react"
import { useToastsContext } from "../../../../context/Toasts"
import clientService from "../../../../services/clientService"
import { IEventClientsModalProps } from "../../../../types/components/EventModal"
import { IListClientResponseItem, ListClientResponseType } from "../../../../types/services/clientService"
import { getErrorMessageOrDefault } from "../../../../util/getErrorMessageOrDefault"
import getInitials from "../../../../util/getInitials"
import getRandomColor from "../../../../util/getRandomColor"
import Input from "../../../Input"
import Spinner from "../../../Spinner"
import styles from "./clientsModal.module.css"
import { classes } from "../../../../util/classes"

export default function ClientsModal({
    open,
    onClose,
    handleSelectClient,
    consultorId
}: IEventClientsModalProps) {

    const { addToast } = useToastsContext()

    const [search, setSearch] = useState("")
    const [clients, setClients] = useState<Array<IListClientResponseItem & { selected?: boolean }>>([])
    const [selected, setSelected] = useState<IListClientResponseItem>()
    const [pageData, setPageData] = useState<Omit<ListClientResponseType, "data"> | undefined>()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)

    async function fetchClients() {
        setLoading(true)

        try {
            const data = await clientService.listClient({
                page,
                limit,
                search,
                consultorId
            })

            setPageData(data)
            setClients(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar os clientes",
                message: message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    function selectClient(client: IListClientResponseItem) {
        setClients(clients.map(c => {
            c.selected = c.id === client.id
            return c
        }))

        setSelected(client)
        handleSelectClient(client)
    }

    useEffect(() => {
        fetchClients()
    }, [])

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            fetchClients()
        }, 500)

        return () => clearTimeout(searchTimeout)
    }, [search])

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
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar cliente"
                />
                {selected &&
                    <>
                        <div className={styles.section}>
                            <h3 className={styles.subtitle}>
                                Cliente selecionado
                            </h3>
                            <div className={styles.selected}>
                                <div
                                    key={selected.id}
                                    className={styles.avatar}
                                    style={{
                                        backgroundColor: getRandomColor()
                                    }}
                                    title={selected.name}
                                >
                                    {getInitials(selected.name)}
                                </div>
                                <p className={styles.subtitle}>
                                    {selected.name}
                                </p>
                            </div>
                        </div>
                    </>
                }
                <div className={styles.section}>
                    <ul className={styles.list}>
                        {loading ?
                            <Spinner />
                            :
                            clients.map(client => (
                                <div
                                    key={client.id}
                                    className={styles.item}
                                    onClick={() => selectClient(client)}
                                >
                                    <div
                                        className={styles.avatar}
                                        style={{
                                            backgroundColor: getRandomColor()
                                        }}
                                    >
                                        {getInitials(client.name)}
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.name}>
                                            {client.name}
                                        </p>
                                        <p className={styles.email}>
                                            {client.email}
                                        </p>
                                    </div>
                                    {client.selected &&
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