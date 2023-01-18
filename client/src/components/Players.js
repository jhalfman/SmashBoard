import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Player from './Player';

const Players = ({players, createNewPlayer, errors, setPlayers, admin, setErrors}) => {
    const [newPlayerForm, setNewPlayerForm] = useState({
        name: ""
    })
    const [showNewForm, setShowNewForm] = useState(false)
    const [retiredPlayers, setRetiredPlayers] = useState(null)
    const [viewRetiredOn, setViewRetiredOn] = useState(false)

    function updateNewPlayerForm(e) {
        setNewPlayerForm({name: e.target.value})
    }

    function getRetiredPlayers() {
        if (!retiredPlayers)
        {fetch(`/players/retired`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(players => setRetiredPlayers(players))
            }
            else {
                resp.json().then(data => {
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                  })
            }
        })}
        setViewRetiredOn(true)
    }

    function unretirePlayer(id) {
        fetch(`/players/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"retired": false})
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(player => {
                    setPlayers([...players, player])
                    const retired = retiredPlayers.filter(p => p.id !== player.id)
                    setRetiredPlayers(retired)
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
        {admin ? <button onClick={getRetiredPlayers}>View Retired Players</button> : null}
        {viewRetiredOn ? <button onClick={() => setViewRetiredOn(false)}>Cancel</button> : null}
        {retiredPlayers && viewRetiredOn ? retiredPlayers.map(p => {
            return <div key={p.name}>
            {p.name[0].toUpperCase() + p.name.slice(1)}
            <button onClick={() => unretirePlayer(p.id)}>Unretire</button>
            </div>
        }) : null}
    </div>
  )
}

export default Players