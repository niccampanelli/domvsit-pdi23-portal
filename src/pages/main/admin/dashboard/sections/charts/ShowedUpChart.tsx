import { Card, CardContent, CardHeader, CircularProgress, MenuItem, Paper, TextField, Typography, useTheme } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import { AnimatePresence, Variants, motion } from "framer-motion"
import moment from "moment"
import { useEffect, useState } from "react"
import { useToastsContext } from "../../../../../../context/Toasts"
import eventService from "../../../../../../services/eventService"
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

export default function AdminDashboardShowedUpChart() {

    const theme = useTheme()
    const { addToast } = useToastsContext()

    const [showedUpPercentage, setShowedUpPercentage] = useState(0)
    const [months, setMonths] = useState<1 | 3 | 6 | 12>(1)
    const [loading, setLoading] = useState(true)

    async function fetchShowedUpPercentage() {
        setLoading(true)

        try {
            const data = await eventService.getShowedUpPercentages({
                months: months
            })

            setShowedUpPercentage(data.showedUpPercentage)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar dados de comparecimento",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShowedUpPercentage()
    }, [months])

    return (
        <div className="flex flex-1 flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Comparecimento
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 240,
                    height: "100%"
                }}
            >
                <CardHeader
                    title={`Comparecimento dos participantes em todos os eventos que ocorreram desde ${moment().subtract(months, "months").format("MMMM [de] YYYY")}`}
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
                    <PieChart
                        series={[
                            {
                                data: [
                                    {
                                        label: "Compareceram",
                                        value: showedUpPercentage,
                                        color: theme.palette.primary.main
                                    },
                                    {
                                        label: "Não compareceram",
                                        value: 100 - showedUpPercentage,
                                        color: theme.palette.action.disabled
                                    }
                                ],
                                innerRadius: 30,
                                paddingAngle: 2,
                                cornerRadius: 4,
                                valueFormatter: (item) => `${item.value}%`,
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
                            top: 0,
                            right: 0,
                            bottom: 60,
                            left: 0
                        }}
                        height={240}
                    />
                </CardContent>
            </Card>
        </div>
    )
}