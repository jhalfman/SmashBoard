import React from 'react'
import {useEffect, useState} from 'react'

const NewGame = () => {
    //time, notes, night_id
    const [newGameForm, setNewGameForm] = useState({
        notes: "",
        time: 0,
        p1: null,
        p2: null,
        p3: null,
        p4: null
    })

    // useEffect(() => {
    //   setNewGameForm({...newGameForm})
    // }, [])
    
  return (
    <div></div>
  )
}

export default NewGame