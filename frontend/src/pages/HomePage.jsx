// import React from 'react'

import TeamCard from "../components/TeamCard"
import { motion } from 'framer-motion'
import { RiAuctionFill } from 'react-icons/ri'
import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"
import { useEffect } from "react"
import Performers from "../components/Performers"
import Top3 from "../components/Top3"

const HomePage = () => {

  const { fetchAllUsers, users } = useUserStore();

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <>
      <motion.div
        className='mx-auto w-full max-w-md text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mt-5 sm:mt-10'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        All Teams:
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 sm:px-10 lg:px-40 mt-10 justify-items-center lg:justify-items-stretch'>
  {users.map((user) => (<TeamCard key={user._id} user={user} />))}
</div>

<div>
<h1 className='mt-10 sm:mt-16 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left px-5 lg:ml-40 mb-5'>
        MVP&apos;S OF IPL
      </h1>  
  <Performers/>
</div>

<div>
  <Top3/>
</div>

      <h1 className='mt-10 sm:mt-16 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left px-5 lg:ml-40'>
        Enter The IPL Auction 
      </h1>
      
      <div className='flex flex-col justify-center items-center mt-5'>
        <RiAuctionFill size={100} className='text-black sm:size-150' />
        <Link to={"/auction-intro"}>
          <button className='px-6 py-3 sm:py-4 bg-gradient-to-b from-white to-gray-800 text-black font-medium rounded-md hover:bg-blue-600 transition duration-200 mt-5 mb-6'>
            Enter IPL Auction
          </button>
        </Link>
      </div>
    </>
  )
}

export default HomePage
