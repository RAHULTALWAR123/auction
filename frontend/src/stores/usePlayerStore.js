import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import socket from '../socket/socket'; // Import the socket instance

export const usePlayerStore = create((set, get) => ({
    player: null,
    owner: null,
    loading: false,
    teamLoading: false,
    loadingSpinner: false,
    topLoading: false,
    submitLoading: false,
    bidloading: false,
    players: [],
    marqueePlayers: [],
    batsmanPlayers: [],
    bowlerPlayers: [],
    allrounderPlayers: [],
    soldNotifications: [],
    bid: null,
    assist: null,
    lastBidder: null,
    topPlayers: [],
    
    clearNotifications: () => set({ soldNotifications: [] }),

    initializeSocketListeners: (playerId) => {
        socket.emit("join-auction", playerId);

        socket.on("auction-state", (state) => {
            set((currentState) => ({
                ...currentState,
                player: {
                    ...currentState.player,
                    basePrice: state.currentPrice,
                    lastBidder: state.lastBidderId
                }
            }));
        });


        socket.on("player-skipped", ({ playerId, userId }) => {
            set((currentState) => {
                if (!currentState.player || currentState.player._id !== playerId) {
                    return currentState;
                }


                const currentSkippedBy = currentState.player.isSkippedBy || [];
                if (!currentSkippedBy.includes(userId)) {
                    return {
                        ...currentState,
                        player: {
                            ...currentState.player,
                            isSkippedBy: [...currentSkippedBy, userId]
                        }
                    };
                }
                return currentState;
            });
        });

        socket.on("bid-updated", (update) => {
            set((currentState) => ({
                ...currentState,
                player: {
                    ...currentState.player,
                    basePrice: update.currentPrice,
                    lastBidder: update.lastBidderId
                },
                lastBidder: update.lastBidderName 
            }));
        });

        socket.on("bid-notifications", ({ bidderName, timestamp}) => {
            console.log("Socket bid notification received:", { bidderName, timestamp });

            set((state) => ({
                ...state,
                lastBidder: bidderName,
            }))
        })

        socket.on("player-sold", (soldData) => {
            set((currentState) => ({
                ...currentState,
                player: {
                    ...currentState.player,
                    isSold: true,
                    soldTo: soldData.buyerId,
                    finalPrice: soldData.finalPrice
                }
            }));
        });

        socket.on("sold-notifications", ({ message, timestamp }) => {
            console.log("Socket sold notification received:", { message, timestamp });

            set((state) => ({
                ...state,
                soldNotifications: [{ message, timestamp }]
            }))
        })

    },

    // Clean up socket listeners
    cleanupSocketListeners: () => {
        socket.off("auction-state");
        socket.off("bid-updated");
        socket.off("player-sold");

    },


    getPlayerCategory: async (category) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/players/category/${category}`);
            set({ [`${category.toLowerCase()}Players`]: res.data, loading: false });
            console.log(res.data);
        } catch (error) {
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },


    fetchPlayer: async (id) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/players/${id}`);
            set((state) => ({
                ...state,
                player: { ...res.data },
                loading: false,
            }));
            console.log(res.data);
        } catch (error) {
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },

    fetchPlayerName : async(name)=>{
        set({ loading: true });
        try{
            const res = await axios.get(`/players/name/${name}`);
            set({ player: res.data, loading: false });
            console.log(res.data);
        }
        catch(error){
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },

    fetchPlayerQuery: async (query) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/players/re-search?query=${query}`);
            set({ players: res.data, loading: false });
            console.log(res.data);
        }
        catch(error){
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },

    fetchLastBid: async (id) => {
        set({ loading: true });
        try{
            const res = await axios.get(`/players/lastbid/${id}`);
            set({ lastBidder: res.data.lastbid, loading: false });
            console.log(res.data.lastbid);
        }
        catch(error){
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },

    addAPlayer : async(playerData) => {
        set({ loading: true });
        try{
            const res = await axios.post("/players/create", playerData);
            set((prevState)=>({
                players: [...prevState.players, res.data],
                loading: false
            }))
            console.log(res.data);
            toast.success('Player added successfully');
        }catch(error){
            set({ loading: false });
            return toast.error(error.response.data.message || 'An error occurred');
        }
    },


    bidPlayer: async (id) => {
        set({ bidloading: true });
        try {
            const res = await axios.patch(`/auction/bid/${id}`);
            const updatedPlayer = res.data.player;


            socket.emit("bid-update", {
                playerId: id,
                newPrice: updatedPlayer.basePrice,
                bidderId: updatedPlayer.lastBidder
            });

            set((state) => ({
                ...state,
                player: updatedPlayer,
                lastBidder: get().lastBidder?.username,
                bidloading: false
            }));

            return toast.success('Bid placed successfully');
        } catch (error) {
            set({ bidloading: false });
            return toast.error(error.response?.data?.message || 'An error occurred');
        }
    },


    updatePlayer: (updatedPlayer) => {
        console.log("Updating player in store:", updatedPlayer);
        set((state) => ({
            ...state,
            player: state.player?._id === updatedPlayer._id ? updatedPlayer : state.player,
        }));
    },


    playerSold: async (id) => {
        set({ loading: true });
        try {
            const res = await axios.post(`/auction/sold/${id}`);


            socket.emit("player-sold", {
                playerId: res.data.player.name,
                buyerId: res.data.currentUser.name,
                finalPrice: res.data.player.basePrice
            });

            set((state) => ({
                ...state,
                player: res.data,
                loading: false
            }));

            toast.success('Player sold successfully');
            return true;
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || 'An error occurred');
            return false;
        }
    },


    getTeam: async (id) => {
        set({ teamLoading: true });
        try {
            const res = await axios.get(`/players/team/${id}`);
            set({ players: res.data, teamLoading: false });
            console.log(res.data);
        } catch (error) {
            set({ teamLoading: false });
            console.log(error);
            // toast.error(error.response.data.message || 'An error occurred');
        }
    },

    getOwner : async (id) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/players/owner/${id}`);
            set({ owner: res.data, loading: false });
            console.log(res.data);
        } catch (error) {
            set({ loading: false });
            console.log(error);
            // toast.error(error.response.data.message || 'An error occurred');
        }
    },

    getTop : async() => {
        set({ topLoading: true });
        try{
            const res = await axios.get("/players/top-3")
            set({ topPlayers: res.data, topLoading: false });
            console.log(res.data);
        }catch(error){
            set({ topLoading: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },

    getAssist : async(id) => {
        set({ loadingSpinner: true });
        try{
            const res = await axios.post(`/auction/ai-suggest/${id}`);
            set((state) => ({
                ...state,
                assist: res.data.suggestions,
                loadingSpinner: false
            }));
            console.log(res.data);
        }
        catch(error){
            set({ loadingSpinner: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },

    retain : async (id) => {
        set({ loading: true });
        try{
            const res = await axios.patch(`/players/retain/${id}`);
            set((state) => ({
                ...state,
                player: res.data,
                loading: false
            }));
            toast.success(`${res.data.player.name} retained successfully`);
            console.log(res.data);
        }
        catch(error){
            set({ loading: false });
            toast.error(error.response.data.message || 'An error occurred');
        }
    },

    submit : async () => {
        set ({ submitLoading: true });
        try {
            const res = await axios.patch("/auth/submit-retention");
            set((state) => ({
                ...state,
                submitLoading: false,
                players: res.data.retainedPlayers
            }))
            return toast.success("Retentions submitted successfully");
        } catch (error) {
            set ({ submitLoading: false });
            // console.log(error);
            return toast.error(error.response.data.message || "An error occurred");
        }
    },

}))
