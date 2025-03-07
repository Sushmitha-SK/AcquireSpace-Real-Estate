import { useState, useEffect } from 'react';
import DashboardSideBar from './../components/Dashboard/DashboardSideBar';
import DashboardHeader from './../components/Dashboard/DashboardHeader';
import { Link } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { RotatingSquare } from 'react-loader-spinner';
import { getUserProfile, updateUserProfile } from '../api/userApi';
import { useDispatch } from 'react-redux';
import { userProfile } from '../redux/store/slice/userProfileSlice';
import { Country, State } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga4';

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState({
        username: '',
        name: '',
        email: '',
        contactNo: '',
        avatar: '',
        address: {
            street: '',
            apartmentSuiteNumber: '',
            city: '',
            state: '',
            stateCode: '',
            postalCode: '',
            country: '',
            countryCode: ''
        }
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchProfileDetails();
        loadCountries();
    }, []);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: '/profile', title: "Profile" });
    }, []);

    const fetchProfileDetails = async () => {
        try {
            const { data }: any = await getUserProfile();
            setProfile(data);
            dispatch(userProfile(data));
            const countryCode = data.address?.countryCode || 'IN';
            const stateCode = data.address?.stateCode || 'KA';
            let countryName = '';
            let stateName = '';
            if (countryCode) {
                const country = Country.getCountryByCode(countryCode);
                countryName = country?.name || '';
                loadStates(countryCode);
            }

            if (stateCode && countryCode) {
                const state = State.getStateByCodeAndCountry(stateCode, countryCode);
                stateName = state?.name || '';
            }

            setEditProfile({
                username: data.username,
                name: data.name,
                email: data.email,
                contactNo: data.contactNo,
                avatar: data.avatar,
                address: {
                    street: data.address?.street || '',
                    apartmentSuiteNumber: data.address?.apartmentSuiteNumber || '',
                    city: data.address?.city || '',
                    state: stateName,
                    stateCode: stateCode,
                    postalCode: data.address?.postalCode || '',
                    country: countryName,
                    countryCode: countryCode,
                },
            });
        } catch (error) {
            setError('Failed to load profile.');
        } finally {
            setLoading(false);
        }
    };

    const loadCountries = () => {
        const countryList: any = Country.getAllCountries();
        setCountries(countryList);
    };

    const loadStates = (countryCode: string) => {
        const stateList: any = State.getStatesOfCountry(countryCode);
        setStates(stateList);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setEditProfile((prevProfile) => ({
                ...prevProfile,
                address: {
                    ...prevProfile.address,
                    [addressField]: value,
                },
            }));

            if (addressField === 'country') {
                const selectedCountry: any = countries.find((country: any) => country.name === value);
                if (selectedCountry) {
                    setEditProfile((prevProfile) => ({
                        ...prevProfile,
                        address: {
                            ...prevProfile.address,
                            countryCode: selectedCountry.isoCode,
                            state: '',
                            stateCode: '',
                        },
                    }));
                    loadStates(selectedCountry.isoCode);
                }
            }

            if (addressField === 'state') {
                const selectedState: any = states.find((state: any) => state.name === value);
                if (selectedState) {
                    setEditProfile((prevProfile) => ({
                        ...prevProfile,
                        address: {
                            ...prevProfile.address,
                            stateCode: selectedState.isoCode,
                        },
                    }));
                }
            }
        } else {
            setEditProfile((prevProfile) => ({
                ...prevProfile,
                [name]: value,
            }));
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        ReactGA.event({
            category: 'Button',
            action: 'Clicked Edit Profile',
            label: 'Edit Profile',
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        ReactGA.event({
            category: 'Button',
            action: 'Clicked Cancel Edit Profile Button',
            label: 'Cancel Edit',
        });
        setEditProfile(profile);
    };

    const handleSaveClick = async () => {
        try {
            ReactGA.event({
                category: 'Button',
                action: 'Clicked Save Edit Profile Button',
                label: 'Save Edit Profile',
            });
            setLoading(true);
            const response = await updateUserProfile(editProfile);
            setProfile(response.user);
            setIsEditing(false);
            toast.success("Profile updated successfully!")
        } catch (error) {
            console.error('API error:', error);
            setError('Failed to update profile.');
            toast.error("Failed to update profile!")
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <RotatingSquare
                    visible={true}
                    height="100"
                    width="100"
                    color="#3D52A0"
                    ariaLabel="rotating-square-loading"
                />
            </div>
        );
    }

    if (!profile) {
        return <div>Failed to load profile.</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
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
                                    <Link to='/dashboard' className='flex items-center text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out'>
                                        <FaUser className='mr-1 text-gray-500' />
                                        <span>Profile</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="flex items-center mt-8">
                        <div className="flex-shrink-0 mr-8">
                            <img src={profile.avatar || "https://via.placeholder.com/150"}
                                alt="Profile Avatar"
                                className="w-40 h-40 object-cover rounded-full border-4 border-gray-300" />
                        </div>


                        <div className="flex-grow">
                            {isEditing ? (
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                            <input type="text" name="username" id="username"
                                                value={editProfile.username}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" name="name" id="name"
                                                value={editProfile.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" name="email" id="email"
                                                value={editProfile.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact Number</label>

                                            <PhoneInput
                                                country={'us'}
                                                value={editProfile.contactNo}
                                                onChange={(value) => setEditProfile((prevProfile) => ({
                                                    ...prevProfile,
                                                    contactNo: value,
                                                }))}
                                                inputClass="w-full p-3 border border-gray-300 rounded-md"
                                                containerClass="mt-1"
                                                enableSearch={true}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">Street</label>
                                            <input type="text" name="address.street" value={editProfile.address.street}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="block text-gray-700">Apartment/Suite Number: </label>
                                            <input type="text" name="address.apartmentSuiteNumber" value={editProfile.address.apartmentSuiteNumber} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="block text-gray-700">City: </label>
                                            <input type="text" name="address.city" value={editProfile.address.city} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
                                        </div>

                                        <div>
                                            <label htmlFor="" className="block text-gray-700">Country: </label>
                                            <select
                                                name="address.country"
                                                value={editProfile.address.country}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((country: any) => (
                                                    <option key={country.isoCode} value={country.name}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="" className="block text-gray-700">State: </label>
                                            <select
                                                name="address.state"
                                                value={editProfile.address.state}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                disabled={!editProfile.address.country}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state: any) => (
                                                    <option key={state.isoCode} value={state.name}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="" className="block text-gray-700">Postal Code: </label>
                                            <input type="text" name="address.postalCode" value={editProfile.address.postalCode} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
                                        </div>

                                        <div className='col-span-2'>
                                            <label htmlFor="" className="block text-gray-700">Avatar URL: </label>
                                            <input type="text" name="avatar" id=""
                                                value={editProfile.avatar}
                                                onChange={handleInputChange}
                                                className='w-full p-2 border border-gray-300 rounded'
                                            />
                                            {editProfile.avatar && (
                                                <img src={editProfile.avatar} alt="Avatar Preview"
                                                    className="mt-4 w-24 h-24 object-cover rounded-full"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex space-x-4">
                                        <button onClick={handleSaveClick}
                                            className="mr-4 custom-button text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                        >
                                            Save Changes
                                        </button>
                                        <button onClick={handleCancelClick}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300" >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div><strong>Username: </strong>{profile.username}</div>
                                    <div><strong>Name: </strong>{profile.name}</div>
                                    <div>
                                        <strong>Email: </strong>
                                        {profile.email}
                                    </div>
                                    <div>
                                        <div><strong>Address: </strong>{profile.address.street},&nbsp;
                                            {profile.address.apartmentSuiteNumber},&nbsp;
                                            {profile.address.city},&nbsp;
                                            {profile.address.state},&nbsp;
                                            {profile.address.country}&nbsp;
                                            {profile.address.postalCode}</div>
                                    </div>


                                    <div>
                                        <strong>Contact Number: </strong>
                                        <span className="text-gray-900">+{profile.contactNo}</span>

                                    </div>
                                    <div>
                                        <strong>User Type: </strong>
                                        {profile.usertype
                                            ? profile.usertype.charAt(0).toUpperCase() + profile.usertype.slice(1).toLowerCase()
                                            : "Unknown"}
                                    </div>
                                    <div>
                                        <strong>Account Created On: </strong>
                                        {new Date(profile.createdAt).toLocaleString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated At: </strong>
                                        {new Date(profile.updatedAt).toLocaleString()}
                                    </div>
                                    <button onClick={handleEditClick}
                                        className="custom-button text-white px-4 py-2 rounded-md transition duration-300">
                                        Edit Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;


