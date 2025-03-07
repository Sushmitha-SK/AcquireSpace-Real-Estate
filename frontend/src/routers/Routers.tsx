import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './../pages/Home';
import Services from './../pages/Services';
import Contact from './../pages/Contact';
import Header from '../components/Header/Header';
import About from '../pages/About';
import Footer from '../components/Footer/Footer';
import Login from '../pages/Login';
import SignUp from './../pages/SignUp';
import ForgotPassword from './../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import TermsAndConditions from '../pages/TermsAndConditions';
import OTPInput from '../pages/OTPInput';
import Dashboard from './../pages/Dashboard';
import Profile from '../pages/Profile';
import Listing from '../pages/Listing';
import ListingDescription from '../pages/ListingDescription';
import Favorites from '../pages/Favorites';

const AppRoutes = () => {
    const location = useLocation();
    const hideHeaderFooter = ['/dashboard', '/listings', '/favorites', '/profile'].includes(location.pathname) || location.pathname.startsWith('/listingdescription/');

    return (
        <>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/otpinput" element={<OTPInput />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/listings' element={<Listing />} />
                <Route path="/listingdescription/:id" element={<ListingDescription />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

const Routers = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default Routers;
