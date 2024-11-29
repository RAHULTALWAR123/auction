/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CategoryPlayer = ({ player }) => {

  if (!player) return null; 

  return (
    <div className='border border-gray-600 px-10 py-3 mt-3 rounded-md bg-gradient-to-b from-white to-gray-500'>
        <div className='flex justify-between'>
            <div className='flex items-center'>
                <img src={player.img} alt="" className='h-24 w-24' />
                <p className='text-2xl font-bold ml-5 text-black'>{player.name}</p>
            </div>
            <div className="flex items-center">
                <Link to={`/auction/${player._id}`}>
                    <button 
                      className={`px-7 py-4 font-bold rounded-md ${player?.isSold ? 'bg-black text-white cursor-not-allowed' : 'bg-gradient-to-t from-blue-900 to-indigo-500 text-white'}`}
                      disabled={player?.isSold}
                    >
                      {player?.isSold ? `Sold at ₹ ${player?.basePrice}Cr` : "Enter Bidding"}
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CategoryPlayer;

