import  { useState, useEffect } from 'react'
import { getAllListingsRecommended } from '../../api/listingApi';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
    const [recommended, setRecommended] = useState([]);
    const getRecommended = async () => {
        try {
            const getRecommendedData = await getAllListingsRecommended();
            if (getRecommendedData) {
                setRecommended(getRecommendedData?.data);
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        getRecommended();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {recommended.map((item: any, index: any) =>
                <PropertyCard key={item.id} property={item} />
            )}

        </div>
    )
}

export default PropertyList