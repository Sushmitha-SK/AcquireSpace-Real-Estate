import React, { useEffect, useState } from 'react'
import { MdOutlineHomeWork, MdFavoriteBorder } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearListingData } from '../../redux/store/slice/listingSlice';
import { clearUserProfile } from '../../redux/store/slice/userProfileSlice';
import { clearLogin } from '../../redux/store/slice/userSlice';
import ReactGA from 'react-ga4';

const DashboardSideBar = ({ sidebarOpen, setSidebarOpen }: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [setSidebarOpen]);

    const closeSidebar = () => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }

    const isActive = (path: any) => location.pathname === path;

    const handleLogoutClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Logout',
            label: 'Dashboard Sidebar',
        });
        dispatch(clearListingData())
        dispatch(clearUserProfile())
        dispatch(clearLogin())

        navigate('/login')

    };

    return (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-white transition duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}
            style={{ borderRight: '1px solid #e5e5e5' }}>
            <div className="flex items-center justify-center mt-10 pb-6">
                <div className="text-2xl font-semibold text-gray-900">
                    {/* <h1 className="font-semibold text-xl sm:text-3xl text-center font-[Kanit]"> */}
                    <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-center font-[Kanit]">

                        <span className="text-primaryColor">
                            Acquire
                        </span>
                        <span className="text-slate-700">
                            Space
                        </span>
                    </h1>

                </div>
            </div>

            <div className="mt-10">
                <Link to='/dashboard' onClick={closeSidebar}>
                    <div className={`sidebar-link flex items-center px-6 py-3 mt-4 text-gray-700 hover:bg-primaryColor hover:text-white transition-all duration-200 ease-in-out ${isActive('/dashboard') ? 'bg-primaryColor text-white' : ''}`}>
                        <AiOutlineHome className='w-5 h-5' />
                        <span className="ml-3 text-base font-medium">Home</span>
                    </div>
                </Link>
                <Link to="/listings" onClick={closeSidebar}>
                    <div className={`sidebar-link flex items-center px-6 py-3 mt-4 text-gray-700 hover:bg-primaryColor hover:text-white transition-all duration-200 ease-in-out ${isActive('/listings') ? 'bg-primaryColor text-white' : ''}`}>
                        <MdOutlineHomeWork className="w-5 h-5" />
                        <span className="ml-3 text-base font-medium">Listings</span>
                    </div>
                </Link>
                <Link to="/favorites" onClick={closeSidebar}>
                    <div className={`sidebar-link flex items-center px-6 py-3 mt-4 text-gray-700 hover:bg-primaryColor hover:text-white transition-all duration-200 ease-in-out ${isActive('/favorites') ? 'bg-primaryColor text-white' : ''}`}>
                        <MdFavoriteBorder className="w-5 h-5" />
                        <span className="ml-3 text-base font-medium">Favorites</span>
                    </div>
                </Link>
                <Link to="/profile" onClick={closeSidebar}>
                    <div className={`sidebar-link flex items-center px-6 py-3 mt-4 text-gray-700 hover:bg-primaryColor hover:text-white transition-all duration-200 ease-in-out ${isActive('/profile') ? 'bg-primaryColor text-white' : ''}`}>
                        <CgProfile className="w-5 h-5" />
                        <span className="ml-3 text-base font-medium">Profile</span>
                    </div>
                </Link>
                <div onClick={handleLogoutClick} className='cursor-pointer'>
                    <div className={`flex items-center px-6 py-3 mt-4 text-gray-700 hover:text-red-700 transition-all duration-200 ease-in-out ${isActive('/login') ? 'text-red-700' : ''}`}>
                        <TbLogout className="w-5 h-5" />
                        <span className="ml-3 text-base font-medium">Logout</span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default DashboardSideBar