import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export const UserList = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const UsersGet = useCallback(async () => {
        const response = await axios.get("https://localhost:7000/API/User/GetValues?pageIndex=1&pageSize=12");
        const {data} = response;
        setUsers(data);
    }, []);

    const UpdateUser = id => {
        navigate('/user-management', {state: {id}});
    };

    const UserDelete = useCallback(async id => {
        const response = await axios.delete(`https://localhost:7000/API/User?id=${id}`);
        if (response.status === 200 || response.status === 202) UsersGet();
    }, []);

    useEffect(() => {
        UsersGet();
    }, [UsersGet]);

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">
                <Paper className={classes.paper}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                USERS
                            </Typography>
                        </Box>
                        <Box>
                            <Link to="/user-management">
                                <Button variant="contained" color="primary">
                                    CREATE
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.result && users.result.map((user, index) => (
                                    <TableRow key={`${user.ID}-${index + 1}-user`}>
                                        <TableCell align="left">{user.id}</TableCell>
                                        <TableCell align="left">{user.userName}</TableCell>
                                        <TableCell align="left">{user.email}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                                    <Button onClick={() => UpdateUser(user.id)} variant="contained"
                                                            color="primary">
                                                        Edit
                                                    </Button>
                                                <Button onClick={() => UserDelete(user.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </div>

    );
}