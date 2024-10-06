import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user =useSelector((store)=>store.user)

  return (
    <div>
      <h1>Profile Page</h1>
        <div>Name: {user.firstName}</div>      
        <div>Last: {user.lastName}</div>      
        {/* <div>Name: {user.firstName}</div>       */}

    </div>
  )
}

export default Profile
