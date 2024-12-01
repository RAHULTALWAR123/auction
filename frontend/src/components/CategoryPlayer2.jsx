/* eslint-disable react/prop-types */
// import React from 'react'

const CategoryPlayer2 = ({ player }) => {

  return (
    <div className='w-full max-w-full sm:max-w-full'>
      <div className="border border-gray-600 sm:px-10 pr-2 mt-3 rounded-md bg-gradient-to-b from-white to-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={player.img} alt="" className="h-20 w-20 sm:h-24 sm:w-24" />
            <p className="text-sm sm:text-2xl font-bold ml-1 sm:ml-5 text-black">{player.name}</p>
          </div>
          <div>
            <button
              className={`w-30 sm:w-56 px-4 sm:px-7 py-2 sm:py-4 text-xs sm:text-base sm:font-bold rounded-lg ${
                player?.isSold
                  ? "bg-gradient-to-t from-black to-gray-800 text-white cursor-not-allowed"
                  : player?.isUnsold
                  ? "bg-gradient-to-t from-red-500 to-red-800 text-white cursor-not-allowed"
                  : "bg-gradient-to-t from-purple-600 to-indigo-900 text-white"
              }`}
              disabled={player?.isSold || player?.isUnsold}
            >
              {player?.isSold
                ? `Sold at ₹ ${player?.basePrice}Cr`
                : player?.isUnsold
                ? "Unsold"
                : "Waiting for Auction"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPlayer2;
