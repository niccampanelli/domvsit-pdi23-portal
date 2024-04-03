import { GroupsOutlined } from "@mui/icons-material"
import { Autocomplete, Card, CardContent, CardHeader, CircularProgress, InputAdornment, MenuItem, Paper, TextField, Typography, useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { AnimatePresence, Variants, motion } from "framer-motion"
import moment from "moment"
import { useEffect, useState } from "react"
import { useToastsContext } from "../../../../../../context/Toasts"
import clientService from "../../../../../../services/clientService"
import eventService from "../../../../../../services/eventService"
import { IShowedUpByAttendantItem } from "../../../../../../types/pages/main/admin/dashboard/sections/charts/ShowedUpByAttendantChart"
import { IListClientResponseItem } from "../../../../../../types/services/clientService"
import { getErrorMessageOrDefault } from "../../../../../../util/getErrorMessageOrDefault"
import getTruncatedText from "../../../../../../util/getTruncatedText"
import { useAuthContext } from "../../../../../../context/Auth"

const paperVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 0.8,
    },
    exit: {
        opacity: 0,
    }
}

const MotionPaper = motion(Paper)

export default function AdminDashboardShowedUpByAttendantChart() {

    const theme = useTheme()
    const { user } = useAuthContext()
    const { addToast } = useToastsContext()

    const [showedUpByAttendant, setShowedUpByAttendant] = useState<IShowedUpByAttendantItem[]>([])
    const [searchClient, setSearchClient] = useState("")
    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | null>(null)
    const [clientsLoading, setClientsLoading] = useState(true)
    const [months, setMonths] = useState<1 | 3 | 6 | 12>(1)
    const [loading, setLoading] = useState(true)

    async function fetchClients() {
        setClientsLoading(true)

        try {
            const data = await clientService.listClient({
                search: searchClient,
                page: 1,
                limit: 6,
                consultorId: user?.id
            })

            setClients(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os clientes",
                message,
                type: "error"
            })
        }
        finally {
            setClientsLoading(false)
        }
    }

    async function fetchShowedUpByAttendant() {
        setLoading(true)

        try {

            if (!selectedClient?.id) {
                throw new Error("Selecione um cliente para buscar os dados")
            }

            const data = await eventService.getShowedUpByAttendant({
                months: months,
                clientId: selectedClient?.id
            })

            var items: IShowedUpByAttendantItem[] = []

            for (const item of data) {
                const attendant = await clientService.getAttendantById(item.attendantId);

                if (!attendant) {
                    throw new Error("Participante não encontrado")
                }

                items.push({
                    eventCount: item.eventCount,
                    attendant: {
                        id: attendant.id,
                        name: attendant.name,
                        role: attendant.role
                    }
                })
            }

            setShowedUpByAttendant(items)
        }
        catch (error) {
            console.log(error)
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os dados de eventos não comparecidos por participante",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()
    }, [searchClient])

    useEffect(() => {
        if (selectedClient) {
            fetchShowedUpByAttendant()
        }
        else if (loading) {
            setLoading(false)
        }
    }, [months, selectedClient])

    return (
        <div className="flex flex-1 flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Participantes que menos compareceram
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 400,
                    height: "100%"
                }}
            >
                <CardHeader
                    title={`Participantes que menos compareceram aos eventos com ocorrência desde ${moment().subtract(months, "months").format("MMMM [de] YYYY")} e a quantidade de eventos que não compareceram`}
                    titleTypographyProps={{
                        variant: "h3",
                        className: "text-sm"
                    }}
                    action={
                        <div className="flex gap-4">
                            <Autocomplete
                                autoComplete
                                value={selectedClient}
                                onChange={(_, value) => setSelectedClient(value)}
                                onInputChange={(_, value) => setSearchClient(value)}
                                options={clients}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.name}
                                filterOptions={(x) => x}
                                noOptionsText="Nenhum cliente encontrado"
                                size="small"
                                loading={clientsLoading}
                                loadingText="Carregando..."
                                sx={{
                                    minWidth: 180
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Cliente"
                                        size="small"
                                        InputProps={{
                                            ...params.InputProps,
                                            fullWidth: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <GroupsOutlined />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        {option.name}
                                    </li>
                                )}
                            />
                            <TextField
                                select
                                size="small"
                                label="Período"
                                value={months}
                                onChange={(event) => setMonths(parseInt(event.target.value) as 1 | 3 | 6 | 12)}
                                disabled={!selectedClient || clientsLoading || loading}
                            >
                                <MenuItem
                                    value={1}
                                >
                                    Último mês
                                </MenuItem>
                                <MenuItem
                                    value={3}
                                >
                                    Últimos 3 meses
                                </MenuItem>
                                <MenuItem
                                    value={6}
                                >
                                    Últimos 6 meses
                                </MenuItem>
                                <MenuItem
                                    value={12}
                                >
                                    Último ano
                                </MenuItem>
                            </TextField>
                        </div>
                    }
                    sx={{
                        gap: 4
                    }}
                />
                <CardContent className="relative">
                    <AnimatePresence>
                        {loading &&
                            <MotionPaper
                                key="loading"
                                variants={paperVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                elevation={0}
                                transition={{
                                    duration: 0.2
                                }}
                                sx={{
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 1,
                                    backgroundColor: "background.paper"
                                }}
                            >
                                <CircularProgress size={32} color="primary" />
                            </MotionPaper>
                        }
                    </AnimatePresence>
                    {showedUpByAttendant.length === 0 ?
                        <Paper
                            elevation={0}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 240,
                                backgroundColor: "background.paper"
                            }}
                        >
                            <Typography
                                variant="body1"
                                color="text.secondary"
                            >
                                Nenhum dado disponível
                            </Typography>
                        </Paper>
                        :
                        <BarChart
                            series={[
                                {
                                    data: showedUpByAttendant.map(item => item.eventCount) || [],
                                    color: theme.palette.primary.main,
                                    valueFormatter: (value) => `${value} ${value === 1 ? "evento não comparecido" : "eventos não comparecidos"}`,
                                }
                            ]}
                            yAxis={[
                                {
                                    data: showedUpByAttendant.map(item => item.attendant) || [],
                                    scaleType: "band",
                                    valueFormatter: (value) => `${getTruncatedText(value.name, 32)}\n(${value.role})`,
                                    tickLabelStyle: {
                                        fontWeight: 900
                                    }
                                }
                            ]}
                            xAxis={[
                                {
                                    label: "Eventos não comparecidos",
                                    tickMinStep: 1
                                }
                            ]}
                            margin={{
                                top: 0,
                                bottom: 72,
                                left: 200,
                                right: 10
                            }}
                            layout="horizontal"
                            grid={{
                                vertical: true
                            }}
                            height={440}
                        />
                    }
                </CardContent>
            </Card>
        </div>
    )
}