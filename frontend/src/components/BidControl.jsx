// import React, { memo } from 'react'
// import { memo } from "react";
// import { useCallback } from "react";
import {useEffect} from "react";
// import { useParams } from "react-router-dom";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import socket from "../socket/socket";

const BidControl = () => {

  const {fetchPlayer,player,bidPlayer,playerSold} = usePlayerStore();
  const {SkipCurrentPlayer,user} = useUserStore();

  // const {pid} = useParams();

  // const fetchPlayerCallback = useCallback(() => fetchPlayer(pid), [fetchPlayer, pid]);

  console.log("socket instance", socket)
  console.log("Rendering BidControl component...");


//   useEffect(() => {
//     // Only fetch the player when the component mounts
//     if (!player) {
//         fetchPlayerCallback();
//     }
// }, [fetchPlayerCallback, player]);



useEffect(() => {
  console.log("Setting up socket listeners...");
  
  const onUpdatePlayer = (updatedPlayer) => {
    console.log("Received update-player:", updatedPlayer);
    fetchPlayer(updatedPlayer.id);
  };

  socket.on("update-player", onUpdatePlayer);

  return () => {
    console.log("Cleaning up socket listeners...");
    socket.off("update-player", onUpdatePlayer);
  };
}, []);







  const hasUserSkipped = player?.isSkippedBy.includes(user?._id)

  return (

    <motion.div
    // className='flex flex-col items-center justify-center space-y-4 py-16'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
>
    <div className='flex flex-col justify-center items-center'>
        <img src={player?.img} alt="" className='h-52 w-52'/>
        <p className='font-bold text-2xl rounded-xl px-5 pb-1 mt-2 bg-gradient-to-t from-blue-900 to-indigo-500'>
            {player?.name}
        </p>

        <div className="flex justify-center items-center mt-2">
  <table className="border-collapse border border-gray-600">
    <thead>
      <tr>
        <th className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-400 to-emerald-600">Role</th>
        <th className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-400 to-emerald-600">Style</th>
        <th className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-400 to-emerald-600">Base Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-100 to-emerald-300 text-black">{player?.role}</td>
        <td className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-100 to-emerald-300 text-black">{player?.style}</td>
        <td className="border border-gray-600 py-1 px-3 bg-gradient-to-t from-emerald-100 to-emerald-300 text-black">₹ 2 Cr</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="flex justify-center items-center mt-5 gap-3">
<button onClick={() => {
  SkipCurrentPlayer(player._id)
  socket.emit("player-action",{id:player._id,action:"skip"})
}} 
disabled={hasUserSkipped} 
className={`px-20 py-3 border border-gray-600 rounded-md text-2xl ${
              hasUserSkipped
                ? "bg-gradient-to-t from-black to-gray-800 cursor-not-allowed"
                : "bg-gradient-to-t from-red-400 to-red-600"
            }`}>
              Skip
              </button>
<button onClick={() => {
  bidPlayer(player._id)
  socket.emit("player-action",{id:player._id,action:"bid"})
}}
disabled={hasUserSkipped}  className={`px-20 py-3 border border-gray-600 rounded-md text-2xl ${
              hasUserSkipped
                ? "bg-gradient-to-t from-black to-gray-800 cursor-not-allowed"
                : "bg-gradient-to-t from-emerald-900 to-green-500"
            }`}>Bid</button>
</div>

<div className="flex justify-center items-center mt-3">
  <button
    onClick={async (e) => {
      e.preventDefault(); // Prevent default navigation
      const success = await playerSold(player?._id); // Await playerSold function
      if (success) {
        window.location.href = `/sold/${player?._id}`; // Redirect only on success
      }
    }}
    disabled={hasUserSkipped}
    className={`px-48 py-3 border border-gray-600 rounded-md text-2xl ${
      hasUserSkipped
        ? "bg-gradient-to-t from-black to-gray-800 cursor-not-allowed"
        : "bg-gradient-to-b from-white to-gray-900"
    }`}
  >
    Buy
  </button>
</div>



    </div>

    </motion.div>
  )
}

export default BidControl
