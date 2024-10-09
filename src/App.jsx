import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utilis/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>        
        <Route element={<Body/>} path="/">
          <Route element={<Feed/>} path="/feed" />
          <Route element={<Login/>} path="/login" />
          <Route element={<Profile/>} path="/profile" />
          <Route element={<Connections/>} path="/connections" />
          <Route element={<Requests/>} path="/requests" />


        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    
  </>
  )
}

export default App
