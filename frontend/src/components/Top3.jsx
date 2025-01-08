// import React from 'react'

import { useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { Loader } from "lucide-react";

const Top3 = () => {

    const {getTop , topPlayers, topLoading} = usePlayerStore();

    useEffect(() => {
        getTop();
    }, [getTop]);

    const sortedPlayers = [...topPlayers].sort((a, b) => b.basePrice - a.basePrice);
    const middlePlayer = sortedPlayers[0]; // Player with the highest price
    const otherPlayers = sortedPlayers.slice(1); // Remaining players
    const arrangedPlayers = [
      otherPlayers[0] || {}, // Left player
      middlePlayer,         // Middle player
      otherPlayers[1] || {} // Right player
    ];

    return (
      <div>
        <h1 className="mt-10 sm:mt-16 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center lg:text-left px-5 lg:ml-40 mb-5">
          Top buys so far...
        </h1>
        <div className="flex justify-center items-start sm:gap-32 gap-3 mt-10">
          {topPlayers.length === 0 && (
            <p className="text-2xl font-extrabold text-center mt-4">
              No players sold yet
            </p>
          )}
          {topLoading && (
            <>
              <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                Loading...
            </>
          )}
{!topLoading && arrangedPlayers.map((player, index) => (
    <div className="flex flex-col items-center" key={player?._id}>
      <img src={player?.img} alt="" className={`${index === 1 ? "sm:h-72 sm:w-72 h-36 w-36" : "sm:h-44 sm:w-44 h-24 w-24"}`} />
      <p className="sm:text-2xl text-xl font-extrabold text-center mt-4">{player?.name}</p>
      <button className="sm:text-2xl text-xl sm:font-extrabold font-bold mt-4 sm:py-3 sm:px-16 px-2 py-3  rounded-xl bg-gradient-to-t from-green-400 to-emerald-600">
        <p>
          Sold at <br /> ₹ {player?.basePrice} Cr
        </p>
      </button>
    </div>
))}
</div>
        </div>
    );
  };
  
  export default Top3;
  
