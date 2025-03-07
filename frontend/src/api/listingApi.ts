import axios from 'axios'
import api from './endPoint';

export async function getAllListings() {
    const url = `${api.baseApi}api/listings?limit=1000`
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("Error", error)
    }
}

//search listings
export async function searchListing(query: any) {
    const url = `${api.baseApi}api/listings`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            params: query
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("Error", error)
    }
}

//Get Recently added listing
export async function getRecentListing() {
    const url = `${api.baseApi}api/listings/recent-by-user`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

// Get Listing By ID

export async function getListingByID(id: any) {
    const url = `${api.baseApi}api/listings/${id}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error);
    }
}


//Delete listing

export async function deleteListingByID(id: any) {
    const url = `${api.baseApi}api/listings/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("error", error);
    }
}

export async function createlisting(name: string,
    description: string,
    bedrooms: string,
    bathrooms: string,
    discountPrice: string,
    regularPrice: string,
    address: string,
    offer: any,
    type: string,
    parking: any,
    furnished: any,
    available: any,
    area: string,
    imageUrl: string,
    category: string,
    userID: string) {

    const url = `${api.baseApi}api/listings`;
    try {
        const response = await axios.post(url, {
            "name": name,
            "description": description,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "discountPrice": discountPrice,
            "regularPrice": regularPrice,
            "address": address,
            "offer": offer,
            "type": type,
            "parking": parking,
            "category": category,
            "furnished": furnished,
            "available": available,
            "area": area,
            "imageUrls": imageUrl,
            "userRef": userID
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });

        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error)
    }
}

//Update Listing

export async function updateListing(
    listingId: string,
    name: string,
    description: string,
    bedrooms: string,
    bathrooms: string,
    discountPrice: string,
    regularPrice: string,
    address: string,
    offer: boolean,
    type: string,
    parking: boolean,
    furnished: boolean,
    available: boolean,
    area: string,
    imageUrl: string[],
    userID: string,
    category: string,
) {

    const url = `${api.baseApi}api/listings/${listingId}`;
    try {
        const response = await axios.put(url, {
            "name": name,
            "description": description,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "discountPrice": discountPrice,
            "regularPrice": regularPrice,
            "address": address,
            "offer": offer,
            "type": type,
            "parking": parking,
            "furnished": furnished,
            "available": available,
            "area": area,
            "imageUrls": imageUrl,
            "category": category,
            "userRef": userID
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error)
    }

}

//Get all listing public recommended
export async function getAllListingsRecommended() {
    const url = `${api.baseApi}api/listings/public/recommended`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

//Get all favorite Listings
export async function getAllFavorites() {
    const url = `${api.baseApi}api/user/favorites`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

//Add to Favorites
export async function addToFavorites(id: any) {
    const url = `${api.baseApi}api/user/favorites/${id}`;
    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error);
    }

}

//Remove from favorites

export async function removeFromFavorites(id: any) {
    const url = `${api.baseApi}api/user/favorites/${id}`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error)
    }
}


//Get getCategoryStats 
export async function getCategoryStats() {
    const url = `${api.baseApi}api/listings/stats/category`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

//Get Listing Growth Stats
export async function getListingGrowthStats() {
    const url = `${api.baseApi}api/listings/stats/listings-growth`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}


//Get listings count by type
export async function getListingStatsByType() {
    const url = `${api.baseApi}api/listings/stats/type`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
    }
}