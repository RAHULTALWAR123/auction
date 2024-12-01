import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
// import { useProductStore } from "../stores/useProductStore";
// import ProductCard from "../components/ProductCard";
import { usePlayerStore } from "../stores/usePlayerStore";
// import TeamPlayers from "./TeamPlayers";
import SearchPlayer from "./SearchPlayer";

const SearchPage = () => {
    const [input, setInput] = useState('');
    const [searched, setSearched] = useState(false);
    const{fetchPlayerName, player} = usePlayerStore();
    // const { fetchProductByName, products } = useProductStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPlayerName(input);
        setInput('');
        setSearched(true);
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
                    <button type="submit" className='text-white bg-gradient-to-t from-blue-900 to-indigo-900 hover:bg-indigo-700 px-4 py-1 rounded-lg ml-2'>
                        <Search size={22} />
                    </button>
                </form>
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
                    {searched && !player && (
                        <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                            No player found
                        </h2>
                    )}

                    {/* Display searched products */}
                    <div>
                    {searched && player && 
                        <SearchPlayer key={player._id} player={player} />
                    }
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default SearchPage;
