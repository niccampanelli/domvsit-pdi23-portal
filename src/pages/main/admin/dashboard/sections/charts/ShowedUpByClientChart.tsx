import { Card, CardContent, CardHeader, CircularProgress, MenuItem, Paper, TextField, Typography, useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { AnimatePresence, Variants, motion } from "framer-motion"
import moment from "moment"
import { useEffect, useState } from "react"
import { useToastsContext } from "../../../../../../context/Toasts"
import clientService from "../../../../../../services/clientService"
import eventService from "../../../../../../services/eventService"
import { IShowedUpByClientItem } from "../../../../../../types/pages/main/admin/dashboard/sections/charts/ShowedUpByClientChart"
import { getErrorMessageOrDefault } from "../../../../../../util/getErrorMessageOrDefault"
import getTruncatedText from "../../../../../../util/getTruncatedText"

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

export default function AdminDashboardShowedUpByClientChart() {

    const theme = useTheme()
    const { addToast } = useToastsContext()

    const [showedUpByClient, setShowedUpByClient] = useState<IShowedUpByClientItem[]>([])
    const [months, setMonths] = useState<1 | 3 | 6 | 12>(1)
    const [loading, setLoading] = useState(true)

    async function fetchShowedUpByClient() {
        setLoading(true)

        try {
            const data = await eventService.getShowedUpByClient({
                months: months
            })

            var items: IShowedUpByClientItem[] = []

            for (const item of data) {
                const client = await clientService.getClientById(item.clientId);

                if (!client) {
                    throw new Error("Cliente não encontrado")
                }

                items.push({
                    eventCount: item.eventCount,
                    client: {
                        id: client.id,
                        name: client.name
                    }
                })
            }

            setShowedUpByClient(items)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os dados de eventos não comparecidos por cliente",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShowedUpByClient()
    }, [months])

    return (
        <div className="flex flex-1 flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Clientes que menos compareceram
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 400,
                    height: "100%"
                }}
            >
                <CardHeader
                    title={`Clientes que menos compareceram aos eventos com ocorrência desde ${moment().subtract(months, "months").format("MMMM [de] YYYY")} e a quantidade de eventos que não compareceram`}
                    titleTypographyProps={{
                        variant: "h3",
                        className: "text-sm"
                    }}
                    action={
                        <TextField
                            select
                            size="small"
                            label="Período"
                            value={months}
                            onChange={(event) => setMonths(parseInt(event.target.value) as 1 | 3 | 6 | 12)}
                            disabled={loading}
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
                    {showedUpByClient.length === 0 ?
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
                                    data: showedUpByClient.map(item => item.eventCount) || [],
                                    color: theme.palette.primary.main,
                                    valueFormatter: (value) => `${value} ${value === 1 ? "evento não comparecido" : "eventos não comparecidos"}`,
                                }
                            ]}
                            yAxis={[
                                {
                                    data: showedUpByClient.map(item => item.client.name) || [],
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
                    <Card variant="outlined">
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Um evento é contabilizado como não comparecido pelo cliente quando ao menos um participante daquele cliente não comparece.
                            </Typography>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}