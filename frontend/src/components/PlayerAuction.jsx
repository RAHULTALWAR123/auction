// import React from 'react'

import { useEffect } from "react";
import BidControl from "./BidControl"
import TeamPurse from "./TeamPurse"
import TeamSkip from "./TeamSkip"
import { useUserStore } from "../stores/useUserStore";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import socket from "../socket/socket";

// import socket from "../socket/socket";
// import { get } from "mongoose";

const PlayerAuction = () => {

  const { fetchAllUsers, users, getSkippedUser, skippedUsers } = useUserStore();
  const { fetchPlayer, player } = usePlayerStore();
  const { pid } = useParams();

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])



  useEffect(() => {
    fetchPlayer(pid);
    // getSkippedUser(pid);
  }, [fetchPlayer, pid])

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


  return (
    <>
<div className="relative min-h-screen">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between sm:space-x-4 space-y-6 sm:space-y-0"
  >
    <div className="flex justify-center items-center w-full">
    <div className="flex justify-center mt-12 sm:w-1/5 w-2/3">
      <div className="flex justify-center items-center w-full py-5 text-3xl text-blue-700 font-extrabold bg-gradient-to-b from-black to-gray-900 rounded-2xl">
        ₹ {player?.basePrice} Cr
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
  </motion.div>

<div className="flex justify-center">
  <div className=" sm:flex sm:justify-center sm:absolute sm:bottom-0 sm:w-1/4 sm:h-auto sm:mb-4 mb-4">
    <BidControl />
  </div>
  </div>
</div>

    </>
  )
}


export default PlayerAuction