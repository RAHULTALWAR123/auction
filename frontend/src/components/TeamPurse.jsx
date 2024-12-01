/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";

const TeamPurse = ({ user }) => {

  const [logo, setLogo] = useState("none");
  const [bg, setbg] = useState("black");

  useEffect(() => {
    if (user.username === "RCB") {
      setLogo("/RCB.webp")
      setbg("gradient-to-r from-black to-red-600")
    }
    else if (user.username === "MI") {
      setLogo("/MI.webp")
      setbg("gradient-to-r from-yellow-500 to-blue-600")
    }
    else if (user.username === "CSK") {
      setLogo("/CSK.webp")
      setbg("gradient-to-r from-yellow-500 to-yellow-800")
    }
    else if (user.username === "RR") {
      setLogo("/RR.webp")
      setbg("gradient-to-r from-pink-500 to-blue-500")
    }
    else if (user.username === "DC") {
      setLogo("/DC.webp")
      setbg("gradient-to-r from-blue-800 to-red-500")
    }
    else if (user.username === "KKR") {
      setLogo("/KKR.webp")
      setbg("gradient-to-r from-purple-800 to-yellow-600")
    }
    else if (user.username === "KXIP") {
      setLogo("/KXIP.webp")
      setbg("gradient-to-r from-red-700 to-gray-400")
    }
    else if (user.username === "SRH") {
      setLogo("/SRH.webp")
      setbg("gradient-to-r from-orange-700 to-red-500")
    }
  }, [user.username])

  return (
    <>
<div className={`flex items-center justify-between gap-5 sm:gap-4 p-2 bg-${bg} rounded-md`}>
  <div className="flex items-center gap-2">
  <img src={logo} alt="" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-md" />
  <div className="text-sm sm:text-base font-bold">Purse Remaining</div>
  </div>
  <p className="font-bold text-xs sm:text-sm ">₹ {user.budget} Cr</p>
</div>

    </>
  )
}


export default TeamPurse
