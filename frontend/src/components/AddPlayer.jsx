// import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { usePlayerStore } from "../stores/usePlayerStore";
// import { useProductStore } from "../stores/useProductStore";

const roles = ["Batsman","Bowler","AllRounder"];
const styles = ["Right-Hand","Left-Hand"];
const categories = ["Marquee","Batsman", "Bowler", "AllRounder"];

const AddPlayer = () => {

    const [newPlayer, setNewPlayer] = useState({
		name: "",
		role: "",
		style: "",
		category: "",
		img: "",
        basePrice: "",
	});

    // const {createProduct, loading} = useProductStore();
    const {addAPlayer,loading} = usePlayerStore();
    // const {loading} = false;

    const handleSubmit = async (e) => {
		e.preventDefault();

        console.log(newPlayer);
		try {
			await addAPlayer(newPlayer);
			setNewPlayer({ name: "", description: "", price: "", category: "", img: "" ,basePrice:""});
		} catch {
			console.log("error creating a product");
		}
	};

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewPlayer({ ...newPlayer, img: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};




  return (
    <motion.div
    className='bg-gradient-to-l from-white to-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto mt-16'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
>
    <h2 className='text-2xl font-bold mb-6 text-indigo-700'>Add New Player</h2>

    <form 
    onSubmit={handleSubmit} 
    className='space-y-4'>
        <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                Player Name
            </label>
            <input
                type='text'
                id='name'
                name='name'
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                className='mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2
                 px-3 text-white focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:border-indigo-500'
                required
            />
        </div>

        <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
                Player Role
            </label>
            <select
                id='category'
                name='category'
                value={newPlayer.role}
                onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                className='mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md
                 shadow-sm py-2 px-3 text-white focus:outline-none 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                required
            >
                <option value=''>Select a role</option>
                {roles.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
                Player Style
            </label>
            <select
                id='category'
                name='category'
                value={newPlayer.style}
                onChange={(e) => setNewPlayer({ ...newPlayer, style: e.target.value })}
                className='mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md
                 shadow-sm py-2 px-3 text-white focus:outline-none 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                required
            >
                <option value=''>Select style</option>
                {styles.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
                Category
            </label>
            <select
                id='category'
                name='category'
                value={newPlayer.category}
                onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })}
                className='mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md
                 shadow-sm py-2 px-3 text-white focus:outline-none 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                required
            >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                BasePrice
            </label>
            <input
                type='text'
                id='name'
                name='name'
                value={newPlayer.basePrice}
                onChange={(e) => setNewPlayer({ ...newPlayer, basePrice: e.target.value })}
                className='mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2
                 px-3 text-white focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:border-indigo-500'
                required
            />
        </div>

        <div className='mt-1 flex items-center'>
            <input type='file' id='image' className='sr-only' accept='image/*' 
            onChange={handleImageChange}
            />
            <label
                htmlFor='image'
                className='cursor-pointer bg-gray-900 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
            >
                <Upload className='h-5 w-5 inline-block mr-2' />
                Upload Image
            </label>
            {newPlayer.img && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
        </div>

        <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
            shadow-sm text-sm font-medium text-white bg-gradient-to-b from-blue-500 to-indigo-800 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                    Loading...
                </>
            ) : (
                <>
                    <PlusCircle className='mr-2 h-5 w-5' />
                    Add Player
                </>
            )}
        </button>
    </form>
</motion.div>
    )
}

export default AddPlayer
