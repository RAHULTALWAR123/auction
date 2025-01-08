// import React from 'react'

import { useParams } from "react-router-dom";
import { usePlayerStore } from "../stores/usePlayerStore"
import { useEffect } from "react";
// import CategoryPlayer2 from "./CategoryPlayer2";
import ManagePlayers from "./ManagePlayers";
import { useUserStore } from "../stores/useUserStore";
import { Loader } from "lucide-react";


const ManageTeam = () => {

    const {players,getTeam,submit,teamLoading,submitLoading} = usePlayerStore();
    const {finalizeTeam} = useUserStore();

    const {id} = useParams();

    useEffect(() => {
        getTeam(id);
    },[getTeam,id])

  return (
    <>
    <div className='sm:p-24 p-8'>
        <h1 className='font-bold text-4xl text-center mb-10 '>Manage Your Team</h1>

        <div className='flex flex-col items-center gap-4'>

        {teamLoading &&
	<div className="flex items-center justify-center">
			<Loader className='mr-2 h-20 w-20 animate-spin' aria-hidden='true' />
			{/* Loading... */}
	</div>}

        {!teamLoading && players.length === 0 && (
      <h1 className='text-xl sm:text-2xl font-extrabold text-white'>
        Enter Auction and Build Your Team
      </h1>
    )}
    

      {!teamLoading && players.map((player) => (
        <ManagePlayers key={player._id} player={player} />
      ))}

        </div>

        <div className='flex justify-center mt-10 gap-5 '>

        <button onClick={finalizeTeam} className="bg-gradient-to-r from-yellow-400 to-yellow-600  text-black font-bold sm:font-extrabold sm:py-3 py-1 sm:px-10 px-5 rounded-xl text-xl">
          finalizeTeam
        </button>
        <button onClick={submit} className="bg-gradient-to-t from-green-500  to-emerald-500  text-black font-bold sm:font-extrabold sm:py-3 py-1 sm:px-10 px-5 rounded-xl text-xl">

          {/* {submitLoading && <Loader className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />} */}

          {submitLoading ? <Loader className='mr-2 h-8 w-8 animate-spin' aria-hidden='true' /> : "Submit Retensions"}
        </button>

        </div>

    </div>

    </>

  )

}

export default ManageTeam
