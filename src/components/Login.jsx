import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utilis/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utilis/constants';

const Login = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [gender,setGender] = useState('')
    const [emailId,setEmailId] =useState('');
    const [password,setPassword] =useState('');
    const [error,setError] = useState('')
    const [isLoginForm,setIsLoginForm] =useState(true)
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
          navigate('/feed');
    }  
    catch(err){
      setError(err?.response?.data || "Something went wrong!!")        
    }
  }
   const handleSignUp = async()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup",{
        firstName,
        lastName,
        emailId,
        password,
        gender
      },{
        withCredentials:true
      });
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong!!")   
    }

   }
  return (
    <div className='flex justify-center my-5'>

  <div className="card bg-base-100 w-96 shadow-xl">
    <div className="card-body">
        <h2 className="card-title justify-center">{ isLoginForm ? "Login": "Sign Up"}</h2>

    <div>
    {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">FirstName: </span>
          </div>
        <input type="text" value={firstName}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setFirstName(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">LastName: </span>
          </div>
        <input type="text" value={lastName}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setLastName(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">Gender: </span>
          </div>
        <input type="text" value={gender}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setGender(e.target.value)} />
        </label>
        </>}
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
      <p className='text-red-500'>{error}</p>
       <div className="card-actions justify-center">
             <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
             {isLoginForm ? "Login":" Sign Up"}</button> 
        </div>

      <p className='text-black m-auto py-2 cursor-pointer' onClick={()=>setIsLoginForm((value) => !value)}>
        {isLoginForm ? <span>New User? <span className='font-bold'>Sign Up Here</span></span> 
        : <span>Exiting User? <span className='font-bold'>Login Here</span></span> }
        </p>

  </div>
</div>
</div>
   
  )
}

export default Login
