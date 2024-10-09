import React, { useEffect } from 'react'
import { BASE_URL } from '../utilis/constants'
import axios from 'axios'
import { addConnections } from '../utilis/connectionsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {
   const reduxConnections =  useSelector(store=>store.connections)
    const dispatch = useDispatch() 
    const getConnections = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections",
                {
                    withCredentials:true
                });
      
        dispatch(addConnections(res?.data?.data))
        }
        catch(err){
            console.log(err)
        }
    } 
    useEffect(()=>{
        getConnections()
    },[])
    //if connection data is not then do not anything just return
    if(!reduxConnections) return;

    if(reduxConnections.length === 0) return <h1 className='flex justify-center font-semibold my-2 text-2xl' >No Connections Found!!!</h1>
  return (
    <div className='text-center my-3'>
      <h1 className='text-3xl text-bold'>Your Connections</h1>
      {reduxConnections.map((connection,i)=>{
        const {_id,firstName,lastName,age,gender,photoUrl,about } = connection
        return (
        <div key={_id} className='flex p-4 rounded-lg bg-base-200 m-4 mx-auto w-1/2'>
            <div>
                <img alt='photo' className="w-54 h-44 rounded-full" src={photoUrl}/>
            </div>
           <div className='text-left mx-4'>
                <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " +gender}</p>}
                
                <p>{about}</p>
           </div>
        </div>)
      })}
    </div>
  )
}

export default Connections
