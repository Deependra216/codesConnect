import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utilis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFeed } from '../utilis/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getFeed = async()=>{
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",
        {
          withCredentials:true
        });
      // console.log(res?.data?.data);
      dispatch(addFeed(res?.data?.data));
  }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  if(!feed) return;
  if(feed.length <=0 ) return <h1 className='flex justify-center my-10 font-semibold'> No New User Found!!!</h1>
  return ( feed && (
      <div className='flex justify-center my-5'>
        <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed
