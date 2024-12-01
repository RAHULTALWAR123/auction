import { useEffect, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";

/* eslint-disable react/prop-types */
const SearchPlayer = ({player}) => {

    const {getOwner,owner} = usePlayerStore()

    const [bg, setBg] = useState("");

    useEffect(() => {
        getOwner(player?._id);


        if(owner?.username === "RCB"){
            setBg("gradient-to-b from-black to-red-600");
          }
          else if(owner?.username === "MI"){
            setBg("gradient-to-b from-yellow-500 to-blue-600");
          }
          else if(owner?.username === "CSK"){
            setBg("gradient-to-b from-yellow-500 to-yellow-800");
          }
          else if(owner?.username === "RR"){
            setBg("gradient-to-b from-pink-500 to-blue-500");
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
          else{
            setBg("gradient-to-t from-white to-gray-800");
          }
          
    },[getOwner,player?._id,owner?.username])


    return (
      <div className='flex justify-center items-center mt-10'>
        <div className={`border border-gray-600 flex flex-col justify-center items-center h-auto w-72 p-4 rounded-2xl bg-${bg}`}>
          <img src={player?.img} alt="Player" className='h-52 w-52 mb-4' />
          <table className='table-auto border-collapse w-full text-center'>
            <tbody>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Name:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.name}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Role:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.role}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Style:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.style}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Category:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.category}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Sold At:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.isSold ?  ` ₹ ${player?.basePrice} Cr `:"-"}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Sold to:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-white'>{player?.isSold ?  `${owner?.username}`:"-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default SearchPlayer;
  
  