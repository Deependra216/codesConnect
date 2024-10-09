import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utilis/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utilis/userSlice';

const EditProfile = ({user}) => {
    const [firstName,setFirstName] =useState(user.firstName);
    const [lastName,setLastName] =useState(user.lastName);
    const [photoUrl,setPhotoUrl] =useState(user.photoUrl)
    const [age,setAge] =useState(user.age || "");    
    const [gender,setGender] =useState(user.gender || "");    
    const [about,setAbout] =useState(user.about || "");      
    // const [password,setPassword] =useState('Kholi@123');
    const [error,setError] = useState('')
    const [showToast,setShowToast] = useState(false)
    const dispatch = useDispatch()
    const saveProfile = async()=>{
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",{
                firstName,
                lastName,
                gender,
                photoUrl,
                about,
                age
            },{withCredentials:true})
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false);
              }, 3000);
        }catch(err){
            setError(err.response.data)
        }
    }
    
  return (
<>
<div className='flex justify-center my-10 '>
      <div className='flex justify-center mx-10 shadow-xl'>

  <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
        <h2 className="card-title justify-center">Edit Your Profile</h2>

    <div>
        <label className="form-control w-full max-w-xs my-2">
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
            <span className="label-text">PhotoUrl: </span>
          </div>
        <input type="text" value={photoUrl}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setPhotoUrl(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">Gender: </span>
          </div>
        <input type="text" value={gender}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setGender(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">Age: </span>
          </div>
        <input type="text" value={age}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setAge(e.target.value)} />
        </label>

        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">About: </span>
          </div>
        <input type="text" value={about}
         className="input input-bordered w-full max-w-xs"
         onChange={(e)=>setAbout(e.target.value)} />
        </label>

        {/* <label className="form-control w-full max-w-xs my-2">
            <div className="label">
            <span className="label-text">Password : {password}</span>
          </div>
        <input type="password"
            value={password}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label> */}
    </div>
      <p className='text-red-500'>{error}</p>
       <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>            

        </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName,gender,photoUrl,about,age}} />
</div>

{showToast && (
    <div className="toast toast-top toast-center"> 
    <div className="alert alert-success">
      <span>Profile saved successfully.</span>
    </div>
  </div>
)}
</>
  )
}

export default EditProfile
