import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink as Link} from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNight = () => {
    const [nightForm, setNightForm] = useState({
        name: ""
    })
    let navigate = useNavigate();

    function updateNightForm(e) {
       setNightForm({
        name: e.target.value
       })
    }

    function submitNightForm(e) {
        e.preventDefault();
        fetch(`/nights`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...nightForm, user_id: 1})
        })
        .then(resp => resp.json())
        .then(data => navigate(`/nights/${data.id}`))
    }

  return (
    <>
    <form onSubmit={(e) => submitNightForm(e)}>
        <label>Enter a title for a new game session</label>
        <br></br>
        <TextField id="outlined-basic" label="Session Title" variant="outlined" onChange={updateNightForm} value={nightForm.name}/>
        <br></br>
        <Button type="submit" variant="contained">Create</Button>
    </form>
    <Link to="/nights"><Button variant="contained" color="success">Back to Night List</Button></Link>
    </>
  )
}

export default CreateNight