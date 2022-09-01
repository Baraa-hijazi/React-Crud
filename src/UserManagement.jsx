import React, {useEffect, useState, useCallback} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const UserManagement = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const getUsersDetailes = useCallback(async () => {
        const response = await axios.get(`https://localhost:7000/API/User?id=${state.id}`);
        const {data} = response;
        if (response.status === 200 || response.status === 202 || response.status === 201) {
            setUsername(data.userName);
            setEmail(data.email);
        }
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        const payload = {
            'username': username,
            'email': email,
            'password': password,
        }
        let response = null;

        if (state && state.id) response = await axios.put(`https://localhost:7000/API/User?id=${state.id}`, payload);
        else response = await axios.post("https://localhost:7000/API/User", payload);

        if (response.status === 200 || response.status === 202 || response.status === 201) navigate('/');
    }

    useEffect(() => {
        if(state) getUsersDetailes();
    }, [getUsersDetailes, state]);

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {state && state.id ? 'Update' : 'Create'} User
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                value={username}
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                id="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                id="password"
                                label="Password"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {state && state.id ? 'Update' : 'Create'}
                    </Button>
                </form>
            </div>
        </Container>
    );
}