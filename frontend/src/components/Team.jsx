// import React from 'react'

import { useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore"
import TeamPlayers from "./TeamPlayers"
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

const Team = () => {
    const {getTeam,players,teamLoading} = usePlayerStore();
    const {id} = useParams();


    useEffect(() => {
        getTeam(id);
        // getOwner(id);
    },[getTeam,id])

  return (
    <>
<div className='text-center'>
  <h1 className='text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10'>Squad</h1>
  
  {teamLoading &&
	<div className="flex items-center justify-center">
			<Loader className='mr-2 h-20 w-20 animate-spin' aria-hidden='true' />
			{/* Loading... */}
	</div>}

  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5 sm:px-10 justify-items-center lg:justify-items-stretch'>

    
    {!teamLoading && players.length === 0 && (
      <h1 className='text-xl sm:text-2xl font-extrabold text-white'>
        Enter Auction and Build Your Team
      </h1>
    )}
    
    {!teamLoading && players.map((player) => (
      <TeamPlayers key={player._id} player={player} />
    ))}
  </div>
</div>

    </>
  )
}

export default Team
