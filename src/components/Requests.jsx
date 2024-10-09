import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utilis/constants'
import axios from 'axios'
import { addRequest, removeRequest } from '../utilis/requestSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.requests )
    
    const reviewRequest = async(status, _id) =>{
        try{
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {},
                {
                    withCredentials:true
                }) 
                //second parameter {} is imp it is data but we donot have so pass it empty
                dispatch(removeRequest(_id))
        }
        catch(err){
            console.log(err)
        }
    }
    const fetchRequests =async() =>{
        try{
            const res= await axios.get(BASE_URL + "/user/requests/received",
                {
                    withCredentials:true
                })
        
            dispatch(addRequest(res.data.data))

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchRequests()
    },[])
    if(!requests) return;

    if(requests.length === 0) return <h1 className='flex justify-center font-semibold my-2 text-2xl' >No Requests Found!!!</h1>
  return (
    <div className='text-center my-3'>
      <h1 className='text-3xl text-bold'>Your Requests</h1>
      {requests.map((request)=>{
        const { _id,firstName,lastName,age,gender,photoUrl,about } = request.fromUserId
        return (
        <div key={_id} className='flex p-4 justify-between items-center rounded-lg bg-base-200 m-4 mx-auto w-2/3'>
            <div>
                <img alt='photo' className="w-48 h-40 rounded-full" src={photoUrl}/>
            </div>
           <div className='text-left mx-4'>
                <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " +gender}</p>}
                
                <p className='w-2/3'>{about}</p>
           </div>
           <div>
           <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
           <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
           </div>
        </div>)
      })}
    </div>
  )
}

export default Requests
