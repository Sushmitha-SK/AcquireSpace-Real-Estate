import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfileById } from '../../api/userApi';
import { AiOutlineClose, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { FaRegAddressBook, FaUser } from 'react-icons/fa';

const ViewContactDetailsModal = ({ isModalOpen, handleCloseModal, userId }: any) => {
    const [userProfile, setUserProfile] = useState<any>({});

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            const response = await getUserProfileById(userId);
            setUserProfile(response?.data || {});
        } catch (error) {
            console.log('Error fetching user profile', error)
        }
    }

    if (!isModalOpen) return null;

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                <div
                    className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-h-[90vh]
            overflow-auto p-6 mx-4 sm:mx-6 lg:mx-auto lg:max-w-2xl z-10 custom-scrollbar"
                >
                    <button
                        onClick={handleCloseModal}
                        aria-label="Close"
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full p-2 transition-all duration-300 hover:scale-105"
                    >
                        <AiOutlineClose className="h-5 w-5" />
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Contact Details
                    </h2>
                    <hr className="border-gray-300 mb-6" />
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <FaUser className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Name</h3>
                                <p className="text-md text-gray-600">{userProfile.name || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                                <AiOutlineMail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                                <p className="text-md text-gray-600">{userProfile.email || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <AiOutlinePhone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Contact Number</h3>
                                <p className="text-md text-gray-600">{userProfile.contactNo || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                                <FaRegAddressBook className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                                <p className="text-md text-gray-600">
                                    {userProfile?.address?.street || 'N/A'},&nbsp;
                                    {userProfile?.address?.apartmentSuiteNumber || ''},&nbsp;
                                    {userProfile?.address?.city || ''},&nbsp;
                                    {userProfile?.address?.state || ''},&nbsp;
                                    {userProfile?.address?.country || ''}&nbsp;
                                    {userProfile?.address?.postalCode || ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewContactDetailsModal