import { Grid } from "@mui/material";
import ClientCardLoading from "../../../../components/ClientCard/loading";

export default function GridLoadingClients() {

    return (
        <>
            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>

            <Grid item xs={2} md={3}>
                <ClientCardLoading />
            </Grid>
        </>
    )

}