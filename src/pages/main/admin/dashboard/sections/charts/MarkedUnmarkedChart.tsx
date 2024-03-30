import { Card, CardContent, CardHeader, CircularProgress, MenuItem, Paper, TextField, Typography, useTheme } from "@mui/material"
import { BarChart } from "@mui/x-charts"
import { AnimatePresence, Variants, motion } from "framer-motion"
import moment from "moment"
import { useEffect, useState } from "react"
import { useToastsContext } from "../../../../../../context/Toasts"
import eventService from "../../../../../../services/eventService"
import { GetMarkedUnmarkedResponseType } from "../../../../../../types/services/eventService"
import { getErrorMessageOrDefault } from "../../../../../../util/getErrorMessageOrDefault"

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

export default function AdminDashboardMarkedUnmarkedChart() {

    const theme = useTheme()
    const { addToast } = useToastsContext()

    const [markedUnmarked, setMarkedUnmarked] = useState<GetMarkedUnmarkedResponseType>([])
    const [months, setMonths] = useState<1 | 3 | 6 | 12>(1)
    const [loading, setLoading] = useState(true)

    async function fetchMarkedUnmarked() {
        setLoading(true)

        try {
            const data = await eventService.getMarkedUnmarked({
                months: months
            })

            setMarkedUnmarked(data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os dados de eventos marcados e desmarcados",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMarkedUnmarked()
    }, [months])

    return (
        <div className="flex flex-1 flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Marcados e desmarcados
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 400,
                    height: "100%"
                }}
            >
                <CardHeader
                    title={`Quantidade de eventos marcados e desmarcados por mês com ocorrência desde ${moment().subtract(months, "months").format("MMMM [de] YYYY")}`}
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
                    {markedUnmarked.length === 0 ?
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
                                    data: markedUnmarked.map(item => item.marked) || [],
                                    stack: "total",
                                    id: "Marcados",
                                    label: "Marcados",
                                    color: theme.palette.primary.main
                                },
                                {
                                    data: markedUnmarked.map(item => item.unmarked) || [],
                                    stack: "total",
                                    id: "Desmarcados",
                                    label: "Desmarcados",
                                    color: theme.palette.action.disabled
                                }
                            ]}
                            yAxis={[
                                {
                                    tickMinStep: 1
                                }
                            ]}
                            xAxis={[
                                {
                                    data: markedUnmarked.map(item => moment(item.month).format("MMMM [de] YYYY")) || [],
                                    scaleType: "band"
                                }
                            ]}
                            slotProps={{
                                legend: {
                                    direction: "row",
                                    labelStyle: {
                                        fontSize: theme.typography.body2.fontSize,
                                    },
                                    position: {
                                        horizontal: "middle",
                                        vertical: "bottom"
                                    },
                                    itemMarkHeight: 12,
                                    itemMarkWidth: 12,
                                }
                            }}
                            margin={{
                                top: 10,
                                right: 0,
                                bottom: 80,
                                left: 30
                            }}
                            grid={{
                                horizontal: true
                            }}
                            height={240}
                        />
                    }
                </CardContent>
            </Card>
        </div>
    )
}