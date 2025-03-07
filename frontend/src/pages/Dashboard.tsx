import { useState, useEffect } from 'react'
import DashboardSideBar from '../components/Dashboard/DashboardSideBar'
import DashboardHeader from './../components/Dashboard/DashboardHeader';
import { Line, Bar } from 'react-chartjs-2';
import { FaBuilding } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../api/userApi'
import { userProfile } from '../redux/store/slice/userProfileSlice';
import { getAllListings, getCategoryStats, getListingGrowthStats, getListingStatsByType, getRecentListing } from '../api/listingApi';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [listingData, setListingData] = useState([]);
    const [saleListing, setSaleListing] = useState([]);
    const [rentListing, setRentListing] = useState([]);
    const [recentListing, setRecentListing] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [listingGrowthData, setListingGrowthData] = useState([]);
    const [listingTypeCount, setListingTypeCount] = useState<any>([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserDetails = async () => {
        try {
            const { data }: any = await getUserProfile();
            if (data) {
                dispatch(userProfile(data));
            }
        } catch (error) {
            console.error('Error fetchig user profile:', error);
        }
    }

    useEffect(() => {
        getUserDetails();
        getListing();
        getRecenlyAddedListing();
        getStatsByCategory();
        getStatsByListingGrowth();
        getStatsByListingType();
    }, []);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/dashboard", title: "Dashboard" });
    }, []);

    const getListing = async () => {
        try {
            const response = await getAllListings();
            if (response && response.data) {
                setListingData(response.data);
                let filterSale = response.data.filter((item: any) => item.type === 'sale' || []);
                let filterRent = response.data.filter((item: any) => item.type === 'rent' || []);
                setSaleListing(filterSale);
                setRentListing(filterRent);
            }
        } catch (error) {
            console.log('Error fetching listings:', error);
        }
    }

    const getRecenlyAddedListing = async () => {
        try {
            const response = await getRecentListing();
            if (response && response.data) {
                setRecentListing(response.data);

            }
        } catch (error) {
            console.log('Error fetching listings:', error);
        }
    }

    const handleView = (listingID: any) => {
        navigate(`/listingdescription/${listingID}`)
    }


    const getStatsByCategory = async () => {
        try {
            const response = await getCategoryStats();
            if (response) {
                setCategoryStats(response)
            }
        } catch (error) {

        }
    }

    const formattedCategoryData = {
        labels: categoryStats.map((item: any) => {
            const label = item._id || 'Unknown';
            return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
        }),
        datasets: [
            {
                label: 'Category Counts',
                data: categoryStats.map((item: any) => item.count || 0),
                backgroundColor: ['#3D52A0', '#ADBBDA', '#FFC107', '#28A745', '#DC3545', '#6C757D'],
            },
        ],
    };


    const getStatsByListingGrowth = async () => {
        try {
            const response: any = await getListingGrowthStats();
            if (response) {
                setListingGrowthData(response)
            }
        } catch (error) {
            console.log('Error', error)
        }
    }


    const listingGrowthChartData = {
        labels: listingGrowthData.map((item: any) => item._id),
        datasets: [
            {
                label: 'Listings Growth',
                data: listingGrowthData.map((item: any) => item.count),
                borderColor: '#3D52A0',
                backgroundColor: '#ADBBDA',
                fill: true,
            },
        ],
    };


    const getStatsByListingType = async () => {
        try {
            const response: any = await getListingStatsByType();
            if (response && response) {
                const counts = response.reduce((acc:any, item:any) => {
                    if (item._id === 'sale') acc.sale = item.count || 0;
                    if (item._id === 'rent') acc.rent = item.count || 0;
                    return acc;
                }, { sale: 0, rent: 0 });

                setListingTypeCount(counts);
            }
        } catch (error) {
            console.log('Error', error)
        }
    }


    return (
        <div className="flex h-screen bg-gray-100">
            <DashboardSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-col flex-1 w-full">
                <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-700">Properties by Category</h2>
                            <Bar
                                data={formattedCategoryData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top',
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                            <h2 className="text-lg font-semibold text-gray-700">Listing Growth</h2>
                            <Line data={listingGrowthChartData} options={{ responsive: true }} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                            <div className="text-sm font-semibold text-gray-400">
                                Total Properties
                            </div>
                            <div className="text-2xl font-bold text-gray-700">
                                {listingData.length}
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                            <div className="text-sm font-semibold text-gray-400">
                                Total Properties for Sale
                            </div>
                            <div className="text-2xl font-bold text-gray-700">
                                {listingTypeCount?.sale}
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                            <div className="text-sm font-semibold text-gray-400">
                                Total Properties for Rent
                            </div>
                            <div className="text-2xl font-bold text-gray-700">
                                {listingTypeCount?.rent}
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Recently Added
                        </h2>
                        <div className="space-y-3">
                            {recentListing.length > 0 ? (
                                recentListing.map((listing: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full flex-shrink-0">
                                            <FaBuilding className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <h3 className="text-gray-800 text-sm font-medium truncate">
                                                {listing.name || 'No Title'}
                                            </h3>
                                            <p className="text-xs text-gray-700 truncate">
                                                {listing.address || 'No Address Provided'}
                                            </p>
                                            <p className="text-xs text-gray-600 capitalize">
                                                {listing.type ? `Type: ${listing.type}` : ''}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Created On {new Date(listing.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleView(listing._id)}
                                                className="text-indigo-600 text-sm font-semibold hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No recent listings available.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard