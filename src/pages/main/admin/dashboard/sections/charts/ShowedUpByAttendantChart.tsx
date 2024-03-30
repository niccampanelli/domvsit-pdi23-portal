import { Autocomplete, Card, CardContent, CardHeader, InputAdornment, MenuItem, Paper, TextField, Typography, useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { Variants, motion } from "framer-motion"
import moment from "moment"
import { useState } from "react"
import { useToastsContext } from "../../../../../../context/Toasts"
import { IListClientResponseItem } from "../../../../../../types/services/clientService"
import getTruncatedText from "../../../../../../util/getTruncatedText"
import { GroupsOutlined } from "@mui/icons-material"

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
    const { addToast } = useToastsContext()

    // const [showedUpByClient, setShowedUpByClient] = useState<IShowedUpByAttendantItem[]>([])
    const [searchClient, setSearchClient] = useState("")
    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | null>(null)
    const [clientsLoading, setClientsLoading] = useState(true)
    const [months, setMonths] = useState<1 | 3 | 6 | 12>(1)
    // const [loading, setLoading] = useState(true)

    // async function fetchShowedUpByClient() {
    //     setLoading(true)

    //     try {
    //         const data = await eventService.getShowedUpByClient({
    //             months: months
    //         })

    //         var items: IShowedUpByAttendantItem[] = []

    //         for (const item of data) {
    //             var client = await clientService.getAttendantById(item.clientId);

    //             if (!client) {
    //                 throw new Error("Participante não encontrado")
    //             }

    //             items.push({
    //                 eventCount: item.eventCount,
    //                 client: {
    //                     id: client.id,
    //                     name: client.name
    //                 }
    //             })
    //         }

    //         setShowedUpByClient(items)
    //     }
    //     catch (error) {
    //         const message = getErrorMessageOrDefault(error)

    //         addToast({
    //             title: "Erro ao buscar os dados de eventos não comparecidos por cliente",
    //             message,
    //             type: "error"
    //         })
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchShowedUpByClient()
    // }, [months])

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
                        <div>
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
                    {/* <AnimatePresence>
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
                    </AnimatePresence> */}
                    {false ?
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
                                    data: [
                                        12, 10, 8
                                    ],
                                    color: theme.palette.primary.main,
                                    valueFormatter: (value) => `${value} ${value === 1 ? "evento não comparecido" : "eventos não comparecidos"}`,
                                }
                            ]}
                            yAxis={[
                                {
                                    data: [
                                        "Participante 1", "Participante 2", "Participante 3"
                                    ],
                                    scaleType: "band",
                                    valueFormatter: (value) => getTruncatedText(value, 12),
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
                                left: 100,
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