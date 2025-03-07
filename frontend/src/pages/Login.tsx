import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleSignIn from '../components/GoogleSignIn/GoogleSignIn';
import { useDispatch } from 'react-redux';
import { loginCredentials } from '../redux/store/slice/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe');
        if (storedRememberMe === 'true') {
            setEmail(storedEmail || '');
            setPassword(storedPassword || '');
            setRememberMe(true);
        } else {
            setRememberMe(false);
        }
    }, []);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            toast.error('Invalid email format!');
            return;
        }
        try {
            const loginData: any = await loginUser(email, password)
            if (loginData && loginData.data.msg === "An OTP has been sent to your email. Please enter the OTP to complete your sign-in.") {
                toast.success('OTP has been sent to your email. Please check your inbox.');

                if (rememberMe) {
                    let rememberMevalue = rememberMe.toString()
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    localStorage.setItem('rememberMe', rememberMevalue)
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    localStorage.setItem('rememberMe', 'false');
                }
                dispatch(loginCredentials({ email: email, password: password }));
                navigate(`/otpinput`);
            }
            else {
                toast.error('Login failed, Invalid credentials. Please try again.')
            }
        } catch (error) {
            console.log("Login Error", error);
            toast.error('Error, Login failed. Please try again.')
        };
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
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                    Hello <span className="text-primaryColor">Welcome</span> Back!
                </h3>
                <form action="" className="py-4 md:py-0" onSubmit={handleLogin}>
                    <div className="mb-5">
                        <input type="email"
                            placeholder='Enter Your Email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full py-3 border-b border-solid border-[#00066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                        placeholder:text-textColor cursor-pointer'
                            required
                        />
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id=""
                            placeholder='Enter Your Password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full py-3 border-b border-solid border-[#00066ff61]
                        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                        placeholder:text-textColor cursor-pointer'
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <input type="checkbox"
                                name=""
                                id=""
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor="" className="text-headingColor text-[16px] cursor-pointer">
                                Remember Me
                            </label>
                        </div>
                        <Link to="/forgotpassword" className='text-primaryColor font-medium text-[16px]'>
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="mt-7">
                        <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                            Login
                        </button>
                    </div>
                    <GoogleSignIn />
                    <p className="mt-5 text-textColor text-center">
                        Don't have an account?&nbsp;
                        <Link to='/signup' className='text-primaryColor font-medium ml-1'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login