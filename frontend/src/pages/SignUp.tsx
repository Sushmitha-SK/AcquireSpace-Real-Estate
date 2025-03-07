import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleSignIn from '../components/GoogleSignIn/GoogleSignIn';
import { signUpuser } from '../api/userApi';
import Images from '../assets/images';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [usertype, setUserType] = useState('user');
    const [contactno, setContactNo] = useState('');
    const [terms, setTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password: any) => {
        const passwordRegex = /^.{6,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newErrors: any = {};

        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!validateEmail(email)) newErrors.email = 'Email is invalid';

        if (!contactno) newErrors.contactno = 'Contact number is required';

        if (!password) newErrors.password = 'Password is required';
        else if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';

        if (!confirmpassword) newErrors.confirmpassword = 'Confirm Password is required';
        else if (password !== confirmpassword) newErrors.confirmpassword = 'Passwords do not match';

        if (!terms) newErrors.terms = 'You must agree to the terms and conditions';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await signUpuser(name, email, password, name, contactno, usertype);
                if (response && response.status === 200) {
                    navigate('/login');
                }

            } catch (error) {
                setApiError('Signup faile. Please try again.');
            }
        }
    }

    return (
        <section className="px-65 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={Images.signupImg} alt="" className='w-full rounded-l-lg' />
                        </figure>
                    </div>
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an <span className="text-primaryColor">Account</span>
                        </h3>
                        <form action="">
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#00066ff61]
        focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
        placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                {errors.name && <p className='text-red-500 text-sm'>
                                    {errors.name}
                                </p>}
                            </div>

                            <div className="mb-5">
                                <input type="email" placeholder='Enter Your Email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='w-full pr-4 py-3 border-b border-solid border-[#00066ff61]
                                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                                    placeholder:text-textColor cursor-pointer'
                                />
                                {errors.email && <p className="text-red-500 text-sm">
                                    {errors.email}</p>}
                            </div>

                            <div className="mb-5">
                                <input type="text" placeholder='Enter Your Contact No'
                                    name='contactno'
                                    value={contactno}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    required
                                    className='w-full pr-4 py-3 border-b border-solid border-[#00066ff61]
                                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                                    placeholder:text-textColor cursor-pointer'
                                />
                                {errors.contactno && <p className="text-red-500 text-sm">
                                    {errors.contactno}</p>}
                            </div>

                            <div className="mb-5 relative">
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='Enter Your Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#00066ff61]
                                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                                    placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">
                                    {errors.password}</p>}
                            </div>

                            <div className="mb-5 relative">
                                <input type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter Your Confirm Password'
                                    name='confirmpassword'
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#00066ff61]
                                    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
                                    placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                <div onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                                {errors.confirmpassword && <p className="text-red-500 text-sm">
                                    {errors.confirmpassword}</p>}
                            </div>

                            <div className="mb-5 flex items-center justify-between">
                                <label htmlFor="" className="text-headingColor font-bold text-[16px] leading-7">
                                    Are you a:
                                    <select name="usertype" id="" className="text text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                        value={usertype}
                                        onChange={(e) => setUserType(e.target.value)}
                                    >
                                        <option value='user'>User</option>
                                        <option value="guest">Guest</option>
                                    </select>
                                </label>
                            </div>

                            <div className="mb-5 flex items-center">
                                <input type="checkbox" name='agreeToTerms'
                                    checked={terms}
                                    onChange={(e) => setTerms(!terms)}
                                    className='mr-2'
                                />
                                <label htmlFor="" className='text-headingColor text-[16px] leading-7'>
                                    I agree to the <Link to="/terms" className="text-primaryColor">
                                        Terms and Conditions
                                    </Link>
                                </label>
                                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}
                                </p>}
                            </div>

                            <div className="mt-7">
                                <button type='submit' onClick={handleSubmit}
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                                    Signup
                                </button>
                                {apiError && <p className='text-red-500 text-sm mt-2'>{apiError}
                                </p>}
                            </div>
                            <GoogleSignIn />
                            <p className="mt-5 text-textColor text-center">
                                Already have an account?&nbsp;
                                <Link to="/login" className='text-primaryColor font-medium ml-1'>
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp