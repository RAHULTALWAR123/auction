/* eslint-disable react/prop-types */
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({user}) => {

  const [logo,setLogo] = useState("none");
  const [bg,setbg] = useState("black");

  useEffect(() => {
    if(user.username === "RCB"){
      setLogo("/RCB.webp")
      setbg("gradient-to-b from-black to-red-600")
    }
    else if(user.username === "MI"){
      setLogo("/MI.webp")
      setbg("gradient-to-b from-yellow-500 to-blue-600")
    }
    else if(user.username === "CSK"){
      setLogo("/CSK.webp")
      setbg("gradient-to-b from-yellow-500 to-yellow-800")
    }
    else if(user.username === "RR"){
      setLogo("/RR.webp")
      setbg("gradient-to-b from-pink-500 to-blue-500")
    }
    else if(user.username === "DC"){
      setLogo("/DC.webp")
      setbg("gradient-to-b from-blue-800 to-red-500")
    }
    else if(user.username === "KKR"){
      setLogo("/KKR.webp")
      setbg("gradient-to-b from-purple-800 to-yellow-600")
    }
    else if(user.username === "SRH"){
      setLogo("/SRH.webp")
      setbg("gradient-to-b from-orange-700 to-red-500")
    }
    else if(user.username === "PBKS"){
      setLogo("/PBKS.webp")
      setbg("gradient-to-b from-red-700 to-gray-400")
    }
  },[user.username])

    return (
        <>
        <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
      <div className={`h-auto w-72 border border-gray-600 rounded-xl bg-${bg} text-center p-5 shadow-lg`}>
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Team Logo"
            className="h-24 w-24 rounded-full shadow-md"
          />
        </div>
        <h1 className="text-3xl font-extrabold mt-2 text-gray-800">{user.username}</h1>
        <div className="mt-6 text-left space-y-3">
          <p className="font-semibold text-lg text-gray-300">
            <span className="text-black">Squad: </span>{user.team.length}
          </p>
          <p className="font-semibold text-lg text-gray-300">
            <span className="text-black">Purse: </span> ₹ {user.budget} Cr
          </p>
          <p className="font-semibold text-lg text-gray-300">
            <span className="text-black">RTM left : </span> {user.RTM}
          </p>
        </div>
        <Link to={`/team/${user._id}`}>
        <button className="mt-6 px-4 py-2 bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200">
          View Details
        </button>
        </Link>
      </div>
      </motion.div>
      </>
    );
  };
  
  export default TeamCard;
  