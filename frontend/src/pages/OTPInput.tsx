import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resendOTP, verifyOtp } from '../api/userApi';
import { login } from '../redux/store/slice/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAnalytics, logEvent } from 'firebase/analytics';

const OTPInput: React.FC = () => {
    const email = useSelector((state: any) => state.login.email) || '';
    const password = useSelector((state: any) => state.login.password) || '';

    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [timer, setTimer] = useState<number>(60);
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setResendEnabled(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        if (!resendEnabled) return;
        setOtp(Array(6).fill(''));
        setTimer(60);
        setResendEnabled(false);
        try {
            const resendData = await resendOTP(email);
            if (resendData?.msg) {
                toast.info('A new OTP has been sent to your email.');
            } else {
                toast.error('Failed to resend OTP. Please try again later.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred while resending the OTP.');
        }
    };

    const handleChange = (value: string, index: number) => {
        if (!/\d/.test(value) && value !== '') return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async () => {
        const enteredOtp = otp.join('');
        try {
            const otpData = await verifyOtp(email, password, enteredOtp);
            if (otpData?.token) {
                setAuthToken(otpData.token);
                localStorage.setItem('token', otpData.token);
                dispatch(login({ userId: otpData.userId, token: otpData.token }));
                const analytics = getAnalytics();
                logEvent(analytics, 'login');
                toast.success('Login Successful!');
                navigate('/dashboard');
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 justify-center items-center ">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[40rem]">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Verify OTP</h1>
                <p className="text-gray-600 text-center mb-6">
                    Enter the 6-digit OTP sent to <span className="font-medium text-gray-800">{email}</span>
                </p>
                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="w-80 bg-primaryColor text-white py-3 rounded-lg text-lg font-semibold">
                        Verify OTP
                    </button>
                </div>
                <div className="text-center mt-4 ">
                    <button
                        onClick={handleResend}
                        disabled={!resendEnabled}
                        className={`text-primaryColor font-medium ${resendEnabled ? 'hover:underline' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        Resend OTP
                    </button>
                    {!resendEnabled && (
                        <p className="text-sm text-gray-500 mt-2">Resend available in {timer}s</p>
                    )}
                </div>
            </div>
        </section >
    );
};

export default OTPInput;
