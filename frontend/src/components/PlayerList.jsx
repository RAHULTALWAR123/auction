// import React from 'react'
import { useEffect } from "react"
import { usePlayerStore } from "../stores/usePlayerStore"
// import CategoryPlayer from "./CategoryPlayer"

import { motion } from "framer-motion"  
import CategoryPlayer2 from "./CategoryPlayer2"

const PlayerList = () => {

    const {marqueePlayers,batsmanPlayers,bowlerPlayers,allrounderPlayers,getPlayerCategory} = usePlayerStore()

    useEffect(() => {
        getPlayerCategory("Marquee")
        getPlayerCategory("Batsman")
        getPlayerCategory("AllRounder")
        getPlayerCategory("Bowler")
    },[getPlayerCategory])


  return (
<div className='min-h-screen relative overflow-hidden px-5 sm:px-10 lg:px-32 mb-5'>
  <h1 className='text-center text-3xl sm:text-4xl font-extrabold'>Player List</h1>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className='text-left text-2xl sm:text-3xl font-bold mt-10 mb-10 text-white'>Marquee Players</h2>
    <div className='flex flex-col items-center gap-4'>
      {marqueePlayers.map((player) => (
        <CategoryPlayer2 key={player._id} player={player} />
      ))}
    </div>

    <h2 className='text-left text-2xl sm:text-3xl font-bold mt-10 mb-10 text-white'>Batsman</h2>
    <div className='flex flex-col items-center gap-4'>
      {batsmanPlayers.map((player) => (
        <CategoryPlayer2 key={player._id} player={player} />
      ))}
    </div>

    <h2 className='text-left text-2xl sm:text-3xl font-bold mt-10 mb-10 text-white'>All-Rounders</h2>
    <div className='flex flex-col items-center gap-4'>
      {allrounderPlayers.map((player) => (
        <CategoryPlayer2 key={player._id} player={player} />
      ))}
    </div>

    <h2 className='text-left text-2xl sm:text-3xl font-bold mt-10 mb-10 text-white'>Bowlers</h2>
    <div className='flex flex-col items-center gap-4'>
      {bowlerPlayers.map((player) => (
        <CategoryPlayer2 key={player._id} player={player} />
      ))}
    </div>
  </motion.div>
</div>

  )
}

export default PlayerList
