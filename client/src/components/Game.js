import React from 'react'
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const Game = () => {
    const [players, setPlayers] = useState([])
    const [penalties, setPenalties] = useState([])
    const {id} = useParams();
    useEffect(() => {
        fetch(`/games/${id}`)
        .then(resp => resp.json())
        .then(game => {
            const playerList = game.player_characters.map(pc => {
                return `${pc.player.name} as ${pc.character.name}`
            })
            setPlayers(playerList)
        })
    }, [])

  return (

    
    <div>Game</div>
  )
}

export default Game