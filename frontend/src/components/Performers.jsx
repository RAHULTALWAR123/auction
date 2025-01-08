// import React from 'react'

// import { color } from "framer-motion"

const Performers = () => {
    const slides = [
        {
            title:"Virat",
            subtitle:"Kohli",
            description:"8004 Runs",
            color:"text-yellow-500",
            img:"/virat.webp",
            background:"gradient-to-b from-black to-red-600",
            m:"244",
            hs:"113*",
            avg:"38.67",
            four:"705/262",
            fifty:"55/8",
            run:"4/6",
            halls:"50/100"
        },
        {
            title:"Rishabh",
            subtitle:"Pant",
            description:"4876 Runs",
            color:"text-green-500",
            img:"/pant.webp",
            background:"gradient-to-b from-red-600 to-blue-600",
            m:"202",
            hs:"128*",
            avg:"36.56",
            four:"502/306",
            fifty:"30/3",
            run:"4/6",
            halls:"50/100"
        },
        {
            title:"Jasprit",
            subtitle:"Bumrah",
            description:"205 Wickets",
            color:"text-indigo-900",
            img:"/boom.webp",
            background:"gradient-to-b from-blue-600 to-yellow-400",
            m:"160",
            hs:"5/10",
            avg:"22.45",
            four:"7.30",
            // eco:"7.30",
            fifty:"6/1",
            run:"Eco",
            halls:"4W/5W"
        },
        {
            title:"MS",
            subtitle:"Dhoni",
            description:"5243 Runs",
            color:"text-blue-700",
            img:"/ms.webp",
            background:"gradient-to-b from-yellow-400 to-orange-900",
            m:"264",
            hs:"84*",
            avg:"39.13",
            four:"363/252",
            fifty:"24/0",
            run:"4/6",
            halls:"50/100"
        },
        {
            title:"Pat",
            subtitle:"Cummins",
            description:"165 Wickets",
            color:"text-red-500",
            img:"/pat.webp",
            background:"gradient-to-b from-orange-900 to-gray-900",
            m:"133",
            hs:"4/34",
            avg:"30.52",
            four:"8.05",
            fifty:"3/0",
            run:"Eco",
            halls:"4W/5W"
        }
    ]

    
  return (

    <div className="w-screen container relative">
        {slides.map((slide)=>{
            return <section key={slide.title} className={`h-screen flex snap-start w-full bg-${slide.background}`}>
                <div className="sm:w-[65%] w-[30%] flex justify-center items-center">
                    <div className="sm:w-[50%] sm:h-[50%] w-[100%] h-[100%] bg-center bg-no-repeat" style={{backgroundImage:`url(${slide.img})`,backgroundSize:"contain"}}>

                    </div>
                </div>
                <div className="sm:w-[35%] w-[70%]">
                    <div className="flex flex-col justify-center  h-full">
                        <h2 className="font-extrabold sm:text-3xl text-xl text-black">{slide.title}</h2>
                        <h2 className="font-extrabold sm:text-8xl text-5xl">{slide.subtitle}</h2>
                        <h1 className={`font-extrabold sm:text-5xl text-3xl mt-5 ${slide.color}`}>{slide.description}</h1>
                        <div className="flex sm:gap-5 gap-2  mt-5 border border-white rounded-xl sm:p-5 p-3 sm:w-2/3 w-11/12">
                            <div className="flex-col">
                                <p className="font-bold sm:text-md text-xs">M</p>
                                <p className={`font-extrabold sm:text-lg text-xs ${slide.color}`}>{slide.m}</p>
                            </div>
                            <div className="flex-col">
                                <p className="font-bold sm:text-md text-xs">HS</p>
                                <p className={`font-extrabold sm:text-lg text-xs ${slide.color}`}>{slide.hs}</p>
                            </div>
                            <div className="flex-col">
                                <p className="font-bold sm:text-md text-xs">Avg</p>
                                <p className={`font-extrabold sm:text-lg text-xs ${slide.color}`}>{slide.avg}</p>
                            </div>
                            <div className="flex-col">
                                <p className="font-bold sm:text-md text-xs">{slide.run}</p>
                                <p className={`font-extrabold sm:text-lg text-xs ${slide.color}`}>{slide.four}</p>
                            </div>
                            <div className="flex-col">
                                <p className="font-bold sm:text-md text-xs">{slide.halls}</p>
                                <p className={`font-extrabold sm:text-lg text-xs ${slide.color}`}>{slide.fifty}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        })}
    </div>
  ) 
}

export default Performers
