import React from 'react'
import SessionsTable from './SessionsTable'
import {useEffect, useState} from 'react'

const Sessions = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        fetch("/sessions")
        .then(resp => resp.json())
        .then(data => setSessions(data))
      }, [])

  return (
    <div>
        <SessionsTable sessions={sessions}/>
    </div>
  )
}

export default Sessions