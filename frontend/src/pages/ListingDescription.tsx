import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaEdit, FaTrash, FaCar, FaCouch, FaBed, FaBath, FaHome, FaListAlt, FaInfoCircle } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import { RotatingSquare } from 'react-loader-spinner';
import DashboardSideBar from './../components/Dashboard/DashboardSideBar';
import DashboardHeader from './../components/Dashboard/DashboardHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EditListingModal from '../components/Listing/EditListingModal';
import DeleteListingModal from '../components/Listing/DeleteListingModal';
import { addToFavorites, deleteListingByID, getAllFavorites, getListingByID, removeFromFavorites } from '../api/listingApi';
import { getUserProfile } from '../api/userApi';
import ViewContactDetailsModal from '../components/Contact/ViewContactDetailsModal';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga4';
import Images from '../assets/images';

const ListingDescription = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [listing, setListing] = useState<any>(null);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<any>({});
    const [favListingData, setFavListingData] = useState<any>([]);
    const [showContactDetailsForm, setShowContactDetailsForm] = useState(false);

    const googleMapsApiKey = 'AIzaSyAuPFEQGq-5JohYzHZxJpQ6buf24tU_dmU';

    const containerStyle = {
        width: '100%',
        height: '300px'
    }

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
        fetchListing();
        setLoading(true);
        getAllFavoriteListings();
    }, []);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: `/listingdescription${id}`, title: "Listing Description" });
    }, []);


    const getAllFavoriteListings = async () => {
        try {
            const response = await getAllFavorites();
            setFavListingData(response);
        } catch (error) {
            console.log('No favorite listings available', error)
        } finally {
            setLoading(false);
        }
    }

    const getCoordinates = async (address: any) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`);
            const data = await response.json();
            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                return { lat: location.lat, lng: location.lng };
            } else {
                throw new Error('Geocoding API error:' + data.status);
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return { lat: 0, lng: 0 };
        }
    }

    const fetchListing = async () => {
        try {
            const response = await getListingByID(id);
            if (response && response.data) {
                setListing(response.data);
                const { lat, lng } = await getCoordinates(response.data.address);
                setCoordinates({ lat, lng });
            }
        } catch (error) {
            console.error('Error fetching listing details:', error);
            setError('Failed to fetch listing details.');
        } finally {
            setLoading(false);
        }
    }

    const fetchUserProfile = async () => {
        try {
            const { data }: any = await getUserProfile();
            setUserProfile(data);
        } catch (error) {
            console.error('Error fetchig user profile:', error);
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    }

    const handleOpenContactModal = () => {
        setShowContactDetailsForm(true);
        ReactGA.event({
            category: 'Button',
            action: 'Clicked View Contact Details Modal',
            label: 'Contact Details Modal',
        });
    }
    const handleCloseContactModal = () => {
        setShowContactDetailsForm(false);
    }

    const handleUpdateSuccess = () => {
        fetchListing();
        handleCloseModal();
    }

    const handleDelete = async () => {
        try {
            await deleteListingByID(id);
            ReactGA.event({
                category: 'Button',
                action: 'Clicked Delete Listing Button',
                label: 'Delete Listing',
            });
            handleCloseDeleteModal();
            navigate('/listings');
        } catch (error) {
            console.error('Error deletng listing:', error);
        }
    }

    const togglefavorite = async (itemId: string) => {
        try {
            const isFavorite = favListingData.some((fav: any) => fav._id === itemId);
            ReactGA.event({
                category: 'Listing Description Favorites',
                action: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
                label: itemId
            });
            if (isFavorite) {
                await removeFromFavorites(itemId);
                setFavListingData((prevData: any) => prevData.filter((fav: any) => fav._id !== itemId));
                toast.success('Listing removed from favorites!');
            }
            else {
                await addToFavorites(itemId);
                const updatedItem = { _id: itemId };
                setFavListingData((prevData: any) => [...prevData, updatedItem]);
                toast.success('Listing added to favorites!')
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('An error occurred while updating favorites.')
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
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
            <DashboardSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-col flex-1 w-full">
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
                                    <Link to="/listings" className="flex items-center text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out">
                                        <FaListAlt className="mr-1 text-gray-500" />
                                        <span>Listings</span>
                                    </Link>
                                </li>
                                <li>
                                    <span className="text-gray-400">/</span>
                                </li>
                                <li className="flex items-center">
                                    <FaInfoCircle className="mr-1 text-gray-500" />
                                    <span>Listing Description</span>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <RotatingSquare
                                visible={true}
                                height="100"
                                width="100"
                                color="#69B99D"
                                ariaLabel="rotating-square-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />

                        </div>
                    ) : error ? (
                        <div className="text-red-500">
                            <p>{error}</p>
                        </div>
                    ) : listing ? (
                        <div className="relative bg-white rounded-lg shadow-md p-6 flex transition-all duration-300 hover:shadow-lg">
                            {listing.userRef === userProfile._id && (
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button style={{ color: '#69B99D' }}
                                        className="text-blue-500 hover:text-blue-700" onClick={handleOpenModal}>
                                        <FaEdit className='w-5 h-5' />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" onClick={handleOpenDeleteModal}>
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            <div className="absolute top-3.5 right-20 flex space-x-2">
                                <img className="h-6 w-6 cursor-pointer"
                                    src={favListingData.some((fav: any) => fav._id === listing._id) ? Images.hearticon : Images.favicon}
                                    alt={favListingData.some((fav: any) => fav._id === listing._id) ? 'Favorite' : 'Not Favorite'}
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        togglefavorite(listing._id);
                                    }} />
                            </div>

                            <div className="flex-shrink-0 w-1/3">
                                <Zoom>
                                    <img
                                        src={listing.imageUrls.length > 0 ? listing.imageUrls[0] : 'https://via.placeholder.com/600'}
                                        alt={listing.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </Zoom>
                            </div>
                            <div className="flex-grow pl-6 ">
                                <div className="mt-4 flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-gray-700 mb-4">
                                        {listing.name}
                                    </h1>
                                </div>
                                <p className="text-lg text-gray-600 mb-4">
                                    {listing.description}
                                </p>
                                <div className="flex items-center text-sm text-gray-400 mb-4">
                                    <FaMapMarkerAlt className="mr-2" style={{ color: "#69B99D" }} />
                                    <p>{listing.address}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-lg font-bold text-gray-600">
                                        Price: ₹ {listing.discountPrice}
                                    </p>
                                </div>
                                <div className="flex mt-2 text-sm">
                                    <span className="bg-primaryColor text-white px-3 py-1 rounded-full font-semibold uppercase">{listing.type}</span>
                                </div>
                                <div className="flex mt-2 text-sm text-gray-600">
                                    <div className="flex items-center mr-4">
                                        <FaBed className="mr-1" style={{ color: "#69B99D" }} />
                                        <p>{listing.bedrooms} Beds</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaBath className="mr-1" style={{ color: "#69B99D" }} />
                                        <p>{listing.bathrooms} Baths</p>
                                    </div>
                                </div>

                                {listing.parking && (
                                    <div className="flex items-center mt-4 text-sm text-gray-600">
                                        <FaCar className="mr-2" style={{ color: "#69B99D" }} />
                                        <p>Parking Available</p>
                                    </div>
                                )}

                                {listing.furnished ? (
                                    <div className="flex items-center mt-4 text-sm text-gray-600">
                                        <FaCouch className="mr-2" style={{ color: "#69B99D" }} />
                                        <p>Furnished</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center mt-4 text-sm text-gray-600">
                                        <FaCouch className="mr-2" style={{ color: "#69B99D" }} />
                                        <p>Not Furnished</p>
                                    </div>
                                )}

                                <div className="flex mt-4 text-sm text-gray-600">
                                    <div className="flex items-center mr-4">
                                        <BiCategory className="mr-1" style={{ color: "#69B99D" }} />
                                        <p className="capitalize">{listing.category}</p>
                                    </div>
                                </div>

                                <div className='flex justify-end items-end'>
                                    <button className='custom-button px-4 py-2 border bg-gray-500 text-white rounded hover:bg-gray-700'
                                        onClick={handleOpenContactModal}
                                    >View Contact Details</button>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <p>No listing details available.</p>
                        </div>
                    )}

                    <div className="flex-grow mt-8">
                        <div className="mb-4">
                            <LoadScript googleMapsApiKey={googleMapsApiKey} >
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={coordinates}
                                    zoom={15}
                                    onLoad={() => console.log('Map loaded successfully')}
                                >
                                    <Marker position={coordinates} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </main>
                <EditListingModal isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal} editData={listing}
                    onUpdateSuccess={handleUpdateSuccess}
                />
                <DeleteListingModal isModalOpen={isDeleteModalOpen}
                    handleCloseModal={handleCloseDeleteModal} handleDelete={handleDelete}
                    listingName={listing?.name}
                />

                <ViewContactDetailsModal
                    isModalOpen={showContactDetailsForm}
                    handleCloseModal={handleCloseContactModal}
                    userId={listing?.userRef}
                />
            </div>
        </div>
    )
}

export default ListingDescription