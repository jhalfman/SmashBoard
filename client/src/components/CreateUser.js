import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = ( {setCurrentUser} ) => {
    const [newUserForm, setNewUserForm] = useState({
        username: "",
        password: ""
    })
    let navigate = useNavigate();

    function updateNewUserForm(e) {
        const newForm = {
            ...newUserForm,
            [e.target.name]: e.target.value
        }
        setNewUserForm(newForm)
    }

    function submitNewUserForm(e) {
        e.preventDefault()
        fetch(`/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...newUserForm, admin: false})
        })
        .then(resp => resp.json())
        .then(user => {
            setCurrentUser(user)
            navigate(`/`)
        })
    }

  return (
    <form onSubmit={submitNewUserForm}>
        <h1>Enter username and password</h1>
        <br></br>
        <TextField required id="outlined-basic" label="Username" variant="outlined" name="username" onChange={updateNewUserForm}/>
        <br></br>
        <br></br>
        <TextField required id="outlined-basic" type="password" label="Password" variant="outlined"  name="password" onChange={updateNewUserForm}/>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained">Create</Button>
    </form>
  )
}

export default CreateUser