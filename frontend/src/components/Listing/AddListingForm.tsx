import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi';
import { createlisting } from '../../api/listingApi';
import ReactGA from 'react-ga4';

const AddListingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        discountPrice: '',
        regularPrice: '',
        address: '',
        offer: false,
        type: '',
        parking: false,
        furnished: false,
        available: false,
        area: '',
        imageUrl: '',
        userRef: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState<any>({});

    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data }: any = await getUserProfile();
                setUserProfile(data);
                setFormData((prevData) => ({
                    ...prevData,
                    userRef: data._id
                }));
            } catch (error) {
                console.log('Error fetching user profile', error);
                toast.error('failed to fetch user profile. Please try again.')
            }
        };

        fetchUserProfile();
    }, []);



    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: any) => {
        ReactGA.event({
            category: 'Button',
            action: 'Clicked Add Listing Save Button',
            label: 'Add Listing',
        });

        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await createlisting(
                formData.name,
                formData.description,
                formData.bedrooms,
                formData.bathrooms,
                formData.discountPrice,
                formData.regularPrice,
                formData.address,
                formData.offer,
                formData.type,
                formData.parking,
                formData.furnished,
                formData.available,
                formData.area,
                formData.imageUrl,
                formData.category,
                userProfile._id,
            );
            if (response) {
                setFormData({
                    name: '',
                    description: '',
                    bedrooms: '',
                    bathrooms: '',
                    discountPrice: '',
                    regularPrice: '',
                    address: '',
                    offer: false,
                    type: '',
                    parking: false,
                    furnished: false,
                    available: false,
                    area: '',
                    imageUrl: '',
                    userRef: userProfile._id,
                    category: '',
                });

                toast.success('Listing added successfully!');

                setTimeout(() => navigate('/listings'), 2000);
            }
        } catch (error) {
            toast.error('Failed to add listing. Please try again.');
            console.error('Error creating listing:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <form action="" className="space-y-4">
                <div className='mt-4'>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input type="text"
                        name="name"
                        value={formData.name}
                        required
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2
                    border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                    />
                </div>

                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        required
                        rows={3}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2
               border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Bedrooms
                        </label>
                        <input type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            required
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2
                    border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Bathrooms
                        </label>
                        <input type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            required
                            onChange={handleChange}
                            className='mt-1 block w-full px-3 py-2
                    border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount Price</label>
                        <input
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Regular Price</label>
                        <input
                            type="number"
                            name="regularPrice"
                            value={formData.regularPrice}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <input type="text"
                        name="address"
                        value={formData.address}
                        required
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2
                    border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                    />
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="offer" id=""
                        checked={formData.offer}
                        onChange={handleChange}
                        className='h-4 w-4 text-primaryColor focus: ring-primaryColor border-gray-300 rounded'
                    />
                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                        Offer
                    </label>
                </div>

                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>

                    <select name="type" id=""
                        value={formData.type}
                        required
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                    >
                        <option value="" disabled>Select type</option>
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <select name="category" id=""
                        value={formData.category}
                        required
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm'
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="land">Land</option>
                        <option value="industrial">Industrial</option>
                        <option value="retail">Retail</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="parking" id=""
                        checked={formData.parking}
                        onChange={handleChange}
                        className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
                    />
                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                        Parking
                    </label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="furnished" id=""
                        checked={formData.furnished}
                        onChange={handleChange}
                        className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
                    />
                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                        Furnished
                    </label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="available" id=""
                        checked={formData.available}
                        onChange={handleChange}
                        className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
                    />
                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                        Available
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Area</label>
                    <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primaryColor sm:text-sm"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: '250px',
                        }}
                        className="custom-button px-4 py-2 text-white rounded-md shadow-sm hover:bg-primaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    >
                        {loading ? 'Adding Listing...' : 'Add Listing'}
                    </button>
                </div>

            </form>
        </>
    )
}

export default AddListingForm