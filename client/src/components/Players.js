import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Player from './Player';

const Players = ({players, createNewPlayer, errors, setPlayers, admin}) => {
    const [newPlayerForm, setNewPlayerForm] = useState({
        name: ""
    })
    const [showNewForm, setShowNewForm] = useState(false)

    function updateNewPlayerForm(e) {
        setNewPlayerForm({name: e.target.value})
    }

    return (
    <div>
        {errors ? errors.map(error => <div className="errors" >{error}</div>) : null}
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
            return <Player key={player.name} player={player} setPlayers={setPlayers} players={players}/>
        })}
        <br></br>
        <br></br>
        {admin ? <button>View Retired Players</button> : null}
    </div>
  )
}

export default Players