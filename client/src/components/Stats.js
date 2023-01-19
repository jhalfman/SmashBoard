import React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PopoutText from './PopoutText';
import { useNavigate } from 'react-router-dom';

const Stats = ({ruleList}) => {
    const [players, setPlayers] = useState([])
    const [statboard, setStatboard] = useState(null)
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`/stats`)
        .then(resp => resp.json())
        .then(players => {
            setPlayers(players)

            const newStatboard = {}
            players.forEach(player => {
                newStatboard[player.id] = [player.name, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                player.player_characters.forEach(pc => {
                    pc.penalties.forEach(penalty => {
                        newStatboard[player.id][penalty.rule_id] += 1
                        newStatboard[player.id][18] += 1
                    })
                })
            })
            setStatboard(newStatboard)
        })
    }, [])

    function displayPlayerStats(id) {
        navigate(`/stats/${id}`)
    }

  return (
    <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              <TableCell ><img alt="smash logo" id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png" style={{width: 80}}/></TableCell>
                {ruleList.map(rule => {
                    return <TableCell key={rule.id}>
                        <PopoutText rule={rule}/>
                        </TableCell>
                })}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {players.length > 0 ? players.map(player => {
                    return (
                        <TableRow
                        key={player.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {statboard ? statboard[player.id].map((tally, index) => {
                                if (index === 0) {
                                    return <TableCell component="th" scope="row" key={index} className="statCell"><button onClick={() => displayPlayerStats(player.id)}>{tally}</button></TableCell>
                                }
                                else {
                                    return <TableCell component="th" scope="row" key={index} className="statCell">{tally}</TableCell>
                                }
                            }) : null}
                        </TableRow>
                    )
                }) : null}
                <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default Stats