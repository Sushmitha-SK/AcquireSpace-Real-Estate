import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../api/userApi';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        if (!password) {
            toast.error('Please enter a new password!');
            return;
        }
        setLoading(true);

        try {
            const resetPasswordData = await resetPassword(resetToken, password);
            if (resetPasswordData?.data) {
                toast.success('Password reset successful! You can now log in.');
                setPassword('');
            }
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword)
    }

    return (
        <section className='px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8'>
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
            <div className="w-full max-w-[570px] mx-auto rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 ">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Reset <span className="text-primaryColor">Password</span>
                </h3>
                <form action="" className="py-4 md:py-0" onSubmit={handleResetPassword}>
                    <div className="mb-5 relative">
                        <input type={showPassword ? 'text' : 'password'}
                            name="password" id=""
                            placeholder='Enter Your New Password'
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            required
                            className='w-full py-3 border-b border-solid border-[#00066ff61]
                     focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                     placeholder:text-textColor cursor-pointer pr-10'
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {showPassword ? (
                                <FaEyeSlash onClick={toggleShowPassword} className='cursor-pointer text-textColor' />
                            ) : (
                                <FaEye onClick={toggleShowPassword} className='cursor-pointer text-textColor' />
                            )}
                        </div>
                    </div>
                    <div className="mt-7">
                        <button type="submit"
                            disabled={loading}
                            className='w-full bg-primaryColor text-white text-[18px]
                            leading-[30px] rounded-lg px-4 py-3'>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default ResetPassword