import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utilis/constants'
import { addUser } from '../utilis/userSlice'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUser = async()=>{
    try{
      const result = await axios.get(BASE_URL+ "/profile/view", {
        withCredentials:true
      });
      dispatch(addUser(result.data))
    }
    catch(err){
      if(err.status == 401){
        navigate('/login')
      }
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])
  
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
