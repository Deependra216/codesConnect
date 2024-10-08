import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utilis/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFeed } from '../utilis/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  console.log(feed)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getFeed=async()=>{
    if(feed) return;
    try{
      const result = await axios.get(BASE_URL + '/feed',{withCredentials:true})
      console.log("Feed result" + result?.data?.data);
      dispatch(addFeed(result?.data?.data));
  }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  return ( feed && (
      <div className='flex justify-center my-10'>
        {/* <h1 className='flex justify-center text-3xl my-5'> 
          Feed Page</h1> */}

          <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed
