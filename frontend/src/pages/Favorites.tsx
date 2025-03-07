import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaHome } from 'react-icons/fa';
import { MdFavoriteBorder } from "react-icons/md";
import { RotatingSquare } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { favoriteListings } from '../redux/store/slice/listingSlice'
import { getAllFavorites, removeFromFavorites } from '../api/listingApi';
import { useDispatch } from 'react-redux';
import DashboardSideBar from '../components/Dashboard/DashboardSideBar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga4';
import Images from '../assets/images';

const Favorites = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [favListingData, setFavListingData] = useState<any>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recordsPerPage = 9;

    const getAllFavoriteListings = async () => {
        try {
            const response = await getAllFavorites();
            setFavListingData(response);
            dispatch(favoriteListings(response));
            const totalRecords = response?.data?.length;
            setTotalPages(Math.ceil(totalRecords / recordsPerPage));
        } catch (error) {
            console.log('No favorite listings available', error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getAllFavoriteListings();
    }, []);


    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedListings = favListingData.slice(startIndex, endIndex);

    const handleCardClick = (id: any) => {
        navigate(`/listingdescription/${id}`)
    }

    const togglefavorite = async (itemId: string) => {
        try {
            const isFavorite = favListingData.some((fav: any) => fav._id === itemId);

            if (isFavorite) {
                await removeFromFavorites(itemId);
                setFavListingData((prevData: any) => prevData.filter((fav: any) => fav._id !== itemId));
                toast.success('Listing removed from favorites!');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('An error occurred while updating favorites.')
        }
    };

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/favorites", title: "Favorites" });
    }, []);

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <DashboardSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex flex-col flex-1 w-full">
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                        transition={Flip}
                    />
                    <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
                                        <Link to='/favorites' className='flex items-center text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out'>
                                            <MdFavoriteBorder className='mr-1 text-gray-500' />
                                            <span>Favorites</span>
                                        </Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            Favorite Listings
                        </h2>


                        {loading ? (
                            <div className='flex justify-center items-center h-96'>
                                <RotatingSquare
                                    visible={true}
                                    height="100"
                                    width="100"
                                    color="#69B99D"
                                    ariaLabel="rotating-square-loading"
                                    wrapperStyle={{}}
                                />
                            </div>
                        ) : paginatedListings?.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-96'>
                                <img src={Images.noDataImage} alt="No Data Available"
                                    className='mb-4'
                                    style={{ width: '250px', height: '250px' }}
                                />
                                <p className="text-gray-600 text-lg">
                                    No Favorite Listings Available
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
                                    {paginatedListings.map((listing: any) => (
                                        <div key={listing._id}
                                            onClick={() => handleCardClick(listing._id)}
                                            className="bg-white rounded-lg shadow-lg p-4 flex flex-col  hover:shadow-xl cursor-pointer">
                                            <img src={listing.imageUrls?.length > 0 ? listing.imageUrls[0] : "https://via.placeholder.com/150"} alt={listing.name}
                                                className='w-full h-52 object-cover rounded-t-lg'
                                            />
                                            <div className="mt-4">
                                                <div className="mt-4 flex items-center justify-between">
                                                    <h3 className="text-lg font-bold">{listing.name}</h3>
                                                    <img className="h-6 w-6"
                                                        src={favListingData.some((fav: any) => fav._id === listing._id) ? Images.hearticon : Images.favicon}
                                                        alt={favListingData.some((fav: any) => fav._id === listing._id) ? 'Favorite' : 'Not Favorite'}
                                                        onClick={(e: any) => {
                                                            e.stopPropagation();
                                                            togglefavorite(listing._id);
                                                        }} />
                                                </div>


                                                <p className="text-gray-500 mt-2">{listing.description}</p>
                                                <p className="text-gray-500 flex items-center gap-1 mt-2">
                                                    <FaMapMarkerAlt />
                                                    {listing.address}
                                                </p>
                                                <p className="text-gary-500 mt-2">
                                                    {listing.offer ? (
                                                        <>
                                                            <span className="font-semibold line-through text-red-500 mr-2">₹{listing.regularPrice}</span>
                                                            <span className="font-semibold text-green-600">₹{listing.discountPrice}</span>
                                                        </>
                                                    ) : (
                                                        <span className="font-semibold text-green-600">₹{listing.regularPrice}</span>
                                                    )}
                                                </p>
                                                <div className="flex justify-between gap-2 mt-4">

                                                    <div className="flex justify-between text-gray-600 mt-2">
                                                        <div className="flex items-center mr-4">
                                                            <FaBed className="mr-2" />
                                                            {listing.bedrooms} Beds
                                                        </div>
                                                        <div className="flex items-center mr-4">
                                                            <FaBath className="mr-2" />
                                                            {listing.bathrooms} Baths
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}



                    </main>
                </div>

            </div>


        </>

    )
}

export default Favorites