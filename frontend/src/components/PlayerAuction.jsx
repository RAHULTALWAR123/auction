// import React from 'react'

import { useEffect } from "react";
import BidControl from "./BidControl"
import TeamPurse from "./TeamPurse"
import TeamSkip from "./TeamSkip"
import { useUserStore } from "../stores/useUserStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
// import socket from "../socket/socket";
// import { get } from "mongoose";

const PlayerAuction = () => {

  const {fetchAllUsers,users,getSkippedUser,skippedUsers} = useUserStore();
  const {fetchPlayer,player} = usePlayerStore();

  useEffect(() => {
    fetchAllUsers()
  },[fetchAllUsers])


  const {pid} = useParams();

  useEffect(() => {
    fetchPlayer(pid);
    // getSkippedUser(pid);
  },[fetchPlayer,pid])

  useEffect(() => {
    getSkippedUser(pid);
  },[getSkippedUser,pid])



  return (
    <>
    <div className='relative min-h-screen'>

    <motion.div
                // className='flex flex-col items-center justify-center space-y-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

    <div className="flex justify-center mt-12">

    <div className='flex justify-center items-center border border-gray-600 w-1/6 py-5 text-3xl text-blue-700 font-extrabold bg-gradient-to-b from-black to-gray-900 rounded-2xl'>
    ₹ {player?.basePrice}  Cr
    </div>

    </div>


    <div className='absolute left-0 border border-gray-600 w-1/5 top-10'>
    {users.map((user) => (<TeamSkip key={user._id} user1={user} playerId={pid} />))}
    </div>





    <div className='absolute right-0 w-1/5 top-5'>
    <h1 className='text-xl font-extrabold text-center mb-5'>Skipped By</h1>
    {skippedUsers.length === 0 && <h1 className='text-2xl font-extrabold text-center border border-gray-600 rounded-lg bg-gradient-to-b from-purple-600 to-blue-900 p-16'>All Teams are in bidding</h1>}
    {skippedUsers.map((user) => (<TeamPurse key={user._id} user={user} />))}
    </div>


    </motion.div>


<div className='flex justify-center'>
    <div className='absolute bottom-0 w-1/4 h-auto mb-4'>
    <BidControl/>
    </div>
</div>





    </div>
    </>
  )
}


export default PlayerAuction
