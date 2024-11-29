import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'
// import { data } from 'react-router-dom'

export const usePlayerStore = create((set) => ({
    player: null,
    loading:false,
    players:[],
    marqueePlayers:[],
    batsmanPlayers:[],
    bowlerPlayers:[],
    allrounderPlayers:[],
    bid:null,


    getPlayerCategory : async(category) => {
        set({loading:true})
        try{
            const res = await axios.get(`/players/category/${category}`)
            set({[`${category.toLowerCase()}Players`]:res.data,loading:false})
            console.log(res.data)

        }catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    fetchPlayer : async(id) => {
        set({loading:true})
        try{
            const res = await axios.get(`/players/${id}`)
            set((state) => ({
                ...state,
                player: { ...res.data },
                loading: false,
            }));
            console.log(res.data)
        }catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    bidPlayer: async (id) => {
        set({ loading: true });
        try {
            const res = await axios.patch(`/auction/bid/${id}`);
    
            set((state) => ({
                // Update the currently displayed player
                player: state.player?._id === id 
                    ? { ...state.player, basePrice: res.data.player.basePrice, lastBidder: res.data.player.lastBidder }
                    : state.player,
    
                // Update the players array if applicable
                // players: state.players.map((player) =>
                //     player._id === id
                //         ? { ...player, basePrice: res.data.player.basePrice, lastBidder: res.data.player.lastBidder }
                //         : player
                // ),
                loading: false,
            }));
    
            console.log(res.data);
            return toast.success("Bid placed successfully");
        } catch (error) {
            set({ loading: false });
            return toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    playerSold : async(id) => {
        set({loading:true})
        try {
            const res = await axios.post(`/auction/sold/${id}`)
            set({player:res.data,loading:false})
            console.log(res.data)
            toast.success("Player sold successfully")
            return true

        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "an error occured")
            return false
        }
    },

    getTeam : async(id) => {
        set({loading:true})
        try {
            const res = await axios.get(`/players/team/${id}`)
            set({players:res.data,loading:false})
            console.log(res.data)
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "an error occured")
        }
    }
    

}))