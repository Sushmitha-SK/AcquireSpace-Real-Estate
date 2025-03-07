import { useEffect, useState } from 'react';
import { FaTimes, FaPlus, FaListAlt, FaHome } from 'react-icons/fa';
import DashboardSideBar from './../components/Dashboard/DashboardSideBar';
import DashboardHeader from './../components/Dashboard/DashboardHeader';
import { Link } from 'react-router-dom';
import AddListingForm from './../components/Listing/AddListingForm';
import ShowListing from './../components/Listing/ShowListing';
import ReactGA from 'react-ga4';

const Listing = () => {
    const [sidebaropen, setSidebaropen] = useState(false);
    const [showAddListingForm, setShowAddListingForm] = useState(false);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/listings", title: "Listing" });
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <DashboardSideBar sidebarOpen={sidebaropen} setSidebarOpen={setSidebaropen} />

            <div className="flex flex-col flex-1 w-full">
                <DashboardHeader sidebarOpen={sidebaropen} setSidebarOpen={setSidebaropen} />
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="mb-6 flex justify-start">
                        <nav className="text-sm text-gray-600">
                            <ol className="flex space-x-4 items-center">
                                <li className="flex items-center">
                                    <Link to='/dashboard' className='flex items-center text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out'>
                                        <FaHome className='mr-1 text-gray-500' />
                                        <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <span className="text-gray-400">/</span>
                                </li>
                                <li className="flex items-center">
                                    <Link to='/listings' className='flex items-center text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out'>
                                        <FaListAlt className='mr-1 text-gray-500' />
                                        <span>Listings</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={() => setShowAddListingForm(!showAddListingForm)}
                            className='custom-button flex items-center px-4 py-2 text-white rounded-md shadow-sm focus:outline-none custom-focus-ring'>
                            {showAddListingForm ? (
                                <>
                                    <FaTimes className='w-5 h-5 mr-2' />
                                    Close
                                </>
                            ) : (
                                <>
                                    <FaPlus className='w-5 h-5 mr-2' />
                                    Add New Listing
                                </>
                            )}
                        </button>
                    </div>

                    {showAddListingForm ? (
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Add New Listing
                                <AddListingForm />
                            </h2>
                        </div>
                    ) : (
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow mb-6">
                            <ShowListing />
                        </div>
                    )}
                </main>
            </div >
        </div >
    )
}

export default Listing