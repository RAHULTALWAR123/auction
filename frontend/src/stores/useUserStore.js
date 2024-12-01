import { create } from 'zustand'
import axios from '../lib/axios'
import { toast } from 'react-hot-toast'
import socket from '../socket/socket'

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    users: [],
    skippedUsers: [],


    // Initialize socket listeners for user-related events
    // initializeUserSocketListeners: () => {
    //     socket.on("player-skipped", ({ playerId, userId }) => {
    //         set((state) => {
    //             if (!state.user) return state;

    //             // If this is the user who skipped
    //             if (state.user._id === userId) {
    //                 return {
    //                     ...state,
    //                     user: {
    //                         ...state.user,
    //                         skipped: [...(state.user.skipped || []), playerId]
    //                     }
    //                 };
    //             }
    //             return state;
    //         });
    //     });
    // },

    // Clean up socket listeners
    cleanupUserSocketListeners: () => {
        socket.off("player-skipped");
    },

    signup: async ({ username, email, password, confirmPassword }) => {
        set({ loading: true })

        if (password !== confirmPassword) {
            set({ loading: false })
            return toast.error("Passwords do not match")
        }
        try {
            const res = await axios.post("/auth/signup", { username, email, password })
            set({ user: res.data, loading: false })
            console.log(res.data)
            return toast.success("Account created successfully")

        } catch (error) {
            set({ loading: false })
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    login: async (email, password) => {
        set({ loading: true })

        try {
            const res = await axios.post("/auth/login", { email, password })
            set({ user: res.data, loading: false })
            console.log(res.data)
            return toast.success("Logged in successfully")
        }
        catch (error) {
            set({ loading: false })
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    logout: async () => {
        set({ loading: true })
        try {
            await axios.post("/auth/logout")
            set({ user: null, loading: false })
            return toast.success("Logged out successfully")
        } catch (error) {
            set({ loading: false })
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true })
        try {
            const res = await axios.get("/auth/profile")
            set({ user: res.data, checkingAuth: false })
            console.log(res.data)

        } catch (error) {
            set({ checkingAuth: false, user: null })
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    fetchAllUsers: async () => {
        set({ loading: true })
        try {
            const res = await axios.get("/auth/fetch")
            set({ users: res.data, loading: false })
            console.log(res.data)
        } catch (error) {
            set({ loading: false })
            return toast.error(error.response.data.message || "an error occured")
        }
    },


 SkipCurrentPlayer: async (id) => {
    set({ loading: true });
    try {
        const res = await axios.patch(`/auth/skip/${id}`);

        // Emit the skip event through socket
        socket.emit("player-skipped", {
            playerId: id,
            userId: res.data.user._id || res.data.userId
        });


        set((state) => {

            const updatedSkippedUsers = res.data.skippedUsers || [];
            
            return {
                skippedUsers: updatedSkippedUsers,
                loading: false
            };
        });


        get().getSkippedUser(id);

        toast.success("Player skipped successfully");
        return res.data;
    } catch (error) {
        set({ loading: false });
        console.error("Skip error:", error);
        toast.error(error.response?.data?.message || "An error occurred while skipping");
        return null;
    }
},

getSkippedUser: async (id) => {
    set({ loading: true });
    try {
        const res = await axios.get(`/players/skipped/${id}`);
        

        set({ 
            skippedUsers: res.data, 
            loading: false 
        });

        console.log("Skipped users:", res.data);
        return res.data;
    } catch (error) {
        set({ loading: false });
        return toast.error(error.response.data.message || "An error occurred");
    }
},

initializeUserSocketListeners: () => {
    socket.on("player-skipped", async ({ playerId, userId }) => {
        console.log("Socket skip event received:", { playerId, userId });
        

        const skippedUsers = await get().getSkippedUser(playerId);
        
        set((state) => {

            const updatedUser = state.user ? {
                ...state.user,
                skipped: state.user.skipped ? 
                    [...new Set([...state.user.skipped, playerId])] : 
                    [playerId]
            } : null;

            return {
                user: updatedUser,
                skippedUsers: skippedUsers || state.skippedUsers
            };
        });
    });
},
}))
