import React, {useState} from 'react'
import '../../styles/Login.css'
import { Container, TextField, Button, Typography, Grid } from '@mui/material';



function Signup() {

    return (
        <Container>
            <Grid>
                <Grid>
                    <Typography variant='h4' align='center' gutterBottom className='title'>
                        Create Your Account!
                    </Typography>
                    <form>
                        <Grid>
                            <Grid>
                                <TextField
                                placeholder='First Name'
                                fullWidth
                                label="First Name"
                                variant='outlined'
                                InputProps={{ style: { color: 'white'} }} 
                                 />
                            </Grid>

                            <Grid>
                                <TextField
                                placeholder='Last Name'
                                fullWidth
                                label="Last Name"
                                variant='outlined'
                                InputProps={{ style: { color: 'white'} }} 
                                 />
                            </Grid>

                            <Grid>
                                <TextField
                                placeholder='Email'
                                fullWidth
                                label="Email"
                                variant='outlined'
                                InputProps={{ style: { color: 'white'} }} 
                                 />
                            </Grid>
                            <Grid>
                                <Button
                                fullWidth
                                variant='contained'
                                type='submit'
                                color='success'

                                >
                                    Create Your Account
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}


export default Signup