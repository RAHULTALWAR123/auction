import { motion } from "framer-motion";
// import { Searc } from "lucide-react";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
// import { useProductStore } from "../stores/useProductStore";
// import ProductCard from "../components/ProductCard";
import { usePlayerStore } from "../stores/usePlayerStore";
// import TeamPlayers from "./TeamPlayers";
import SearchPlayer from "./SearchPlayer";

const SearchPage = () => {
    const [input, setInput] = useState('');
    const [searched, setSearched] = useState(false);
    const{fetchPlayerQuery, players} = usePlayerStore();
    const[pop,setPop] = useState("");


    useEffect(() => {
        if(input.trim().length > 0){
            fetchPlayerQuery(input);
            setPop("block");
        }
    },[fetchPlayerQuery, input]);


    const handleSearch = async(query) => {
    try{
        await fetchPlayerQuery(query);
        setSearched(true);
        setPop("none");
    }
    catch(error){
            console.log(error);
        }
    }

    const handleSuggestion = (playerName) => {
        setInput(playerName);
        handleSearch(playerName);
        setPop("none");
    }

    const handleSubmit = () => {
        // e.preventDefault();
        handleSearch(input);
        setInput('');
    }

    return (
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Title */}
            <h1 className='flex justify-center items-center text-3xl font-bold mt-5 text-indigo-600'>
                Search Player..
            </h1>

            {/* Search Form */}
            <div className='flex justify-center items-center mt-6'>
                <form onSubmit={handleSubmit} className="flex items-center bg-gradient-to-b from-white to-gray-800 rounded-2xl p-4 w-full max-w-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent text-black placeholder-black outline-none w-full"
                    />
                    <button type="submit" className='text-white bg-gradient-to-t from-black to-blue-700 hover:bg-indigo-700 px-3 py-3 rounded-full ml-2'>
                        <ImCross size={22} />
                    </button>
                </form>

                {/* Suggestion */}
                {input.trim() && players.length > 0 && (
                    <ul className='absolute top-80 bg-gradient-to-t from-black to-blue-700 rounded-2xl p-4 w-full max-w-lg z-10 shadow-lg overflow-y-auto'
                    style={{ maxHeight: "200px", display: pop }}
                    >
                        {players.map((player) => (
                            <li
                                key={player._id}
                                onClick={() => handleSuggestion(player.name)}
                                className="px-4 py-2 hover:bg-gray-900 rounded-2xl cursor-pointer font-bold"
                            >
                                {player.name}
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            {/* Product Grid */}
            <div className="mt-8">
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* No products found */}
                    {searched && players.length === 0 && (
                        <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                            No player found
                        </h2>
                    )}

                    {/* Display searched products */}
                    <div>
                    {searched && players.map((player) =>(
                        <SearchPlayer key={player._id} player={player} />
                    )) 
                    }
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default SearchPage;
