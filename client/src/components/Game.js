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
//import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Game = ({ruleList}) => {
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
    const [gameComments, setGameComments] = useState([])
    const [eventSelectOn, setEventSelectOn] = useState(false)
    const [submitSelectOn, setSubmitSelectOn] = useState(false)
    
    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            setPlayers(game.player_characters)

            const initialScore = {}
            game.player_characters.forEach(pc => {
                initialScore[pc.id] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            })
            const newScoreboard = {...initialScore}
            const newGameComments = []
            game.penalties.forEach(penalty => {
                newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
                
                const playerName = game.player_characters.find(pc => pc.id === penalty.player_character_id).player.name
                const character = game.player_characters.find(pc => pc.id === penalty.player_character_id).character.name
                const rule = (ruleList.length !== 0 ? ruleList.find(rule => rule.id === penalty.rule_id).name : "loading")
                newGameComments.push(`${penalty.created_at} - Penalty: ${rule} - Player: ${playerName} (${character}) - ${penalty.description}`)
            })
            setGameComments(newGameComments)
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
        fetch(`/penalties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...newPenalty, "game_id": id})
        })
        .then(resp => resp.json())
        .then(penalty => {
            const newComment = `${penalty.created_at} - Penalty: ${penalty.rule.name} - Player: ${penalty.player_character.player.name} (${penalty.player_character.character.name}) - ${penalty.description}`
            setGameComments([
                ...gameComments,
                newComment
            ])
             const newScoreboard = {...scoreboard}
             newScoreboard[penalty.player_character_id][penalty.rule_id - 1] += 1
             setScoreboard(newScoreboard)
        })
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
              <TableCell><img alt="smash logo" id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png"/></TableCell>
                {ruleList.map(rule => {
                    return <TableCell key={rule.id}><img alt={rule.name} className="rulesImage" src={rule.image} onClick={() => updatePenalty(rule.name, rule.id)}/></TableCell>
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
            {gameComments.map((comment, index) => {
                return <p key={index}>{comment}</p>
            })}
        </div>
        </>
      );
}

export default Game