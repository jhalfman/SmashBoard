import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {NavLink as Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PopoutText from './PopoutText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Night = ({setCurrentNight, ruleList, nightName, setNightName, admin, currentUser}) => {
    const [games, setGames] = useState([])
    const {id} = useParams();
    const [scoreboard, setScoreboard] = useState(null)
    const [players, setPlayers] = useState([])
    const [errors, setErrors] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [nightNameForm, setNightNameForm] = useState({name: nightName})
    const [editNightNameOn, setEditNightNameOn] = useState(false)
    let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    useEffect(() => {
        fetch(`/nights/${id}`)
        .then(resp => {
          if (resp.ok) {
              resp.json().then(games => {
                setCurrentNight(id)
      
                if (games.length > 0) {
                  setGames(games)
                  setNightName(games[0].night.name)
      
                  const initialScore = {}
                  const playerList = []
                  games.forEach(game => {            
                    game.player_characters.forEach(pc => {
                      if (initialScore[pc.player_id]) {
                        return null
                      }
                      else {
                        initialScore[pc.player_id] = [pc.player.name, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        playerList.push([pc.player.name, pc.player_id])
                      }
                    })
                    game.penalties.forEach(penalty => { 
                      initialScore[penalty.player_character.player_id][penalty.rule_id] += 1
                      initialScore[penalty.player_character.player_id][18] += 1
                    })
                  })
                  const newScoreboard = {...initialScore}
                  setScoreboard(newScoreboard)
                  setPlayers(playerList)
                }
              })
          }
          else
              resp.json().then(data => {
                const errors = Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)
                setErrors(errors)
              })
        })
    }, [id, setCurrentNight, setNightName])

    function deleteNight() {
      fetch(`/nights/${id}`, {
        method: "DELETE"
      })
      .then(resp => {
        if (resp.ok) {
          navigate("/nights")
        }
        else {
          resp.json().then(data => {
            const errors = Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)
            setErrors(errors)
          })
        }
      })
    }

    function createData(length, penalties, notes, id, pcs) {
      return {length, penalties, notes, id, pcs};
    }
    
    const gameRows = games.map(game => {
      const pcs = game.player_characters.map(pc => pc.player.name)
      return createData(game.time, game.penalties.length, game.notes, game.id, pcs)
    })

    function updateNightNameForm(e) {
      setNightNameForm({name: e.target.value})
    }

    function submitNightNameForm(e) {
      e.preventDefault();
      fetch(`/nights/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nightNameForm)
      })
      .then(resp => {
        if (resp.ok) {
            resp.json().then(night => {
                setNightName(night.name)
                setNightNameForm({night: night.name})
            })
            setEditNightNameOn(false)
        }
        else {
            resp.json().then(data => {
                const errors = Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)
                setErrors(errors)
              })
        }
    })
    }

    const confirmationAlert = (
      <div>
        <Button variant="contained" color="error" onClick={handleClickOpen}>
          Delete Night
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete night "{nightName}"?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            This will also delete all associated games and penalties.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => {handleClose(); deleteNight()}} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  
    
  
    return (
      <div>
      <Link to="/games/new"><Button variant="contained" color="success">Add Game</Button></Link>
      <Link to="/nights"><Button variant="contained" color="error">Back to Night List</Button></Link>
      {admin || currentUser ? <Button variant="contained" color="warning" onClick={() => setEditNightNameOn(true)}>Edit Night Name</Button> : null}
      {admin ? confirmationAlert : null}
      {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
      {editNightNameOn ? <form onSubmit={submitNightNameForm}>
        <input type="text" name="name" value={nightNameForm.name} onChange={updateNightNameForm}></input>
        <button type="button" onClick={() => {setEditNightNameOn(false); setNightNameForm({name: nightName})}}>cancel</button>
        <button>submit</button>
      </form> : <h2>{nightName} Games</h2>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Game Number</TableCell>
              <TableCell align="right">Time Limit</TableCell>
              <TableCell align="right">Number of Penalties</TableCell>
              <TableCell align="right">Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <Link style={{color:"blue"}} to={`/games/${row.id}`}>{`${index + 1} - ${row.notes}`}</Link>
                </TableCell>
                <TableCell align="right">{`${row.length} minutes`}</TableCell>
                <TableCell align="right">{row.penalties}</TableCell>
                <TableCell align="right">{row.pcs.map((pc, index) => {
                  if (index === 0) return pc
                  else return ", " + pc
                })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>{nightName} Scoreboard</h2>
      <hr></hr>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              <TableCell><img alt="smash logo" id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png"/></TableCell>
                {ruleList.map(rule => {
                    return <TableCell key={rule.id}>
                        <PopoutText rule={rule}/>
                        </TableCell>
                })}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {players.map(pc => {
                    return (
                    <TableRow
                    key={pc[0]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {scoreboard ? scoreboard[pc[1]].map((tally, index) => {
                            return <TableCell component="th" scope="row" key={index}>{tally}</TableCell>
                        }) : null}
                    </TableRow>
                    )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}

export default Night