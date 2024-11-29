/* eslint-disable react/prop-types */
const TeamPlayers = ({player}) => {
    return (
      <div className='px-28 mt-16'>
        <div className='border border-gray-600 flex flex-col justify-center items-center h-auto w-72 p-4 rounded-2xl bg-gradient-to-t from-white to-gray-800'>
          <img src={player?.img} alt="Player" className='h-52 w-52 mb-4' />
          <table className='table-auto border-collapse w-full text-center'>
            <tbody>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Name:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-blue-500'>{player?.name}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Role:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-blue-500'>{player?.role}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Style:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-blue-500'>{player?.style}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Category:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-blue-500'>{player?.category}</td>
              </tr>
              <tr>
                <td className='font-bold py-1 px-2 border border-gray-600  text-black'>Sold At:</td>
                <td className='font-bold py-1 px-2 border border-gray-600  text-blue-500'>₹ {player?.basePrice} Cr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default TeamPlayers;
  
  