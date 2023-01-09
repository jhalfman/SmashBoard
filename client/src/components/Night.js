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

const Night = () => {
    const [games, setGames] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch(`/nights/${id}`)
        .then(resp => resp.json())
        .then(data => setGames(data))
    }, [id])

    function createData(length, penalties, notes, id) {
      return {length, penalties, notes, id};
    }
    
    const gameRows = games.map(game => {
      return createData(game.time, game.penalties.length, game.notes, game.id)
    })
  
    
  
    return (
      <div>
      <Link to="/games/new"><Button variant="contained" color="success">Add Game</Button></Link>
      <Link to="/nights"><Button variant="contained" color="success">Back to Night List</Button></Link>
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
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
}

export default Night