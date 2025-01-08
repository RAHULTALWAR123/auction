import { useEffect, useState } from 'react';
import { House, UserPlus, LogIn, LogOut, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";
// import {  FaTrophy } from "react-icons/fa";
import { useUserStore } from '../stores/useUserStore';
import { RiTeamFill } from 'react-icons/ri';
// import {PiUserCirclePlusFill} from 'react-icons/pi';
import {FaUserPlus} from 'react-icons/fa';

const Navbar = () => {
    const { user,logout } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [logo, setLogo] = useState("none");
    // const user = false;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (user) {
            if (user?.username === "RCB") {
                setLogo("/RCB.webp");
            } else if (user?.username === "MI") {
                setLogo("/MI.webp");
            } else if (user?.username === "CSK") {
                setLogo("/CSK.webp");
            } else if (user?.username === "RR") {
                setLogo("/RR.webp");
            } else if (user?.username === "DC") {
                setLogo("/DC.webp");
            } else if (user?.username === "KKR") {
                setLogo("/KKR.webp");
            }
        }
    }, [user]);

    return (
        <header className='fixed top-0 left-0 w-full bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-indigo-800 lg:border-none'>
            <div className='mx-auto px-4 py-3 lg:flex lg:justify-between lg:items-center'>
                <div className='flex justify-between items-center'>
                    <div className='text-2xl font-bold text-indigo-600 items-center space-x-2 flex'>
                        {/* <FaTrophy size={32} className='text-yellow-400'/> */}
                        <img src="https://documents.iplt20.com//ipl/assets/images/ipl-logo-new-old.png" alt="" className='h-12'/>
                    </div>
                    {/* Mobile Menu Button */}
                    <button className='text-white lg:hidden' onClick={toggleSidebar}>
                        <Menu size={28} />
                    </button>
                </div>

                {/* Sidebar for Small Screens */}
                <div className={`fixed top-0 left-0 h-full bg-gray-800 lg:bg-transparent p-6 z-50 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:static lg:flex lg:w-auto lg:p-0 lg:translate-x-0`}>
                    <nav className='flex flex-col lg:flex-row lg:items-center gap-4'>
                        <Link to='/' className='flex text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}><House />
                        <span className='lg:hidden sm:inline ml-2'>Home</span>
                        </Link>
						<Link to='/search' className='flex text-gray-300 hover:text-indigo-600 transition duration-300 ease-in-out' onClick={toggleSidebar}><Search />
						<span className='lg:hidden sm:inline ml-2'>Search Player</span>
						</Link>

                        {user ? (
                            <>
                            <Link to={"/add-player"}>
                            <button className='flex'>
                                <FaUserPlus size={24} />
                                <span className='lg:hidden sm:inline ml-2'>Add Player</span>
                            </button>
                            </Link>

                            <Link to={`/manage/${user?._id}`}>
                            <button className=' text-black py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={() => { toggleSidebar(); }}>
                            <img
                            src={logo}
                            alt="Team Logo"
                            className="h-12 w-12 rounded-full shadow-md"
          />
                            {/* <span className='sm:inline ml-2'>Manage Team</span> */}
                            </button>
                            </Link>

                            <Link to={"/auction"}>
                                <button className='bg-gradient-to-r from-gray-800 to-white  text-black py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
                                    <RiTeamFill size={18} />
                                        <span className='sm:inline ml-2'>Auction Summary</span>
                                </button>
                            </Link>

                            <Link to={"/login"}>
                            <button className='bg-gradient-to-l from-gray-800 to-white  text-black py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={logout}>
                                <LogOut size={22} />
                                {/* <span className='sm:inline ml-2'>Logout</span> */}
                            </button>
                            </Link>
                            </>
                        ) : (
                            <>
                                <Link to={"/signup"} className='bg-gradient-to-l from-gray-800 to-white  text-black py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link to={"/login"} className='bg-gradient-to-l from-white to-gray-800  text-black py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={toggleSidebar}>
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                {/* Overlay to close sidebar */}
                {isSidebarOpen && (
                    <div onClick={toggleSidebar} className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden'></div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
