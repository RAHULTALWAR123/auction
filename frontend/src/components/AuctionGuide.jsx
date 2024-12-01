import { Link } from "react-router-dom";

const AuctionGuide = () => {
  return (
    <div>
      {/* IPL Logo */}
      <img 
        src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png" 
        alt="IPL Logo" 
        className="h-24 w-40 mx-auto mt-10" 
      />

      <h1 className="text-4xl font-extrabold text-center mt-10 bg-gradient-to-b from-lime-500 to-yellow-500 bg-clip-text text-transparent">
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

      {/* Background Section */}
      <div className="relative">
        {/* Background Image */}
        <img 
          src="https://assets.bcci.tv/watermarkoutput/bcci/photos/7004/a70de179-207e-4e8a-a7d2-67f0a4137548.jpg" 
          alt="Auction Background" 
          className="h-140 w-full object-cover opacity-30" 
        />

        {/* Rules Content */}
        <div className="absolute inset-0 flex flex-col justify-start items-start text-white px-4 sm:px-10 overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-center mt-10 border-b-4 border-yellow-400">
            Rules for the IPL Auction
          </h1>

          <div className="flex flex-col justify-start items-start mt-5 sm:mt-10">
            {[
              "Each team has a maximum of 80 Cr in their budget.",
              "Each team can bid for a maximum of 15 players.",
              "Each team has to bid for a minimum of 11 players.",
              "Each team has to wait for other users if they place a bid.",
              "Each team has the option to skip the player.",
              "If a team has placed a bid, then it cannot be skipped.",
              "The team which bids the highest for a player will buy that player.",
              "IPL Auction follows a fixed order; you can't randomly start bidding for any player.",
              "IPL Auction contains 4 Sets (Marquee, Batsman, Bowler, Allrounder).",
              "If all the players of a set have been auctioned, then the next set will start.",
            ].map((rule, index) => (
              <p className="font-bold text-xs sm:text-2xl mt-2 sm:mt-5" key={index}>
                {index + 1}. {rule}
              </p>
            ))}
          </div>
        </div>

        {/* Button at Bottom Center */}
        <Link to={"/category/Marquee"}>
          <div className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2">
            <button className="text-xs sm:text-xl font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-xl text-white bg-gradient-to-t from-purple-600 to-indigo-900 hover:opacity-90">
              Start the Auction
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuctionGuide;

