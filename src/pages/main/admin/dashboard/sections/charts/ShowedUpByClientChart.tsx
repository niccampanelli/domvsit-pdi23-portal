import { Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function AdminDashboardShowedUpByClientChart() {

    const theme = useTheme()

    return (
        <div className="flex flex-1 flex-col gap-2">
            <Typography
                variant="h2"
                className="text-xl font-bold"
            >
                Clientes que compareceram
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 400
                }}
            >
                <CardHeader
                    title="Clientes que mais compareceram"
                    titleTypographyProps={{
                        variant: "h3",
                        className: "text-sm"
                    }}
                />
                <CardContent>
                    <BarChart
                        series={[
                            {
                                data: [
                                    1, 4, 8, 3
                                ],
                                stack: "total",
                                id: "Marcados",
                                label: "Marcados",
                                color: theme.palette.primary.main
                            },
                            {
                                data: [
                                    2, 3, 6, 4
                                ],
                                stack: "total",
                                id: "Desmarcados",
                                label: "Desmarcados",
                                color: theme.palette.action.disabled
                            }
                        ]}
                        xAxis={[
                            {
                                data: [
                                    "Janeiro", "Fevereiro", "Março", "Abril"
                                ],
                                scaleType: "band"
                            }
                        ]}
                        layout="horizontal"
                        grid={{
                            vertical: true
                        }}
                        height={240}
                    />
                </CardContent>
            </Card>
        </div>
    )
}