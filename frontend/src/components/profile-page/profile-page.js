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
import {amber} from "@mui/material/colors";
import {useSelector} from "react-redux";
import PasswordIcon from '@mui/icons-material/Password';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEditForm from "./profile-edit-form";
import PasswordChangeForm from "./password-change-form";
import {useTranslation} from "react-i18next";
import YardIcon from '@mui/icons-material/Yard';

export default function ProfilePage() {
    const { t } = useTranslation();
    const user_profile = useSelector((state) => state.user);

    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid rowSpacing={1} columnSpacing={5} sx={{height: "80vh"}} container>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Typography variant="h5" mb={3} textAlign={"center"}>
                                    {t('ProfilePage.profile_title')}
                                </Typography>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.username')}: {user_profile.username}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.email')}: {user_profile.email}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('ProfilePage.company_name')}: {user_profile.name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Stack direction={"column"}>
                                    <Typography variant="body1" textAlign={"center"}>
                                        {t('form.description')}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1" textAlign={"center"}>
                                        {user_profile.description}
                                    </Typography>
                                </Stack>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('ProfilePage.timezone')}: {user_profile.timezone}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                    <PasswordChangeForm/>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                    <ProfileEditForm {...user_profile}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Typography variant="h5" mb={3} textAlign={"center"}>
                                    Pricing info
                                </Typography>
                                <Card>
                                    <Box sx={{ height: 70, background: amber[300] }}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Premium
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
                                            Appointment recommendations: yes
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
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}