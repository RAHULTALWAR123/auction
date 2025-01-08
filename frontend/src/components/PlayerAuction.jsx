// import React from 'react'

import { useEffect, useState } from "react";
import BidControl from "./BidControl"
import TeamPurse from "./TeamPurse"
import TeamSkip from "./TeamSkip"
import { useUserStore } from "../stores/useUserStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import socket from "../socket/socket";
import {TbBrandOpenai} from 'react-icons/tb'
import {MdCancel} from 'react-icons/md'
import { Loader } from "lucide-react";
import Notification from "./Notification";
import SoldNotification from "./SoldNotification";

// import socket from "../socket/socket";
// import { get } from "mongoose";

const PlayerAuction = () => {

  const { fetchAllUsers, users, getSkippedUser, skippedUsers,user,rtm ,initializeUserSocketListeners,cleanupUserSocketListeners} = useUserStore();
  const { fetchPlayer, player ,getAssist, assist,loadingSpinner,initializeSocketListeners,cleanupSocketListeners,fetchLastBid,lastBidder } = usePlayerStore();
  const { pid } = useParams();
  const [popUp, setPopUp] = useState("none");
  const [bg,setBg] = useState("");
  const [logo,setLogo] = useState("");
  // const [suggestions1, setSuggestions1] = useState(null);

  useEffect(() => {
    fetchAllUsers()
    if(user.username === "RR"){
      setBg("gradient-to-b from-pink-500 to-blue-500")
      // setLogo("/RR.webp")
    }
    else if(user.username === "RCB"){
      setBg("gradient-to-t from-black to-red-600")
      // setLogo("/RCB.webp")
    }
    else if(user.username === "MI"){
      setBg("gradient-to-b from-yellow-500 to-blue-600")
      // setLogo("/MI.webp")
    }
    else if(user.username === "CSK"){
      setBg("gradient-to-b from-yellow-500 to-yellow-900")
      // setLogo("/CSK.webp")
    }
  }, [fetchAllUsers,user])



  useEffect(() => {
    fetchPlayer(pid);
    fetchLastBid(pid);

    if(lastBidder?.username === "RR"){
      setLogo("/RR.webp")
    }
    else if(lastBidder?.username === "RCB"){
      setLogo("/RCB.webp")
    }
    else if(lastBidder?.username === "MI"){
      setLogo("/MI.webp")
    }
    else if(lastBidder?.username === "CSK"){
      setLogo("/CSK.webp")
    }


    // getSkippedUser(pid);
  }, [fetchPlayer,fetchLastBid,lastBidder?.username, pid])

  useEffect(() => {
    getSkippedUser(pid);

    // Listen for skip updates
    const handleSkipUpdate = () => {
      getSkippedUser(pid);
    };

    socket.on("player-skipped", handleSkipUpdate);

    return () => {
      socket.off("player-skipped", handleSkipUpdate);
    };
  }, [getSkippedUser, pid]);


  useEffect(() =>{
    initializeUserSocketListeners();
    initializeSocketListeners();


    return () => {
      cleanupUserSocketListeners();
      cleanupSocketListeners();
    }
  },[initializeUserSocketListeners,cleanupUserSocketListeners,initializeSocketListeners,cleanupSocketListeners])

  const handleAi = async () =>{
    setPopUp("block");
    await getAssist(pid);
    // setSuggestions1(assist);
  }


  return (
    <>

    <Notification/>
    <SoldNotification/>
    

<div className="relative sm:min-h-screen h-auto">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between sm:space-x-4 space-y-6 sm:space-y-0"
  >
    <div className="flex justify-center items-center w-full">
    <div className="flex justify-center mt-12 sm:w-1/5 w-2/3">
      <div className="flex justify-center items-center w-full py-5 text-3xl text-blue-700 font-extrabold bg-gradient-to-b from-black to-gray-900 rounded-2xl">
        <p>₹ {player?.basePrice} Cr</p>
        {lastBidder?.username && (
          <img src={logo} alt="team" className="w-12 h-12 ml-5 rounded-full shadow-md" />
        )}
      </div>
    </div>
    </div>

    <div className="w-3/4 sm:absolute sm:left-0 sm:w-1/5 top-10">
      {users.map((user) => (
        <TeamSkip key={user._id} user1={user} playerId={pid} />
      ))}
    </div>

    <div className="w-3/4 sm:absolute sm:right-0 sm:w-1/5 top-5">
      <h1 className="text-xl font-extrabold text-center mb-5">Skipped By</h1>
      {skippedUsers.length === 0 ? (
        <h1 className="text-2xl font-extrabold text-center border border-gray-600 rounded-lg bg-gradient-to-t from-black to-gray-900 p-8 sm:p-16 text-blue-700">
          All Teams are in bidding
        </h1>
      ) : (
        skippedUsers.map((user) => <TeamPurse key={user._id} user={user} />)
      )}

    </div>
    {popUp === "block" && (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }} 
        transition={{ duration: 0.5 }}
    style={{display: popUp}} className="sm:bottom-24 right-16 bottom-64 absolute border border-gray-900 rounded-md h-auto w-60 p-4 bg-gradient-to-t from-black to-gray-900 text-blue-700 font-bold overflow-auto">
      <button className="absolute right-0 top-0" onClick={() => setPopUp("none")}>
        <MdCancel size={28} color="white"/>
      </button>
      {loadingSpinner ?(
      <p>
        <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
      </p>
      )
      :
      (
        <p>{assist}</p>
      )
    }

      </motion.div>
    )}

      <button onClick={handleAi} className="sm:bottom-5 right-5 bottom-60 absolute border border-gray-900 rounded-full p-3 bg-black">
        <TbBrandOpenai color="blue" size={32}/>
      </button>

</motion.div>
  
<div className="flex justify-center">
  <div className=" sm:flex sm:justify-center sm:absolute sm:bottom-0 sm:w-1/4 sm:h-auto sm:mb-4 mb-4">
    <BidControl />
  </div>
  </div>
</div>

<div className={`absolute sm:bottom-64 sm:left-16 left-2  bottom-80 border border-gray-900 rounded-xl sm:p-3 p-2 flex items-center justify-center font-bold  text-sm  ${player?.hasPlayedFor[player?.hasPlayedFor.length - 1]?.toString() === user?._id.toString() && user?.RTM > 0 ? "bg-gradient-to-t from-emerald-500 to-green-500 text-black" : "bg-gradient-to-t from-red-500 to-red-800 text-black"}`}>
{player?.hasPlayedFor[player?.hasPlayedFor.length - 1]?.toString() === user?._id.toString() && user?.RTM > 0
    ? "Available"
    : "Unavailable"}
</div>
      <button onClick={() => rtm(pid)}
      className={`absolute sm:bottom-5 bottom-60 left-3 border border-gray-900 rounded-xl p-3 bg-${bg} sm:h-60 h-20 sm:w-60 w-20 flex items-center justify-center font-bold sm:text-5xl text-xl text-black`}
      >
        RTM
      </button>


    </>
  )
}


export default PlayerAuction