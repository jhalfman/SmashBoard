import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';

const Players = () => {
    const [players, setPlayers] = useState([])
    const [newPlayerForm, setNewPlayerForm] = useState({
        name: ""
    })
    const [showNewForm, setShowNewForm] = useState(false)

    useEffect(() => {
        fetch(`/players`)
        .then(resp => resp.json())
        .then(playerList => setPlayers(playerList))
    }, [])

    function updateNewPlayerForm(e) {
        setNewPlayerForm({name: e.target.value})
    }

    function createNewPlayer(e) {
        e.preventDefault();
        fetch(`/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayerForm)
        })
        .then(resp => resp.json())
        .then(data => {
            setPlayers([...players, data])
            setNewPlayerForm({name: ""})
        })
    }

    return (
    <div>
        <br></br>
        <Button variant="contained" color="success" onClick={() => setShowNewForm(!showNewForm)}>Add Player Tag</Button>
        <br></br>
        <br></br>
        <form onSubmit={createNewPlayer}>
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