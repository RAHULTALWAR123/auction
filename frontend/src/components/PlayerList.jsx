// import React from 'react'
import { useEffect } from "react"
import { usePlayerStore } from "../stores/usePlayerStore"
import CategoryPlayer from "./CategoryPlayer"

import { motion } from "framer-motion"  

const PlayerList = () => {

    const {marqueePlayers,batsmanPlayers,bowlerPlayers,allrounderPlayers,getPlayerCategory} = usePlayerStore()

    useEffect(() => {
        getPlayerCategory("Marquee")
        getPlayerCategory("Batsman")
        getPlayerCategory("AllRounder")
        getPlayerCategory("Bowler")
    },[getPlayerCategory])


  return (
    <div className='min-h-screen relative overflow-hidden px-32 mb-5'>
      <h1 className='text-center text-4xl font-extrabold'>Auction Pool</h1>

      <motion.div
                // className='flex flex-col items-center justify-center space-y-4 py-16'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

      <h2 className='text-left text-3xl font-bold mt-10 text-yellow-400'>Marquee Players</h2>

<div>
    {marqueePlayers.map((player) => (<CategoryPlayer key={player._id} player={player} />))}
</div>


      <h2 className="text-left text-3xl font-bold mt-10 text-yellow-400">Batsman</h2>

      <div>
      {batsmanPlayers.map((player) => (<CategoryPlayer key={player._id} player={player} />))}
      </div>


      <h2 className="text-left text-3xl font-bold mt-10 text-yellow-400">All-Rounders</h2>

<div>
{allrounderPlayers.map((player) => (<CategoryPlayer key={player._id} player={player} />))}
</div>

<h2 className="text-left text-3xl font-bold mt-10 text-yellow-400">Bowlers</h2>

<div>
{bowlerPlayers.map((player) => (<CategoryPlayer key={player._id} player={player} />))}
</div>

</motion.div>

    </div>
  )
}

export default PlayerList
