// import React from 'react'

// import { color } from "framer-motion"

const Rules = () => {
    const slides = [
        {
            title:"₹ 80 Cr",
            // subtitle:"Kohli",
            description:"Budget alloted to each team before starting the auction,teams cant spend more than their budget",
            color1:"text-yellow-500",
            color2:"text-black",
            img:"/money.png",
            background:"gradient-to-b from-lime-500 to-emerald-700",
        },
        {
            title:"11-15",
            // subtitle:"Pant",
            description:"Squad size of each team should be between 11-15 players",
            color1:"text-violet-900",
            color2:"text-red-500",
            img:"/squad.png",
            background:"gradient-to-b from-emerald-700 to-blue-600",
        },
        {
            title:"Submit Retention",
            // subtitle:"Bumrah",
            description:"After completing team click on finalize and then if team wants they can retain players from last season and finally click on submit retention",
            color1:"text-green-500",
            color2:"text-yellow-500",
            img:"/submit.png",
            background:"gradient-to-b from-blue-600 to-indigo-700",
        },
        {
            title:"3",
            // subtitle:"Dhoni",
            description:"Max number of retensions are allowed-\n\nRetention1: 15Cr\nRetention2: 11Cr\nRetention3: 6Cr",
            color1:"text-orange-500",
            color2:"text-gray-400",
            img:"/retain.png",
            background:"gradient-to-b from-indigo-700 to-gray-800",
        },
        {
            title:"Bid",
            // subtitle:"Cummins",
            description:"Bidding war begins here,teams need to wait for other user after placing their bid",
            color1:"text-blue-600",
            color2:"text-lime-500",
            img:"/bid.webp",
            background:"gradient-to-b from-gray-800 to-gray-600",
        },
        {
            title:"Ai",
            // subtitle:"Cummins",
            description:"Use intelligence of Ai to make stratgies and build a powerful squad ",
            color1:"text-yellow-500",
            color2:"text-black",
            img:"/ai.webp",
            background:"gradient-to-b from-gray-600 to-red-700",
        },
        {
            title:"Skip",
            // subtitle:"Cummins",
            description:"If teams dont want to bid they can simply skip the player and wait for other teams\nin the bidding war",
            color1:"text-purple-600",
            color2:"text-gray-200",
            img:"/skip.webp",
            background:"gradient-to-b from-red-700 to-yellow-500",
        },
        {
            title:"Sold !",
            // subtitle:"Cummins",
            description:"Player will be sold to the team with the highest bid and also when no team is remaining in the bidding war",
            color1:"text-blue-800",
            color2:"text-gray-800",
            img:"/sold.png",
            background:"gradient-to-b from-yellow-500 to-purple-900",
        },
        {
            title:"RTM",
            // subtitle:"Cummins",
            description:"Each team will have RTM cards depending on their number of retensions ,teams can excercise RTM cards to retain players without entering the bidding war",
            color1:"text-yellow-500",
            color2:"text-green-500",
            img:"/rtm.webp",
            background:"gradient-to-b from-purple-900 to-blue-400",
        },
        {
            title:"All The Best !",
            // subtitle:"Cummins",
            description:"Wishing the teams best of luck for the auction hope you will be able to build\n your dream squad!",
            color1:"text-pink-500",
            color2:"text-yellow-600",
            img:"/done.webp",
            background:"gradient-to-b from-blue-400 to-gray-900",
        },
    ]
  return (
    <div className="w-screen container relative">
        {slides.map((slide)=>{
            return <section key={slide.title} className={`h-screen flex snap-start w-full bg-${slide.background}`}>
                {/* <div className="text-center">
                    <h1>Auction Rules</h1>
                </div> */}
                <div className="sm:w-[50%] w-[50%] flex justify-center items-center rounded-xl">
                    <div className="sm:w-[50%] sm:h-[50%] w-[100%] h-[100%] bg-center bg-no-repeat mr-5 ml-3" style={{backgroundImage:`url(${slide.img})`,backgroundSize:"contain"}}>
                    </div>
                </div>
                <div className="sm:w-[50%] w-[60%]">
                    <div className="flex flex-col justify-center  h-full">
                        <h2 className={`font-extrabold sm:text-8xl text-4xl ${slide.color1}`}>{slide.title}</h2>
                        {/* <h2 className="font-extrabold text-8xl">{slide.subtitle}</h2> */}
                        <h1 className={`font-extrabold sm:text-4xl text-2xl mt-5 ${slide.color2} whitespace-pre-line`}>{slide.description}</h1>
                    </div>
                </div>
            </section>
            
        })}
    </div>
  ) 
}

export default Rules
