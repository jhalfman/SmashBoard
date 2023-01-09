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

const Game = ({ruleList}) => {
    const [players, setPlayers] = useState([])
    const [penalties, setPenalties] = useState([])
    const {id} = useParams();
    const [gameForm, setGameForm] = useState({
        p1: "",
        p2: "",
        p3: "",
        p4: ""
    })
    const [scoreboard, setScoreboard] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
    const [newPenalty, setNewPenalty] = useState({
        player_id: "",
        rule_id: "",
        description: ""
    })
    const [currentPenaltySelected, setCurrentPenaltySelected] = useState("")
    const [currentPlayerSelected, setCurrentPlayerSelected] = useState("")
    const [gameComments, setGameComments] = useState([])
    const [eventSelectOn, setEventSelectOn] = useState(false)
    const [submitSelectOn, setSubmitSelectOn] = useState(false)
    
    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            setPlayers(game.player_characters)
            setPenalties(game.penalties)
        })
    }, [])

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
            player_id: "",
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
            setNewPenalty({...newPenalty, player_id: pc.id})
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
        console.log(newPenalty)
        cancelEventSelect()

    }


    const penaltyDescriptionForm = (
        <form onSubmit={createNewPenalty}>
            <TextField id="outlined-basic" label="Event Description" variant="outlined" onChange={updatePenaltyDescription} value={newPenalty.description}/>
            <Button type="submit" variant="contained">Create</Button>
        </form>
    )

      return (
        <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Super Smash Brothers Penalties</TableCell>
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
              <TableCell><img id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png"/></TableCell>
                {ruleList.map(rule => {
                    return <TableCell key={rule.id}><img className="rulesImage" src={rule.image} onClick={() => updatePenalty(rule.name, rule.id)}/></TableCell>
                })}
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
                        {scoreboard[index].map((tally, index1) => {
                            return <TableCell component="th" scope="row" key={index1}>{tally}</TableCell>
                        })}
                    </TableRow>
                    )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
            <h1>Penalty Tracker</h1>
            {gameComments.map((comment, index) => {
                <div key={index}>This is a comment</div>
            })}
        </div>
        </>
      );
}

export default Game