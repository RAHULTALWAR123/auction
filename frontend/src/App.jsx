import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import PlayerAuction from "./components/PlayerAuction"
import PlayerList from "./components/PlayerList"
import SoldPage from "./pages/SoldPage"
// import TeamPlayers from "./components/TeamPlayers"
import Team from "./components/Team"
import CategoryList from "./components/CategoryList"
import AuctionGuide from "./components/AuctionGuide"
import SearchUser from "./components/SearchUser"
import AddPlayer from "./components/AddPlayer"
import ManageTeam from "./components/ManageTeam"
// import {io} from 'socket.io-client'


function App() {

  // const socket = io("http://localhost:5000");

  const {user,checkAuth} = useUserStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])



  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>

<div className='absolute inset-0 overflow-hidden'>
  <div className='absolute inset-0'>
  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(209,213,219,0.2)_0%,rgba(55,65,81,0.2)_55%,rgba(17,24,39,0.1)_100%)]' />

  </div>
</div>


      <div className='relative z-50 pt-20'>
      <Navbar/>
      <Routes>
        <Route path="/" element={user?<HomePage/>:<LoginPage/>}/>
        <Route path="/signup" element={user?<HomePage/>:<SignUpPage/>}/>
        <Route path="/login" element={user?<HomePage/>:<LoginPage/>}/>
        <Route path="/auction/:pid" element={user?<PlayerAuction/>:<LoginPage/>}/>
        <Route path="/auction" element={user?<PlayerList/>:<LoginPage/>}/>
        <Route path="/sold/:pid" element={user?<SoldPage/>:<LoginPage/>}/>
        <Route path="/team/:id" element={user?<Team/>:<LoginPage/>}/>
        <Route path="/manage/:id" element={user?<ManageTeam/>:<LoginPage/>}/>
        <Route path="/category/:category" element={user?<CategoryList/>:<LoginPage/>}/>
        <Route path="/auction-intro" element={user?<AuctionGuide/>:<LoginPage/>}/>
        <Route path="/search" element={user?<SearchUser/>:<LoginPage/>}/>
        <Route path="/add-player" element={user?<AddPlayer/>:<LoginPage/>}/>

      </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
