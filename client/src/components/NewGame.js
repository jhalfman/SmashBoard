import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const NewGame = ({players , characters, currentNight}) => {
    //time, notes, night_id
    const [newGameForm, setNewGameForm] = useState({
        notes: "",
        time: 0,
        p1p: '',
        p1c: '',
        p2p: '',
        p2c: '',
        p3p: '',
        p3c: '',
        p4p: '',
        p4c: '',
        night_id: currentNight
    })
    let navigate = useNavigate();

    function updateGameNotes(e) {
      setNewGameForm({...newGameForm, notes: e.target.value})
    }

    function updateGameTime(e) {
      setNewGameForm({...newGameForm, time: e.target.value})
    }

    function updatePlayerCharacters(e) {
      setNewGameForm({...newGameForm, [e.target.name]: e.target.value})
    }

    function createNewGame(e) {
      e.preventDefault();
      fetch(`/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...newGameForm})
      })
      .then(resp => resp.json())
      .then(game => navigate(`/games/${game.id}`))
    }

    function createFormOptions() {
      const playerArray = ["p1", "p2", "p3", "p4"]
      return playerArray.map(player => {
        return (
          <React.Fragment key={player}>
          <h3>{`Player ${player[1]}`}</h3>
          <InputLabel id={`${player}p-select-label`}>Player Tag</InputLabel>
          <Select
            labelId={`${player}p-select-label`}
            id={`${player}p`}
            name={`${player}p`}
            label="Player"
            value={newGameForm[`${player}p`] || ""}
            onChange={updatePlayerCharacters}
          >
          {players.map(player => {
            return <MenuItem key={player.id} value={player.id}>{player.name}</MenuItem>
          })}
          </Select>
          <InputLabel id={`${player}c-select-label`}>Character</InputLabel>
          <Select
            labelId={`${player}c-select-label`}
            id={`${player}c`}
            name={`${player}c`}
            label="Character"
            value={newGameForm[`${player}c`] || ""}
            onChange={updatePlayerCharacters}
          >
            {characters.map(character => {
              return <MenuItem key={character.id} value={character.id}>{character.name}</MenuItem>
            })}
          </Select>
          </React.Fragment>
        )
      })
    }
   
    const gameForm = (
      <form onSubmit={createNewGame}>
        <br></br>
        <TextField id="outlined-basic" label="Game Notes" variant="outlined" onChange={updateGameNotes} value={newGameForm.notes}/>
        <TextField id="outlined-basic" type="number" label="Time Limit (minutes)" variant="outlined" onChange={updateGameTime} value={newGameForm.time}/>
        <br></br>
        <br></br>
        {createFormOptions()}
        <br></br>
        <br></br>
        <Button type="submit" variant="contained">Create</Button>
      </form>
    )
    
  return (
    <>
    {gameForm}
    </>
  )
}

export default NewGame
