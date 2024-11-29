// import React from 'react'

import { useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore"
import TeamPlayers from "./TeamPlayers"
import { useParams } from "react-router-dom";

const Team = () => {
    const {getTeam,players} = usePlayerStore();
    const {id} = useParams();


    useEffect(() => {
        getTeam(id);
    },[getTeam,id])

  return (
    <>
    <div className='text-center'>
    <h1 className='text-4xl font-extrabold mb-10'>CSK</h1>

    <div className='grid grid-cols-3 gap-0 text-center'>
        {players.length === 0 && <h1 className='text-2xl font-extrabold text-yellow-500'>Enter Auction and Build Your Team</h1> }
        {players.map((player) => (<TeamPlayers key={player._id} player={player} />))}
        {/* <TeamPlayers/> */}
    </div>
    </div>
    </>
  )
}

export default Team
