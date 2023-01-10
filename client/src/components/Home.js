import React from 'react'

const Home = ({currentUser}) => {
  return (
    <div>
      {currentUser ? `Welcome ${currentUser.username}` : "Home"}
    </div>
  )
}

export default Home