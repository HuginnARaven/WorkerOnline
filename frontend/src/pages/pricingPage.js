import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Container, Paper, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {amber, blue} from "@mui/material/colors";

export default function PricingPage() {
    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid rowSpacing={1} columnSpacing={5} sx={{height: "85vh"}} justifyContent={"center"} alignContent={"center"} container>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Card>
                                    <Box sx={{ height: 70, background: blue[300] }}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Standard
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Workers management and task appointments tools: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Appointment recommendations: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            General workers logs: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Auto-apportionment: no
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Detailed workers statistics: no
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Tech support priority: no
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Workers report: no
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Tasks voting: no
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Super visor maintenance priority: no
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" disabled>Choose</Button>
                                    </CardActions>
                                </Card>
                                <Typography variant="h5" mt={3} textAlign={"center"}>
                                    Free
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Card>
                                    <Box sx={{ height: 70, background: amber[300] }}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Premium
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Workers management and task appointments tools: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Appointment recommendations: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            General workers logs: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Auto-apportionment: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Detailed workers statistics: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Tech support priority: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Workers report: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Tasks voting: yes
                                        </Typography>
                                        <Divider sx={{mt: 2, mb: 2}}/>
                                        <Typography variant="body2" color="text.secondary">
                                            Super visor maintenance priority: yes
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                                <Typography variant="h5" mt={3} textAlign={"center"}>
                                    Only 20$/month
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}