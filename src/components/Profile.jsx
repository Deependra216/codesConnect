import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
  const user =useSelector((store)=>store.user)

  return  (user && (
    <div>
        <h1 className='text-4xl justify-center flex items-center my-2 '>Profile Page</h1>
      
      <EditProfile user={user}/>

    </div>)
  )
}

export default Profile
