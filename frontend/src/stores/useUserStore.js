import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'

export const useUserStore = create((set) => ({
    user: null,
    loading: false,
    checkingAuth:true,
    users:[],
    skippedUsers:[],


    signup : async({username, email, password , confirmPassword}) => {
        set({loading:true})

        if(password !== confirmPassword){
            set({loading:false})
            return toast.error("Passwords do not match")
        }
        try{
            const res = await axios.post("/auth/signup", {username,email,password})
            set({user:res.data,loading:false})
            console.log(res.data)
            return toast.success("Account created successfully")
            
        }catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    login : async(email,password) => {
        set({loading:true})

        try{
            const res = await axios.post("/auth/login", {email,password})
            set({user:res.data,loading:false})
            console.log(res.data)
            return toast.success("Logged in successfully")
        }
        catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    logout : async() => {
        set({loading:true})
        try {
            await axios.post("/auth/logout")
            set({user:null,loading:false})
            return toast.success("Logged out successfully")
        } catch (error) {
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    checkAuth : async() => {
        set({checkingAuth:true})
        try {
            const res = await axios.get("/auth/profile")
            set({user:res.data,checkingAuth:false})
            console.log(res.data)

        } catch (error) {
            set({checkingAuth:false,user:null})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    fetchAllUsers : async() => {
        set({loading:true})
        try{
            const res = await axios.get("/auth/fetch")
            set({users:res.data,loading:false})
            console.log(res.data)
        }catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    },

    SkipCurrentPlayer : async(id) => {
        set({loading:true})
        try{
            const res = await axios.patch(`/auth/skip/${id}`)
            // set({user:res.data,loading:false})
            set((state) => ({
                user:{...state.user , skipped:res.data.skipped},
                loading:false
            }))
            setTimeout(() => {
                window.location.reload(); // Reload after a small delay
            }, 100);
            console.log(res.data)
            return toast.success("Player skipped successfully")

        }
        catch(error){
            set({loading:false})
            return toast.error(error.response?.data?.message || "an error occured")
        }
    },


    getSkippedUser : async(id) => {
        set({loading:true})
        try{
            const res = await axios.get(`/players/skipped/${id}`)
            set({skippedUsers:res.data,loading:false})
            console.log(res.data)
        }catch(error){
            set({loading:false})
            return toast.error(error.response.data.message || "an error occured")
        }
    }
}))