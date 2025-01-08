// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import Rules from "./Rules";

const AuctionGuide = () => {
  return (
    <>
      {/* IPL Logo */}
      <img 
        src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png" 
        alt="IPL Logo" 
        className="h-24 w-40 mx-auto mt-10" 
      />

      <h1 className="text-4xl font-extrabold text-center mt-10 bg-gradient-to-b from-purple-600 to-blue-700 bg-clip-text text-transparent">
        Welcome to TATA IPL Auction 2024
      </h1>

      {/* Central Image */}
      <div className="flex flex-col justify-center items-center">
        <img 
          src="https://assets.bcci.tv/watermarkoutput/bcci/photos/7004/541f576d-b044-4d2d-9d84-bfc29076d5b8.jpg" 
          alt="Central Auction Image" 
          className="h-full w-full mx-auto mt-10 object-cover" 
        />
      </div>



        {/* Rules Content */}



          <div className="">
            <Rules/>
          </div>
<Link to={`/category/Marquee`}>
<div className="flex flex-col justify-center items-center mb-5">
          <button>
            <div className="text-xl font-extrabold mt-5 py-5 px-8 rounded-lg text-black bg-gradient-to-t from-gray-800 to-white">
              Start Auction
            </div>
          </button>
          </div>
          </Link>





    </>
  );
};

export default AuctionGuide;

