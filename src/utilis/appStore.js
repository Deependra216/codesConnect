import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice';
import connectionReducer  from './connectionsSlice';
import requestsReducer from './requestSlice';
 const appstore =configureStore({    
        reducer:{
            user:userReducer,
            feed:feedReducer,
            connections:connectionReducer,
            requests:requestsReducer,
    
        }
    }) 


export default appstore;