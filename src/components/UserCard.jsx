import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utilis/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utilis/feedSlice'

const UserCard = ({user}) => {
  const dispatch = useDispatch()
    const { _id,firstName,lastName,gender,photoUrl,about,age,skills} = user
    const handleSendRequest = async(status, userId)=>{
      try{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},
          {
            withCredentials:true
          });
       
        dispatch(removeUserFromFeed(userId))
      }
      catch(err)
      {
        console.log(err)
      }
    }
  return ( user && (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    {/* <div className='font-thin'><span className='font-semibold'>Skills:</span> {skills.map((s)=>{ return s+" "})}</div> */}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)} >Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>

    </div>
  </div>
 </div>
</div> )
  )
}

export default UserCard
