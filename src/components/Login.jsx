import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utilis/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utilis/constants';

const Login = () => {
    const [emailId,setEmailId] =useState('kholi@gmail.com');
    const [password,setPassword] =useState('Kholi@123');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async()=>{
      //api calling Here
    try{
        const result = await axios.post(BASE_URL + "/login",{
            emailId,
            password
          }, { withCredentials: true });
          
          dispatch(addUser(result.data))
          navigate('/');
    }  
    catch(err){
        console.log(err)
    }
    }
  return (
    <div className='flex justify-center my-5'>

  <div className="card bg-base-100 w-96 shadow-xl">
    <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>

    <div>
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">EmailId: {emailId} </span>
          </div>
        <input type="text" value={emailId}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setEmailId(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">Password : {password}</span>
          </div>
        <input type="password"
            value={password}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
    </div>
    
       <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
  </div>
</div>
</div>
   
  )
}

export default Login
