import React, {Component} from 'react';
import {  Container  } from 'reactstrap';
import {Link} from 'react-router-dom'
import { Typography , Paper , Avatar , Button  , FormControl , Input , InputLabel} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

class SignIn extends Component {
    render() {
        return (
            <div>
                <Container>
                    <div className='center'>
                        <Paper className='paper my-5 p-4'>
                            <div className='center'>
                                <Avatar className='bg-primary'>
                                    <LockOutlinedIcon/>
                                </Avatar>
                            </div>
                            <Typography component="h1" className='center' variant="h5">
                                Sign in
                            </Typography>
                            <form  noValidate autoComplete="off">

                                <FormControl margin='normal' required fullWidth >
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input  name="username" id="username"  type='text' autoComplete='off' autoFocus ></Input>
                                </FormControl>

                                <FormControl margin='normal' required fullWidth >
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input  name="email" id="email" type='email' autoComplete='off' autoFocus ></Input>
                                </FormControl>

                                <FormControl margin='normal' required fullWidth >
                                    <InputLabel htmlFor="pass">Password</InputLabel>
                                    <Input  name="pass" id="pass"  type='password' autoComplete='off' autoFocus ></Input>
                                </FormControl>
                                <Button className='mt-2' type="submit" fullWidth variant="outlined" color="primary" >Sign up</Button>
                                <Button className='mt-2'  fullWidth variant="outlined" color="primary" component={Link} to={'/signin'} >Sign In</Button>
                                <Button  className='mt-2'  fullWidth variant="outlined" color="secondary" component={Link} to={'/'}>Home page</Button>
                            </form>
                        </Paper>
                    </div>
                </Container>
            </div>

        );
    }
}

export default SignIn;
