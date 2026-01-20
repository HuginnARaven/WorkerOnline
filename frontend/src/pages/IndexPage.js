import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import Image from "mui-image";
import {useTranslation} from "react-i18next";

export default function IndexPage() {
    const { t } = useTranslation();

    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid rowSpacing={1} columnSpacing={5} justifyContent={"center"} alignContent={"center"} container>
                    <Grid xs={12} sm={6} item>
                        <Grid item sx={{height: "100%"}}>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Typography sx={{height: "100%"}} paragraph>
                                    {t('IndexPage.problem')}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Image shift="left"
                                   src={"https://d1tm14lrsghf7q.cloudfront.net/public/uploads/7NVgWmTWdDNFYHhIHGdhwMq7GvkGI4RypQn0LQbD.jpg"}/>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Image shift="right"
                                   src={"https://assets-global.website-files.com/5f4457266e6bc413f94c5229/6077179e29d958aa332f42fa_a6377ac7-b3a3-468e-a4b5-64b77eee6a54_Functional%25252BWorkspace%25252BDesign.jpeg"}/>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid sx={{height: "100%"}} item>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Typography paragraph>
                                    {t('IndexPage.about_us')}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item sx={{height: "100%"}}>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Typography sx={{height: "100%"}} paragraph>
                                    {t('IndexPage.main_users')}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Image shift="left"
                                   src={"https://www.amexessentials.com/wp-content/uploads/2018/08/opener-home-workspace.jpg"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}