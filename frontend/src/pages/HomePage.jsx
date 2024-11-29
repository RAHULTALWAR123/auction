// import React from 'react'

import TeamCard from "../components/TeamCard"
import {motion} from 'framer-motion'
import {RiAuctionFill} from 'react-icons/ri'
import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"
import { useEffect } from "react"

const HomePage = () => {

  const {fetchAllUsers,users} = useUserStore();

  useEffect(() => {
    fetchAllUsers()
  },[fetchAllUsers])


  return (
    <>
        <motion.div
          className='sm:mx-auto sm:w-full sm:max-w-md text-4xl font-extrabold text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          All Teams : 
        </motion.div>

    <div className='grid grid-cols-4 gap-5 px-40 mt-20'>
      {users.map((user) => (<TeamCard key={user._id} user={user} />))}
      {/* <TeamCard/> */}
    </div>


      <h1 className='mt-16 text-3xl font-extrabold ml-40'>Enter The IPL Auction -</h1>
      <div className='flex flex-col justify-center items-center'>
        <RiAuctionFill size={150} className='text-yellow-500'/>
        <Link to={"/auction"}>
        <button className='px-6 py-4 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200 mt-5 mb-6'>Start Auction</button>
        </Link>
      </div>
    </>
  )
}

export default HomePage
