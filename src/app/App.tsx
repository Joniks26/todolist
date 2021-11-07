import React, {useEffect} from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/login/Login";
import {Route, Routes} from "react-router-dom"
import {initializeAppTC, logoutTC} from "../features/login/app-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.auth.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())},
        [])

    if(!isInitialized) return <span>load</span>

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={() => dispatch(logoutTC())}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                <Route path='/' element={<TodolistsList demo={demo}/>}/>
                <Route path='/login' element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App


//1:57:00