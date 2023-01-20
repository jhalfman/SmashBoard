import React from 'react'

const Home = ({currentUser}) => {
  return (
    <div>
      <img class="background" src="https://i.imgur.com/0NQnDiL.png" alt="smash bros logo"></img>
      {currentUser ? `Welcome ${currentUser.username}!!` : "Home"}
    </div>
  )
}

export default Home