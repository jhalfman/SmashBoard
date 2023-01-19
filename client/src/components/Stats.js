import React from 'react'
import {useState, useEffect} from 'react'

const Stats = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        fetch(`/players/stats`)
        .then(resp => resp.json())
        .then(players => {
            console.log(players)
            setPlayers(players)
        })
    }, [])
    
  return (
    <div>Stats</div>
  )
}

export default Stats