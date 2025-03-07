import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyCard = ({ property }: any) => {
    const { _id, name, description, imageUrls, regularPrice, discountPrice, address, bathrooms, bedrooms, furnished, parking, type, offer } = property

    const isLoggedIn = !localStorage.getItem('token');
    const navigate = useNavigate();

    const handleArrowClick = () => {
        if (isLoggedIn) {
            navigate(`listingdescription/${property._id}`);
        } else {
            toast.info('Login or register to view more details.');
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-md  p-4 flex flex-col cursor-pointer">
            <ToastContainer
                position="bottom-center"
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
            <img src={imageUrls.length > 0 ? imageUrls[0] : 'https://via.placeholder.com/150'}
                alt={name}
                className='w-full h-52 object-cover rounded-t-lg' />
            <div className="mt-4">
                <h3 className="text-lg font-bold">
                    {name}
                </h3>
                <p className="text-gray-500 flex items-center gap-1 mt-2">
                    <FaMapMarkerAlt />
                    {address}
                </p>
                <p className="text-gray-500 mt-2">
                    {offer ? (
                        <>
                            <span className="line-through text-red-500 mr-2">₹ {regularPrice}</span>
                            <span className="font-semibold text-green-600">₹ {discountPrice}</span>
                        </>
                    ) : (
                        <span className="font-semibold text-green-600">₹ {regularPrice}</span>
                    )}
                </p>
                <div className="flex justify-between text-gray-600 mt-2">
                    <div className="flex items-center mr-4">
                        <FaBed className='mr-2' />
                        {bedrooms} Beds
                    </div>
                    <div className="flex items-center">
                        <FaBath className="mr-2" />
                        {bathrooms} Baths
                    </div>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-end">
                <button
                    onClick={handleArrowClick}
                    className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none mt-4'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </button>
            </div>
        </div>
    )
}

export default PropertyCard