// import React, { memo } from 'react'
// import { memo } from "react";
// import { useCallback } from "react";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
// import socket from "../socket/socket";

const BidControl = () => {

  const {
    player,
    bidPlayer,
    playerSold,
    initializeSocketListeners,
    cleanupSocketListeners,loading
  } = usePlayerStore();
  const {
    user, SkipCurrentPlayer,
    initializeUserSocketListeners,
    cleanupUserSocketListeners
  } = useUserStore();


  useEffect(() => {
    if (player?._id) {
      // Initialize both player and user socket listeners
      initializeSocketListeners(player._id);
      initializeUserSocketListeners();

      // Cleanup both sets of listeners
      return () => {
        cleanupSocketListeners();
        cleanupUserSocketListeners();
      };
    }
  }, [player?._id, initializeSocketListeners, initializeUserSocketListeners, cleanupSocketListeners, cleanupUserSocketListeners]);

  const hasUserSkipped = player?.isSkippedBy?.includes(user?._id);

  // Rest of your component remains the same, but handlers are simplified:
  const handleBid = async () => {
    if (!hasUserSkipped) {
      await bidPlayer(player._id);
    }
  };

  const handleSold = async (e) => {
    e.preventDefault();
    if (!hasUserSkipped) {
      const success = await playerSold(player._id);
      if (success) {
        window.location.href = `/sold/${player._id}`;
      }
    }
  };

  const handleSkip = async () => {
    if (user && player && !hasUserSkipped) {
      try {
        await SkipCurrentPlayer(player._id);
      } catch (error) {
        console.error("Error skipping player:", error);
      }
    }
  };

  return (

    <motion.div
      // className='flex flex-col items-center justify-center space-y-4 py-16'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col justify-center items-center'>
        {!loading ? <img src={player?.img} alt="" className='sm:h-52 sm:w-52 h-40 w-40' /> : 
        <>
          <Loader className='mr-2 h-10 w-10 animate-spin' aria-hidden='true' />
        </>}

        <p className='font-bold text-2xl rounded-xl sm:px-7 px-4 pb-2 pt-2 mt-2 bg-gradient-to-b from-black to-gray-900 text-blue-700'>
          {player?.name}
        </p>

        <div className="flex justify-center items-center mt-2">
          <table className="border-collapse border border-gray-600">
            <thead>
              <tr>
                <th className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-600 to-gray-800">Role</th>
                <th className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-600 to-gray-800">Style</th>
                <th className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-600 to-gray-800">Base Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-300 to-gray-400 text-black">{player?.role}</td>
                <td className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-300 to-gray-400 text-black">{player?.style}</td>
                <td className="border border-gray-600 py-1 sm:px-3 px-2 bg-gradient-to-t from-gray-300 to-gray-400 text-black">₹ 2 Cr</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-5 gap-3">
          <button onClick={handleSkip}
            disabled={hasUserSkipped}
            className={`sm:px-20 px-16 py-3 border border-gray-600 rounded-2xl text-xl font-bold ${hasUserSkipped
              ? "bg-gradient-to-t from-black to-gray-800 cursor-not-allowed"
              : "bg-gradient-to-t from-red-500 to-red-800"
              }`}>
            Skip
          </button>
          <button onClick={handleBid}
            disabled={hasUserSkipped} className={`sm:px-20 px-16 py-3 border border-gray-600 rounded-2xl text-xl font-bold text-black ${hasUserSkipped
              ? "bg-gradient-to-t from-black to-gray-800 text-white cursor-not-allowed"
              : "bg-gradient-to-b from-emerald-500 to-green-500"
              }`}>Bid</button>
        </div>


        <div className="flex justify-center items-center mt-3">
          <button
            onClick={handleSold}
            disabled={hasUserSkipped}
            className={`sm:px-48 px-40 py-3  rounded-2xl text-2xl font-bold ${hasUserSkipped
              ? "bg-gradient-to-t from-black to-gray-800 text-white cursor-not-allowed"
              : "bg-gradient-to-t from-black to-gray-900 text-blue-700"
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
