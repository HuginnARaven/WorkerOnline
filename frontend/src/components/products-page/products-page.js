import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CardMedia, Container, Paper, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {amber, blue, orange} from "@mui/material/colors";
import suo from "../supervisor_v1.jpg"

export default function ProductsPage() {
    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid rowSpacing={1} columnSpacing={5} sx={{height: "85vh"}} justifyContent={"center"} alignContent={"center"} container>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Card>
                                    {/*<Box sx={{ height: 70, background: blue[500] }}/>*/}
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={suo}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Supervisor V1
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Ultrasonic sensor
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Presence logs sending
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Easy to use
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Administration by admins
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Server only settings
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">By now</Button>
                                    </CardActions>
                                </Card>
                                <Typography variant="h5" mt={3} textAlign={"center"}>
                                    50$
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Card>
                                    <Box sx={{ height: 140, background: orange[500] }}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Supervisor V2
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Visual sensor(AI based face recognition)
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Presence logs sending
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Advanced statistics
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Administration by you and admins
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Server and hardware settings
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" disabled>We are working on it</Button>
                                    </CardActions>
                                </Card>
                                <Typography variant="h5" mt={3} textAlign={"center"}>
                                    150$
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}