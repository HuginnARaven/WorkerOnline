import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";


export default function DevblogPage() {
    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid rowSpacing={1} columnSpacing={5} sx={{height: "85vh"}} justifyContent={"center"} alignContent={"center"} container>
                    <Typography gutterBottom variant="h1" component="div">
                        Work in progress!
                    </Typography>
                </Grid>
            </Box>
        </Container>

    );
}