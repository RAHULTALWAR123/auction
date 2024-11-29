/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";

const TeamPurse = ({user}) => {

  const [logo,setLogo] = useState("none");
  const [bg,setbg] = useState("black");

  useEffect(() => {
    if(user.username === "RCB"){
      setLogo("/RCB.webp")
      setbg("gradient-to-r from-black to-red-600")
    }
    else if(user.username === "MI"){
      setLogo("/MI.webp")
      setbg("gradient-to-l from-yellow-500 to-blue-600")
    }
    else if(user.username === "CSK"){
      setLogo("/CSK.webp")
      setbg("gradient-to-r from-yellow-500 to-yellow-800")
    }
    else if(user.username === "RR"){
      setLogo("/RR.webp")
      setbg("gradient-to-r from-pink-500 to-blue-500")
    }
  },[user.username])

    return (
      <>
      <div className={`border border-gray-600 flex items-center gap-4 bg-${bg} p-2`}>
      <img src={logo} alt="" className="h-10 w-10 rounded-full shadow-md"/>
      Purse Remaining
      <p className='font-bold'>₹ {user.budget} Cr</p>
      </div>
      </>
    )
  }
  
  export default TeamPurse
  