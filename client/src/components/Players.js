import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react';

const Players = ({players, createNewPlayer}) => {
    const [newPlayerForm, setNewPlayerForm] = useState({
        name: ""
    })
    const [showNewForm, setShowNewForm] = useState(false)

    function updateNewPlayerForm(e) {
        setNewPlayerForm({name: e.target.value})
    }

    return (
    <div>
        <br></br>
        <Button variant="contained" color="success" onClick={() => setShowNewForm(!showNewForm)}>Add Player Tag</Button>
        <br></br>
        <br></br>
        <form onSubmit={(e) => {createNewPlayer(e, newPlayerForm); setNewPlayerForm({name: ""})}}>
        {showNewForm ? <TextField id="outlined-basic" label="New Player Tag" variant="outlined" onChange={updateNewPlayerForm}
         value={newPlayerForm.name}/> : null}
         {showNewForm ? <Button type="submit" variant="contained">Create</Button> : null}
         </form>
        {players.map(player => {
            return <div key={player.name}>{player.name}</div>
        })}
    </div>
  )
}

export default Players