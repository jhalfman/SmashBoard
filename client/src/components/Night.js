import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PopoutText from './PopoutText';

const Night = ({setCurrentNight, ruleList}) => {
    const [games, setGames] = useState([])
    const {id} = useParams();
    const [scoreboard, setScoreboard] = useState(null)
    const [players, setPlayers] = useState([])
    const [nightName, setNightName] = useState("")

    useEffect(() => {
        fetch(`/nights/${id}`)
        .then(resp => resp.json())
        .then(games => {
          setGames(games)
          setCurrentNight(id)
          setNightName(games[0].night.name)

          const initialScore = {}
          const playerList = []
          games.forEach(game => {            
            game.player_characters.forEach(pc => {
              if (initialScore[pc.player_id]) {
                return null
              }
              else {
                initialScore[pc.player_id] = [pc.player.name, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                playerList.push([pc.player.name, pc.player_id])
              }
            })
            game.penalties.forEach(penalty => { 
              initialScore[penalty.player_character.player_id][penalty.rule_id] += 1
            })
          })
          const newScoreboard = {...initialScore}
          setScoreboard(newScoreboard)
          setPlayers(playerList)
        })
    }, [id, setCurrentNight])

    function createData(length, penalties, notes, id, pcs) {
      return {length, penalties, notes, id, pcs};
    }
    
    const gameRows = games.map(game => {
      const pcs = game.player_characters.map(pc => pc.player.name)
      return createData(game.time, game.penalties.length, game.notes, game.id, pcs)
    })
  
    
  
    return (
      <div>
      <Link to="/games/new"><Button variant="contained" color="success">Add Game</Button></Link>
      <Link to="/nights"><Button variant="contained" color="success">Back to Night List</Button></Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <h2>
              {nightName} Games
            </h2>
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