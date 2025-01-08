/* eslint-disable react/prop-types */
// import React from 'react'

import { useEffect, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";

const ManagePlayers = ({ player }) => {
    const {getOwner,owner,retain} = usePlayerStore()

    useEffect(() => {
        getOwner(player?._id);
  
        if(owner?.username === "RCB"){
          setBg("gradient-to-l from-black to-red-600");
        }
        else if(owner?.username === "MI"){
          setBg("gradient-to-l from-yellow-500 to-blue-600");
        }
        else if(owner?.username === "CSK"){
          setBg("gradient-to-l from-yellow-500 to-yellow-800");
        }
        else if(owner?.username === "RR"){
          setBg("gradient-to-l from-pink-500 to-blue-500");
        }
        else if(owner?.username === "DC"){
          setBg("gradient-to-b from-blue-800 to-red-500");
        }
        else if(owner?.username === "KKR"){
          setBg("gradient-to-b from-purple-800 to-yellow-600");
        }
        else if(owner?.username === "KXIP"){
          setBg("gradient-to-b from-blue-800 to-pink-500");
        }

        console.log(player.isRetained)
        
    },[getOwner,player?._id,owner?.username,player?.isRetained])
  
  
    const [bg,setBg] = useState("");

    return (
      <div className='w-full max-w-full sm:max-w-full'>
        <div className={`border border-gray-600 sm:px-10 pr-2 mt-3 rounded-xl bg-${bg}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={player.img} alt="" className="h-20 w-20 sm:h-24 sm:w-24" />
              <p className="text-sm sm:text-2xl font-bold ml-1 sm:ml-5 text-black">{player.name}</p>
            </div>
            <div>
              <button onClick={() => retain(player?._id)}
                className="w-35 sm:w-56 px-7 sm:px-7 py-2 sm:py-4 text-xs sm:text-base sm:font-bold rounded-lg bg-gradient-to-t from-black to-gray-800 text-white"
              >
                {/* {player?.isRetained ? "Retained" : "Retain"} */}
                {player?.isRetained === true ? "Retained" : "Retain"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManagePlayers;
  