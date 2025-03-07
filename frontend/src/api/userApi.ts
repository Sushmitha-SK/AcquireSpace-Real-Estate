import axios from 'axios'
import api from './endPoint';

export async function loginUser(email: string, password: string) {
    const url = `${api.baseApi}api/auth/signin`;
    try {
        const response = await axios.post(url, JSON.stringify({
            "email": email,
            "password": password
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error)
    }
}

export async function verifyOtp(email: string, password: string, otp: string) {
    const url = `${api.baseApi}api/auth/signin`;
    try {
        const response = await axios.post(url,
            JSON.stringify({
                email, password, otp
            }), {
            headers: {
                'Content-Type': 'application/json',
            },
        },
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
}

export async function resendOTP(email: string) {
    const url = `${api.baseApi}api/auth/resendOTP`;
    try {
        const response = await axios.post(url,
            JSON.stringify({
                email
            }), {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export async function signUpuser(username: string, email: string, password: string, name: string, contactNo: string, usertype: string) {
    const url = `${api.baseApi}api/auth/signup`;
    try {
        const response = await axios.post(url, JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "name": name,
            "contactno": contactNo,
            "usertype": usertype
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("Error", error)
    }
}

export async function forgotPassword(email: string) {
    const url = `${api.baseApi}api/auth/forgot-password`;
    try {
        const response = await axios.post(url, JSON.stringify({
            "email": email,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("Error", error)
    }
}

export async function resetPassword(resetToken: any, newPassword: string) {
    const url = `${api.baseApi}api/auth/reset-password/${resetToken}`;

    try {
        const response = await axios.post(url, JSON.stringify({
            "password": newPassword,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error)
    }
}

export async function googleSignIn(name: any, email: any, photo: any) {
    const url = `${api.baseApi}api/auth/google`;

    try {
        const response = await axios.post(url, JSON.stringify({
            "name": name,
            "email": email,
            "photo": photo
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log('Error', error);
    }
}

export async function getUserProfile() {
    const url = `${api.baseApi}api/user/profile`;
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
        console.log('Error', error)
    }
}


export async function getUserProfileById(userId: any) {
    const url = `${api.baseApi}api/user/profile/${userId}`;

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
        console.log('Error', error)
    }
}

export async function updateUserProfile(editProfile: any) {
    const url = `${api.baseApi}api/user/update`;
    try {
        const response = await axios.put(
            url,
            editProfile,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || '',
                },
            }
        );

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error: any) {
        console.error('Error updating profile:', error?.response?.data || error.message);
        throw new Error(
            error?.response?.data?.message || 'Failed to update profile.'
        );
    }
}