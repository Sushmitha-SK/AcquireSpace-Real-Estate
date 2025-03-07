import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaMapMarkerAlt, FaBed, FaBath, FaSearch } from 'react-icons/fa';
import { RotatingSquare } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../api/userApi';
import { favoriteListings, listings } from '../../redux/store/slice/listingSlice';
import { addToFavorites, deleteListingByID, getAllFavorites, removeFromFavorites, searchListing } from '../../api/listingApi';
import EditListingModal from './EditListingModal';
import DeleteListingModal from './DeleteListingModal';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga4';
import Images from './../../assets/images/index';

const ShowListing = () => {
    const [listingData, setListingData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<any>({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [listingToDelete, setListingToDelete] = useState<any>(null);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');
    const [offer, setOffer] = useState(false);
    const [furnished, setFurnished] = useState(false);
    const [parking, setParking] = useState(false);
    const [sort, setSort] = useState('createdAt_desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [favListingData, setFavListingData] = useState<any>([]);

    const recordsPerPage = 9;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedListings = listingData.slice(startIndex, endIndex);

    useEffect(() => {
        handleSearch();
        fetchUserProfile();
        getAllFavoriteListings();
    }, [currentPage]);

    const fetchUserProfile = async () => {
        try {
            const { data }: any = await getUserProfile();
            setUserProfile(data);
        } catch (error) {
            console.error('Error fetching user profile', error)
        }
    };

    const handleEdit = (event: any, listing: any) => {
        event.stopPropagation();
        setSelectedListing(listing);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: any) => {
        try {
            await deleteListingByID(id);
            setListingData((prevListings: any) => prevListings.filter((listing: any) => listing._id !== id));
        } catch (error) {
            setIsDeleteModalOpen(false);
            setListingToDelete(null);
        }
    };

    const handlePageChange = (page: any) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            ReactGA.event({
                category: 'Button',
                action: 'Clicked Pagination',
                label: 'Pagination',
            });
        }
    };

    const handleSearch = async () => {
        ReactGA.event({
            category: 'Search',
            action: 'Search Initiated',
            label: searchTerm,
            value: currentPage,
            nonInteraction: false
        });

        setIsSearchClicked(true);
        const [sortField, sortOrder] = sort?.split('_') || [];

        const searchQuery: any = {
            limit: 10000,
            startIndex: 0
        };

        if (offer) searchQuery.offer = offer;
        if (furnished) searchQuery.furnished = furnished;
        if (parking) searchQuery.parking = parking;
        if (type) searchQuery.type = type;
        if (searchTerm) searchQuery.searchTerm = searchTerm;
        if (sortField) searchQuery.sortField = sortField;
        if (sortOrder) searchQuery.order = sortOrder;

        try {
            const searchData = await searchListing(searchQuery);
            if (searchData?.data) {
                setListingData(searchData.data);
                dispatch(listings(searchData.data));
                const totalRecords = searchData.data.length;
                setTotalPages(Math.ceil(totalRecords / recordsPerPage));
            } else {
                setListingData([]);
                console.error('No data found during search');
            }
        } catch (error) {
            console.error('Search error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (id: any) => {
        navigate(`/listingdescription/${id}`);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedListing(null);
    };

    const handleUpdateSuccess = () => {
        handleSearch();
        handleCloseEditModal();
    };

    const openDeleteModal = (listing: any) => {
        setListingToDelete(listing);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setListingToDelete(null);
    };

    const getAllFavoriteListings = async () => {
        try {
            const response = await getAllFavorites();
            setFavListingData(response);
            dispatch(favoriteListings(response));
        } catch (error) {
            console.log('No favorite listings available', error);
        } finally {
            setLoading(false);
        }
    };

    const togglefavorite = async (itemId: string) => {
        try {
            const isFavorite = favListingData.some((fav: any) => fav._id === itemId);
            ReactGA.event({
                category: 'Favorites',
                action: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
                label: itemId
            });
            if (isFavorite) {
                await removeFromFavorites(itemId);
                setFavListingData((prevData: any) => prevData.filter((fav: any) => fav._id !== itemId));
                toast.success('Listing removed from favorites!');
            } else {
                await addToFavorites(itemId);
                const updatedItem = { _id: itemId };
                setFavListingData((prevData: any) => [...prevData, updatedItem]);
                toast.success('Listing added to favorites!');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('An error occurred while updating favorites.');
        }
    };


    return (
        <>
            <h2 className="text-lg font-semibold text-gray-700">
                Listings
            </h2>
            <div className="flex flex-col gap-3 my-4 bg-white p-4">
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
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 bg-gray-50">
                    <FaSearch className="text-gray-500" />
                    <input type="text" name="" id="searchTerm"
                        value={searchTerm}
                        onChange={(e: any) => setSearchTerm(e.target.value)}
                        placeholder="Search for listings..."
                        className="flex-grow bg-transparent outline-none px-2"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-1">
                            Type
                        </label>
                        <div className="flex gap-4">
                            <label htmlFor="" className="flex items-center gap-1">
                                <input type="checkbox" name="" id="rent"
                                    checked={type === 'rent'}
                                    className='w-4 h-4'
                                    onChange={(e: any) => setType(e.target.checked ? 'rent' : '')}
                                />
                                Rent
                            </label>
                            <label htmlFor="" className="flex items-center gap-1">
                                <input type="checkbox" name="" id="rent"
                                    checked={type === 'sell'}
                                    className='w-4 h-4'
                                    onChange={(e: any) => setType(e.target.checked ? 'sell' : '')}
                                />
                                Sale
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold text-gray-600 mb-1">
                            Offer
                        </label>
                        <label htmlFor="" className="flex items-center gap-1">
                            <input type="checkbox" name="" id="rent"
                                checked={offer}
                                className='w-4 h-4'
                                onChange={(e: any) => setOffer(e.target.checked)}
                            />
                            Offer Available
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-600 mb-1">Amenities</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                                <input type="checkbox" id="parking" className="w-4 h-4" checked={parking} onChange={(e) => setParking(e.target.checked)} />
                                Parking
                            </label>
                            <label className="flex items-center gap-1">
                                <input type="checkbox" id="furnished" className="w-4 h-4" checked={furnished} onChange={(e) => setFurnished(e.target.checked)} />
                                Furnished
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-600 mb-1">Sort by</label>
                        <select value={sort} name="" id="sort_order"
                            onChange={(e: any) => setSort(e.target.value)}
                            className="border border-gray-300 rounded-lg p-1">
                            <option value="regularPrice_desc">Price High to Low</option>
                            <option value="regularPrice_asc">Price Low to High</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>

                    <div className="flex flex-col justify-end">
                        <button onClick={handleSearch} className="bg-primaryColor text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-cutsomDarkGreen flex items-center justify-center">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className='flex justify-center items-center h-96'>
                    <RotatingSquare
                        visible={true}
                        height="100"
                        width="100"
                        color="#3D52A0"
                        ariaLabel="rotating-square-loading"
                        wrapperStyle={{}}
                    />
                </div>
            ) : paginatedListings.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-96'>
                    <img src={Images.noDataImage} alt="No Data Available"
                        className='mb-4'
                        style={{ width: '250px', height: '250px' }}
                    />
                    <p className="text-gray-600 text-lg">
                        No Listings Available
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
                        {paginatedListings.map((listing: any) => {

                            return (
                                <div key={listing._id}
                                    onClick={() => handleCardClick(listing._id)}
                                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col  hover:shadow-xl cursor-pointer">
                                    <img src={listing.imageUrls.length > 0 ? listing.imageUrls[0] : "https://via.placeholder.com/150"} alt={listing.name}
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
                                        <p
                                            className="text-gray-500 mt-2 line-clamp-2"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >{listing.description}</p>
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
                                            {listingData.useRef === userProfile._id && (

                                                <div className="flex gap-4">
                                                    <FaEdit
                                                        onClick={(event: any) => handleEdit(event, listing)}
                                                        className="text-blue-600 cursor-pointer hover:text-blue-700" />
                                                    <FaTrash
                                                        onClick={(event: any) => {
                                                            event.stopPropagation();
                                                            openDeleteModal(listing);
                                                        }}
                                                        className="text-red-600 cursor-pointer hover:text-red-700" />
                                                </div>
                                            )}

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
                            )
                        })}
                    </div>
                </>
            )}

            <div className="mt-8 flex justify-center gap-4">
                <button
                    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {isEditModalOpen && (
                <EditListingModal listing={selectedListing}
                    onClose={handleCloseEditModal}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteListingModal
                    listing={listingToDelete}
                    onClose={handleCloseDeleteModal}
                    onDeleteSuccess={() => handleDelete(listingToDelete._id)}
                />
            )}
        </>
    )
}

export default ShowListing