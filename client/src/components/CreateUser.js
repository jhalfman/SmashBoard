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
    const [errors, setErrors] = useState(null)
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
        .then(resp => {
            if (resp.ok) {
                resp.json().then(user => {
                    setCurrentUser(user)
                    navigate(`/`)
                })
            }
            else {
                resp.json().then(data => {
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                }) 
            }
        })
    }

  return (
    <form onSubmit={submitNewUserForm}>
        <h1>Enter username and password</h1>
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <br></br>
        <TextField required label="Username" variant="outlined" name="username" onChange={updateNewUserForm}/>
        <br></br>
        <br></br>
        <TextField required type="password" label="Password" variant="outlined"  name="password" onChange={updateNewUserForm}/>
        <br></br>
        <br></br>
        <Button type="submit" variant="contained">Create</Button>
    </form>
  )
}

export default CreateUser