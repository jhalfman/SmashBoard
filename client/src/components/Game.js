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
import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PopoutText from './PopoutText';
import Penalty from './Penalty';


const Game = ({ruleList, currentUser}) => {
    const [nightId, setNightId] = useState(null)
    const [players, setPlayers] = useState([])
    const {id} = useParams();
    const [scoreboard, setScoreboard] = useState(null)
    const [newPenalty, setNewPenalty] = useState({
        player_character_id: "",
        rule_id: "",
        description: ""
    })
    const [currentPenaltySelected, setCurrentPenaltySelected] = useState("")
    const [currentPlayerSelected, setCurrentPlayerSelected] = useState("")
    const [eventSelectOn, setEventSelectOn] = useState(false)
    const [submitSelectOn, setSubmitSelectOn] = useState(false)
    const [penalties, setPenalties] = useState([])
    const [currentPenalty, setCurrentPenalty] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            setNightId(game.night.id)
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

    function updatePenalty(name, id) {
        if (eventSelectOn) {
            setNewPenalty({...newPenalty, rule_id: id})
            setCurrentPenaltySelected(name)
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

    const penaltyDescriptionForm = (
        <form onSubmit={createNewPenalty}>
            <TextField id="outlined-basic" label="Event Description" variant="outlined" onChange={updatePenaltyDescription} value={newPenalty.description}/>
            <Button type="submit" variant="contained">Create</Button>
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

      return (
        <>
        {errors ? errors.map(error => <div className="errors" >{error}</div>) : null}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Super Smash Brothers Penalties</TableCell>
                    <TableCell><Link to={`/nights/${nightId}`}><Button variant="contained" color="success">Back to Game List</Button></Link></TableCell>
                    <TableCell>
                        <Button variant="contained" color="success" onClick={eventSelect}>Add Event</Button>
                        {eventSelectOn ? <Button variant="contained" color="error" onClick={() => cancelEventSelect()}>Cancel Event</Button> : null}
                    </TableCell>
                    
                    {eventSelectOn ? <TableCell></TableCell> : null}
                    {eventSelectOn ? <TableCell>{currentPenaltySelected}</TableCell> : null}
                    {eventSelectOn ? <TableCell></TableCell> : null}
                    {eventSelectOn ? <TableCell>Choose a penalty and player</TableCell> : null}
                    {eventSelectOn ? <TableCell></TableCell> : null}
                    {eventSelectOn ? <TableCell>{currentPlayerSelected}</TableCell> : null}
                    {eventSelectOn ? <TableCell></TableCell> : null}
                    {submitSelectOn ? <TableCell>{penaltyDescriptionForm}</TableCell> : null}
                    
                    

                </TableRow>
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
                {players.map((pc, index) => {
                    return (
                    <TableRow
                    key={pc.player.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" onClick={() => updatePlayer(pc)}>{`${pc.player.name} (${pc.character.name})`}</TableCell>
                        {scoreboard ? scoreboard[pc.id].map((tally, index1) => {
                            return <TableCell component="th" scope="row" key={index1}>{tally}</TableCell>
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