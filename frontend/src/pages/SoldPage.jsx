// import React from 'react'

import { Link, useParams } from "react-router-dom"
import { usePlayerStore } from "../stores/usePlayerStore"
import { useEffect } from "react";

const SoldPage = () => {

    const {fetchPlayer,player} = usePlayerStore()
    const {pid} = useParams();

    useEffect(() => {
        fetchPlayer(pid);
    },[fetchPlayer,pid])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
    <h1 className='text-4xl font-extrabold'>And the player</h1>
    <div className='border border-gray-600 rounded-2xl h-auto w-96 mt-5 text-center flex flex-col items-center justify-center py-7 bg-gradient-to-t from-white to-gray-800'>
        <img src={player?.img} alt="" className='h-52 w-52' />
        <p className='text-xl font-bold text-black mt-4'>Name : {player?.name}</p>
        <p className='text-xl font-bold text-black mt-4'>Team : {player?.owner}</p>
        <p className='text-xl font-bold text-black mt-4'>Sold at : ₹ {player?.basePrice} Cr</p>
    </div>
    <div className="text-5xl font-extrabold mt-5 border-8 border-green-500 py-3 px-9 rounded-xl text-green-500">SOLD</div>

<Link to={"/auction"}>
    <button>
        <div className="text-xl font-extrabold mt-5 py-2 px-5 rounded-xl text-white bg-gradient-to-t from-blue-900 to-indigo-500">Back to Auction Pool</div>
    </button>
</Link>
    </div>
  )
}

export default SoldPage
