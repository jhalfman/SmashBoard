import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink as Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PopoutText from './PopoutText';
import Penalty from './Penalty';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Game = ({ruleList, currentUser, admin}) => {
    const [nightId, setNightId] = useState(null)
    const [gameName, setgameName] = useState("")
    const [gameTime, setGameTime] = useState(0)
    const [players, setPlayers] = useState([])
    const {id} = useParams();
    const [scoreboard, setScoreboard] = useState(null)
    const [newPenalty, setNewPenalty] = useState({
        player_character_id: "",
        rule_id: "",
        description: ""
    })
    const [editGameForm, setEditGameForm] = useState({
        notes: gameName,
        time: gameTime
    })
    const [currentPenaltySelected, setCurrentPenaltySelected] = useState("")
    const [currentPlayerSelected, setCurrentPlayerSelected] = useState("")
    const [eventSelectOn, setEventSelectOn] = useState(false)
    const [submitSelectOn, setSubmitSelectOn] = useState(false)
    const [penalties, setPenalties] = useState([])
    const [currentPenalty, setCurrentPenalty] = useState(null)
    const [errors, setErrors] = useState(null)
    const [open, setOpen] = React.useState(false)
    const [editGameOn, setEditGameOn] = useState(false)
    let navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            console.log(game)
            setNightId(game.night.id)
            setgameName(game.notes)
            setGameTime(game.time)
            setEditGameForm({
                notes: game.notes,
                time: game.time
            })
            setPlayers(game.player_characters)
            
            const initialScore = {}
            game.player_characters.forEach(pc => {
                initialScore[pc.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            })
            const newScoreboard = {...initialScore}
            
            const newPenalties = game.penalties.map(penalty => {
                // increment score for each penalty
                newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
                newScoreboard[penalty.player_character_id][17] += 1
                return penalty
            })
            setPenalties(newPenalties.sort(function(x, y) {return x.id - y.id}))
            setScoreboard(newScoreboard)
        })
    }, [ruleList, id])

    function eventSelect() {
        setCurrentPenaltySelected("")
        setCurrentPlayerSelected("")
        setSubmitSelectOn(false)
        setEventSelectOn(true)
    }

    function cancelEventSelect() {
        setEventSelectOn(false)
        setSubmitSelectOn(false)
        setNewPenalty({
            player_character_id: "",
            rule_id: "",
            description: ""
        })
    }

    function updatePenalty(name, id, image) {
        if (eventSelectOn) {
            setNewPenalty({...newPenalty, rule_id: id})
            setCurrentPenaltySelected([name, image])
            if (currentPlayerSelected) {
                setSubmitSelectOn(true)
            }
        }
        
    }

    function updatePlayer(pc) {
        if (eventSelectOn) {
            setNewPenalty({...newPenalty, player_character_id: pc.id})
            setCurrentPlayerSelected(`${pc.player.name} (${pc.character.name})`)
            if (currentPenaltySelected) {
                setSubmitSelectOn(true)
            }
    }
    }

    function updatePenaltyDescription(e) {
        setNewPenalty({...newPenalty, description: e.target.value})
    }

    function createNewPenalty(e) {
        e.preventDefault();
        if (newPenalty.rule_id === 2) {
            screenClear()
        }
        else if (newPenalty.rule_id === 8) {
            mew()
        }
        else regularPenalty();
        cancelEventSelect()
    }

    function regularPenalty() {
        if (currentUser) {
            fetch(`/penalties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...newPenalty, "game_id": id, "user_id": currentUser.id})
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(penalty => {
                        const newScoreboard = {...scoreboard}
                        newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
                        newScoreboard[penalty.player_character_id][17] += 1
                        setScoreboard(newScoreboard)
                        setPenalties([
                            ...penalties,
                            penalty
                        ])
                    })
                }
                else
                    resp.json().then(data => {
                        const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                        setErrors(errors)
                    })
            })
        }
        else {
            setErrors(["User must be logged in"])
        }  
    }

    function screenClear() {
        const newPenaltyList = []
        const screenClearPlayers = players.filter(player => player.id!== newPenalty.player_character_id)
        screenClearPlayers.forEach(player => {
            const screenClearForm = {
                ...newPenalty, "game_id": id, "user_id": currentUser.id, player_character_id: player.id
            }
            fetch(`/penalties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(screenClearForm)
            })
            .then(resp => resp.json())
            .then(penalty => {
                const newScoreboard = {...scoreboard}
                newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
                newScoreboard[penalty.player_character_id][17] += 1
                setScoreboard({...newScoreboard})
                newPenaltyList.push(penalty)
                if (newPenaltyList.length === screenClearPlayers.length) {
                    setPenalties([...penalties, ...newPenaltyList])
                }
            })       
        })      
    }

    function mew() {
        const newPenaltyList = []
        const mewPlayers = players.filter(player => player.id!== newPenalty.player_character_id)
        mewPlayers.forEach(player => {
            const mewForm = {
                ...newPenalty, "game_id": id, "user_id": currentUser.id, player_character_id: player.id
            }
            fetch(`/penalties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mewForm)
            })
            .then(resp => resp.json())
            .then(penalty => {
                const newScoreboard = {...scoreboard}
                newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
                newScoreboard[penalty.player_character_id][17] += 1
                setScoreboard({...newScoreboard})
                newPenaltyList.push(penalty)
                if (newPenaltyList.length === mewPlayers.length) {
                    setPenalties([...penalties, ...newPenaltyList])
                }
            })       
        })      
    }

    const penaltyDescriptionForm = (
        <form onSubmit={createNewPenalty}>
            <TextField id="outlined-basic" label="Event Description" variant="outlined" onChange={updatePenaltyDescription} value={newPenalty.description} />
            <Button type="submit" variant="contained" style={{height: 55}}>Create</Button>
        </form>
    )

    function submitPenaltyForm(e, form, id, player_character_id, rule_id) {
        e.preventDefault()
        fetch(`/penalties/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(p => {
                    const newPenalties = penalties.map(penalty => {
                        if (penalty.id === p.id) {
                            return p
                        }
                        else return penalty
                    })
                    setPenalties(newPenalties)
        
                    const newScoreboard = {...scoreboard}
                    newScoreboard[player_character_id][rule_id - 1] -= 1
                    newScoreboard[player_character_id][17] -= 1
                    newScoreboard[p.player_character_id][p.rule_id - 1] += 1
                    newScoreboard[p.player_character_id][17] += 1
                    setScoreboard(newScoreboard)
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

    function deletePenalty(id, player_character_id, rule_id) {
        fetch(`/penalties/${id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                const newScoreboard = {...scoreboard}
                newScoreboard[player_character_id][rule_id - 1] -= 1
                newScoreboard[player_character_id][17] -= 1
                setScoreboard(newScoreboard)
        
                const newPenalties = penalties.filter(penalty => penalty.id !== id)
                setPenalties(newPenalties)
            }
            else {
                resp.json().then(data => {
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                })
            }
        })
        
    }

    function deleteGame() {
        fetch(`/games/${id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
              navigate(`/nights/${nightId}`)
            }
            else {
              resp.json().then(data => {
                const errors = Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)
                setErrors(errors)
              })
            }
          })
    }

    function editGame(e) {
        setEditGameForm({
            ...editGameForm,
            [e.target.name]: e.target.value
        })
    }

    function updateGameInfo(e) {
        e.preventDefault();
        fetch(`/games/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editGameForm)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(game => {
                    setgameName(game.notes)
                    setGameTime(game.time)
                    setEditGameForm({
                        notes: game.notes,
                        time: game.time
                    })
                })
                setEditGameOn(false)
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
            Delete Game
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete game "{gameName}"?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              This will also delete all associated penalties.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => {handleClose(); deleteGame()}} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )

      return (
        <>
        {errors ? errors.map(error => <div className="errors" >{error}</div>) : null}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {editGameOn ? <TableCell style={{width: 100}}><form onSubmit={updateGameInfo}>
                        Game: <input name="notes" type="text" value={editGameForm.notes} onChange={editGame}></input>
                        Time: <input name="time" type="number" value={editGameForm.time} onChange={editGame}></input>
                        <button>submit</button>
                        <button type='button' onClick={() => {setEditGameOn(false); setEditGameForm({notes: gameName, time: gameTime})}}>cancel</button>
                    </form></TableCell> : <TableCell style={{width: 150}}>Game: {gameName} <hr></hr> Time: {gameTime} minutes</TableCell>}
                    <TableCell style={{width: 100}}><Link to={`/nights/${nightId}`}><Button variant="contained" color="secondary">Back to Game List</Button></Link></TableCell>
                    <TableCell style={{width: 100}}>
                        <Button variant="contained" color="success" onClick={eventSelect} style={{width: 100}}>Add Event</Button>
                        {eventSelectOn ? <Button variant="contained" color="error" onClick={() => cancelEventSelect()}>Cancel Event</Button> : null}
                    </TableCell>
                    {admin || currentUser ? <TableCell style={{width: 100}}><Button variant="contained" color="warning" onClick={() => setEditGameOn(true)}>Edit Game</Button></TableCell> : <TableCell style={{width: 40}}></TableCell>}
                    {admin ? <TableCell style={{width: 100}}>{confirmationAlert}</TableCell> : null}
                    {eventSelectOn ? <TableCell style={{width: 10}}></TableCell> : null}
                    {eventSelectOn ? <TableCell style={{width: 100, "font-weight": "900"}}>Choose a penalty and player</TableCell> : <TableCell></TableCell>}
                    {eventSelectOn ? <TableCell style={{width: 10}}></TableCell> : null}
                    {eventSelectOn ? <TableCell style={{width: 100, "font-weight": "900"}}>{currentPenaltySelected[0]}<img style={{width: "70px"}} src={currentPenaltySelected[1]} alt={currentPenaltySelected[0]}></img></TableCell> : null}
                    {eventSelectOn ? <TableCell style={{"font-weight": "900"}}>{currentPlayerSelected}</TableCell> : null}
                    {submitSelectOn ? <TableCell>{penaltyDescriptionForm}</TableCell> : null}
                </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>      
              <TableRow>
              <TableCell><img alt="smash logo" id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png"/></TableCell>
                {ruleList.map(rule => {
                    return <TableCell key={rule.id}>
                        <PopoutText rule={rule} updatePenalty={updatePenalty}/>
                        </TableCell>
                })}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {players.map((pc) => {
                    return (
                    <TableRow
                    key={pc.player.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" onClick={() => updatePlayer(pc)}>
                            {eventSelectOn ? <button>{`${pc.player.name} ${pc.player.retired ? "(retired)" : ""} (${pc.character.name})`}</button> : `${pc.player.name} ${pc.player.retired ? "(retired)" : ""} (${pc.character.name})`}
                        </TableCell>
                        {scoreboard ? scoreboard[pc.id].map((tally, index) => {
                            return <TableCell component="th" scope="row" key={index}>{tally}</TableCell>
                        }) : null}
                    </TableRow>
                    )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
            <h1>Penalty Tracker</h1>
            {penalties.map(penalty => {
                return <Penalty key={penalty.id} penalty={penalty} players={players} ruleList={ruleList} submitPenaltyForm={submitPenaltyForm} deletePenalty={deletePenalty} setCurrentPenalty={setCurrentPenalty} currentPenalty={currentPenalty}/>
            })}
        </div>
        </>
      );
}

export default Game