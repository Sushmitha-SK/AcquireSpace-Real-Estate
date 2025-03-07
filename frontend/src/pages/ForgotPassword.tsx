import { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from '../api/userApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e:any) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address!');
            return;
        }
        setLoading(true);

        try {
            const forgotPasswordData = await forgotPassword(email);
            if (forgotPasswordData?.data) {
                toast.success('Password reset email sent! Check your inbox.');
                setEmail('');
            }
        } catch (error) {
            toast.error('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8">
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
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Forgot <span className="text-primaryColor">Password</span>
                </h3>

                <form action="" className="py-4 md:py-0" onSubmit={handleForgotPassword}>
                    {/* Email */}
                    <div className="mb-5">
                        <input type='email'
                            placeholder='Enter Your Email'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='w-full py-3 border-b border-solid border-[#00066ff61]
                            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                            placeholder:text-textColor cursor-pointer'
                            required
                        />
                    </div>
                    <div className="mt-7">
                        <button type='submit'
                            disabled={loading}
                            className='w-full bg-primaryColor text-white text-[18px]
                            leading-[30px] rounded-lg px-4 py-3'
                        >
                            {loading ? 'Sending...' : 'Send Reset Email'}
                        </button>
                    </div>
                    <div className="mt-5 text-textColor text-center">
                        Remembered your password?&nbsp;
                        <Link to="/login" className='text-primaryColor font-medium ml-1'>Login</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword