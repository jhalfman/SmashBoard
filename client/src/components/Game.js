import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Game = ({ruleList}) => {
    const [players, setPlayers] = useState([])
    const [penalties, setPenalties] = useState([])
    const {id} = useParams();
    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            const playerList = game.player_characters.map(pc => {
                return `${pc.player.name} (${pc.character.name})`
            })
            setPlayers(playerList)

            setPenalties(game.penalties)
        })
    }, [])

    // function createData(name, penalties, notes, id) {
    //     return {name, penalties, notes, id};
    //   }

    //   const gameRows = games.map(game => {
    //     return createData(game.time, game.penalties.length, game.notes, game.id)
    //   })



      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Rule Number</TableCell>
                </TableRow>
              <TableRow>
                {ruleList.map(rule => {
                    return <TableCell>{rule.name}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
                {players.map(player => {
                    return (
                    <TableRow
                    key={player}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{player}</TableCell>
                    </TableRow>
                    )
                })}
              {/* {gameRows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <Link style={{color:"blue"}} to={`/games/${row.id}`}>{`${index + 1} - ${row.notes}`}</Link>
                  </TableCell>
                  <TableCell align="right">{`${row.length} minutes`}</TableCell>
                  <TableCell align="right">{row.penalties}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Game