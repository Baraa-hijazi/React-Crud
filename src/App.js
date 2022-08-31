import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './Navbar'
import Users from './Users'
import UserCreate from './UserCreate'
// import axios from 'axios';
//
// axios.defaults.baseURL = 'http://localhost:7000/'
// axios.defaults.headers.common = {'Authorization': `${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIlVzZXJuYW1lIjoiYWRtaW4iLCJqdGkiOiI0NWQwZTM5Yy0xNjcwLTRjM2YtOGM1Ny03OGZiOGE4ZTYwM2EiLCJpYXQiOjYzNzk3NTUwNjA4OTE4MDI0MSwibmJmIjoxNjYxOTQzMDA4LCJleHAiOjE2NjIwMjk0MDgsImlzcyI6IkFkbWluIiwiYXVkIjoiQWRtaW4ifQ.rIZ8EfzDR9CUys5aKAp9zWPKxGit_yzB-z5_RiLtqAc}`}


export default function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Users/>

                <Routes>
                    <Route exact path='/' component={Users}/>
                    <Route exact path='/create' component={UserCreate}/>
                </Routes>
            </div>
        </Router>
    );
}