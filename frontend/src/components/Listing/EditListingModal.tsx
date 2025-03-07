import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getUserProfile } from '../../api/userApi';
import { updateListing } from '../../api/listingApi';
import ReactGA from 'react-ga4';

const EditListingModal = ({ isModalOpen, handleCloseModal, editData, onUpdateSuccess }: any) => {
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
        category: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userProfile, setUserProfile] = useState<any>({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data }: any = await getUserProfile();
                setUserProfile(data);
                setFormData((prevData) => ({
                    ...prevData,
                    userRef: data._id,
                }));
            } catch (err) {
                console.error('Error fetching user profile:', err);
                toast.error('Failed to fetch user profile. Please try again.');
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || '',
                description: editData.description || '',
                bedrooms: editData.bedrooms || '',
                bathrooms: editData.bathrooms || '',
                discountPrice: editData.discountPrice || '',
                regularPrice: editData.regularPrice || '',
                address: editData.address || '',
                offer: editData.offer || false,
                type: editData.type || '',
                parking: editData.parking || false,
                furnished: editData.furnished || false,
                available: editData.available || false,
                area: editData.area || '',
                imageUrl: editData.imageUrls?.[0] || '',
                userRef: editData.userRef || '',
                category: editData.category || '',
            })
        }
    }, [editData]);

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
            action: 'Clicked Edit Listing Save Button',
            label: 'Edit Listing',
        });

        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await updateListing(
                editData._id,
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
                [formData.imageUrl],
                userProfile._id,
                formData.category,
            );
            if (response && response.status === 200) {
                toast.success('Listing updated successfully!');
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
                    userRef: '',
                    category: ''
                });
                onUpdateSuccess();
            } else {
                toast.error('Failed to update listing. Please try again.');
                setError('Failed to update listing.');
            }
        } catch (error) {
            console.error('Error updating listing:', error);
            setError('An error occurred while updating the listing');
        } finally {
            setLoading(false);
        }
    }

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
                theme="light"
            />
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}>
            </div>

            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-h-[90vh]
            overflow-auto p-6 mx-4 sm:mx-6 lg:mx-auto lg:max-w-2xl z-10 custom-scrollbar">
                <button onClick={handleCloseModal} area-label="Close" className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4">
                    Edit Listing
                </h2>
                <form action="">


                    <div className="space-y-4">
                        <div>
                            <div className='mt-3'>
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
                    focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'

                                />
                            </div>

                            {/* Description */}
                            <div className='mt-3'>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    required
                                    rows={3}
                                    onChange={handleChange}
                                    className='mt-1 block w-full px-3 py-2
                    border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className='mt-3'>
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
                    focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                    />
                                </div>

                                <div className='mt-3'>
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
                    focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Discount Price</label>
                                    <input
                                        type="number"
                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Regular Price</label>
                                    <input
                                        type="number"
                                        name="regularPrice"
                                        value={formData.regularPrice}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className='mt-3'>
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
                    focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className='mt-3'>
                                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>

                                    <select name="type" id=""
                                        value={formData.type}
                                        required
                                        onChange={handleChange}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                    >
                                        <option value="" disabled>Select type</option>
                                        <option value="sale">Sale</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>

                                    <select name="category" id=""
                                        value={formData.category}
                                        required
                                        onChange={handleChange}
                                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="land">Land</option>
                                        <option value="industrial">Industrial</option>
                                        <option value="retail">Retail</option>
                                    </select>
                                </div>

                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex items-center mt-3">
                                    <input type="checkbox" name="offer" id=""
                                        checked={formData.offer}
                                        onChange={handleChange}
                                        className='h-4 w-4 text-indigo-600 focus: ring-indigo-500 border-gray-300 rounded'
                                    />
                                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                                        Offer
                                    </label>
                                </div>

                                <div className="flex items-center mt-3">
                                    <input type="checkbox" name="parking" id=""
                                        checked={formData.parking}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                                        Parking
                                    </label>
                                </div>

                                <div className="flex items-center mt-3">
                                    <input type="checkbox" name="furnished" id=""
                                        checked={formData.furnished}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                                        Furnished
                                    </label>
                                </div>

                                <div className="flex items-center mt-3">
                                    <input type="checkbox" name="available" id=""
                                        checked={formData.available}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="" className="ml-2 block text-sm font-medium text-gray-700">
                                        Available
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Area</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className='mt-3'>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-3">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    style={{
                                        width: '250px',
                                    }}
                                    className="custom-button px-4 py-2 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default EditListingModal