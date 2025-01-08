/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";
// import { useEffect } from "react";

const CategoryPlayer = ({ player, index, players }) => {

  // const { users,fetchAllUsers } = useUserStore();
  // Check if all previous players are sold
  const isSequentiallyAvailable = players
    .slice(0, index)
    .every((prevPlayer) => prevPlayer?.isSold || prevPlayer?.isUnsold);

    // const playerIsUnsold = player?.isSkippedBy.length === users.length

    // useEffect(() => {
    //   fetchAllUsers();
    // },[fetchAllUsers])


  if (!player) return null;

  



  return (
    <div className='w-full max-w-full sm:max-w-full'>
    <div className="border border-gray-600 sm:px-10 sm:py-3 pr-2 mt-3 rounded-md bg-gradient-to-b from-white to-gray-800">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={player.img} alt="" className="h-20 w-20 sm:h-24 sm:w-24 " />
          <p className="sm:text-2xl font-bold sm:ml-5 ml-1 text-black text-sm">{player.name}</p>
        </div>
        <div className="flex justify-center items-center">
          <Link to={`/auction/${player._id}`}>
            <button
              className={`w-30 sm:w-56 px-4 sm:px-7 py-2 sm:py-4 text-xs sm:text-base sm:font-extrabold rounded-lg ${
                player?.isSold
                  ? "bg-gradient-to-b from-gray-900 to-black text-blue-700 font-extrabold cursor-not-allowed"
                  : player?.isUnsold
                  ? "bg-gradient-to-t from-red-500 to-red-800 text-black cursor-not-allowed"
                  : !isSequentiallyAvailable
                  ? "bg-gradient-to-t from-blue-500 to-indigo-600 text-white cursor-not-allowed"
                  : "bg-gradient-to-t from-green-500 to-emerald-500 text-black font-bold"
              }`}
              disabled={player?.isSold || !isSequentiallyAvailable || player?.isUnsold}
            >
              {player?.isSold
                ? `Sold at ₹ ${player?.basePrice}Cr`
                : !isSequentiallyAvailable
                ? "Coming Soon"
                : player.isUnsold
                ? "Unsold"
                : "Enter Bidding"}
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CategoryPlayer;
