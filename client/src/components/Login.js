import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ( {setCurrentUser} ) => {
    const [currentUserForm, setcurrentUserForm] = useState({
        username: "",
        password: ""
    })
    let navigate = useNavigate();

    function updatecurrentUserForm(e) {
        const newForm = {
            ...currentUserForm,
            [e.target.name]: e.target.value
        }
        setcurrentUserForm(newForm)
    }

    function submitcurrentUserForm(e) {
        e.preventDefault()
        fetch(`/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...currentUserForm})
        })
        .then(resp => resp.json())
        .then(user => {
            setCurrentUser(user)
            navigate(`/`)
        })
    }

  return (
    <form onSubmit={submitcurrentUserForm}>
        <h1>Log In to Existing Account</h1>
        <br></br>
        <TextField required label="Username" variant="outlined" name="username" onChange={updatecurrentUserForm}/>
        <br></br>
        <br></br>
        <TextField required type="password" label="Password" variant="outlined"  name="password" onChange={updatecurrentUserForm}/>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained">Log In</Button>
    </form>
  )
}
export default Login