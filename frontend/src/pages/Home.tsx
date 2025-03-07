import { useEffect, useState } from 'react'
import About from './About'
import PropertyList from '../components/Property/PropertyList';
import Testimonial from './../components/Testimonial/Testimonial';
import { Link, useNavigate } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { IoArrowUpOutline } from "react-icons/io5";
import Images from '../assets/images';


const Home = () => {
    const analytics = getAnalytics();
    logEvent(analytics, 'Home Page Loaded');

    const navigate = useNavigate();

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section className="hero__section pt-[60px] 2xl:h-[800px]">
                <div className="container">
                    <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
                        <div>
                            <div className="lg:w-[570px]">
                                <h1 className="text-[36px] leading-[46px]
                            text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                                    Discover your dream home with us!
                                </h1>
                                <p className="text__para">
                                    Explore our stunning properties, each featuring separate accommodations tailored to your unique needs.
                                </p>
                                <button className="btn" onClick={() => navigate('/services')}>
                                    Explore Our Services
                                </button>
                            </div>

                            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap=5 lg:gap-[30px]'>
                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                        100+
                                    </h2>
                                    <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-5px]"></span>
                                    <p className="text__para">Properties Sold</p>
                                </div>
                                <div>
                                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>200+</h2>
                                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-5px]'></span>
                                    <p className='text__para'>Happy Clients</p>
                                </div>

                                <div>
                                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>95%</h2>
                                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-5px]'></span>
                                    <p className='text__para'>Customer Retention</p>
                                </div>

                            </div>

                        </div>
                        <div className="flex gap-[30px] justify-end">
                            <div>
                                <img className='w-full' src={Images.heroImage} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section style={{ background: "#F5F5F5" }}>
                <div className="container">
                    <div className="lg:w-[600px] mx-auto">
                        <h2 className="heading text-center">
                            Experience peace of mind with our seamless services
                        </h2>
                        <p className="text__para text-center">
                            From selling your current home to securing financing or purchasing a new one, we handle it all with ease and efficiency. Best of all, you'll save both time and money along the way!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={Images.icon09} alt="" />
                            </div>

                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                                    Comfortable
                                </h2>
                                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center">
                                    Enjoy lifestyle amenities designed to provide every homeowners modern comfort, a stone's throw away from schools, churches, and hospitals.
                                </p>
                            </div>
                        </div>
                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={Images.icon02} alt="" />
                            </div>

                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                                    Extra Security
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center'>
                                    You can connect with potential tenants without having to share your phone number. We also require all users to register to validate their legitimacy.
                                </p>
                            </div>
                        </div>

                        <div className='py-[30px] px-5'>
                            <div className="flex items-center justify-center">
                                <img src={Images.icon08} alt="" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Luxury
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center'>
                                    Find out how we provide the highest standard of professional property management to give you all the benefits of property.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]'>
                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={Images.icon05} alt="" />
                            </div>

                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                                    Best price
                                </h2>
                                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center">
                                    Not sure what you should be charging for your property? Let us do the numbers for you—contact us today for a free rental appraisal on your home.
                                </p>
                            </div>
                        </div>
                        <div className='py-[30px] px-5'>
                            <div className="flex items-center justify-center">
                                <img src={Images.icon06} alt="" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Strategic location
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center'>
                                    Located in the city center close to the shopping center. Very good for areas surrounded by international education centers, start-up office centers.
                                </p>

                            </div>
                        </div>

                        <div className='py-[30px] px-5'>
                            <div className="flex items-center justify-center">
                                <img src={Images.icon10} alt="" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Efficient
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center'>
                                    Schedule visits to multiple properties at once in one day without having to call them one by one. Check everything and find the best properties for rent.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About />

            <section>
                <div className="container">
                    <div className="flex items-center justify-between flex-col lg:flex-row">
                        <div className="xl:w-[670px]">
                            <h2 className="heading">
                                A smarter way to find your new home
                            </h2>
                            <ul className="pl-4">
                                <li className="text__para">
                                    Discover your dream living space among 10K+ property listings.
                                </li>
                            </ul>
                            <Link to="/">
                                <button className="btn">
                                    Learn More
                                </button>
                            </Link>
                        </div>

                        <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-[0]">
                            <img src={Images.featureImg} className="w-3/4" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: "#F5F5F5" }}>
                <div className="container">
                    <div className="xl:w-[600px] mx-auto">
                        <h2 className="heading text-center">
                            Best Recomendation
                        </h2>
                        <p className="text__para text-center">
                            Discover our exclusive selection of the finest one-of-a-kind luxury properties architectural masterpieces.
                        </p>
                    </div>
                    <PropertyList />
                </div>
            </section>

            <section style={{ background: '#F5F5F5' }}>
                <div className="container">
                    <div className='xl:w-[600px] mx-auto'>
                        <h2 className='heading text-center'>Recent Properties</h2>
                        <p className='text__para text-center'>
                            Explore a curated collection of exclusive luxury homes, where elegance meets architectural brilliance.
                        </p>
                    </div>
                    <PropertyList />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="xl:w-[470px] mx-auto">
                        <h2 className="heading text-center">
                            People say about us?
                        </h2>
                        <p className="text__para text-center">
                            See what our property managers, landlords, and tenants have to say.
                        </p>
                    </div>
                    <Testimonial />
                </div>
            </section>

            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-primaryColor hover:bg-[#57A287] text-white font-bold py-2 px-2 
                rounded-full  transition-all scrolltop"
                >
                    <IoArrowUpOutline />

                </button>
            )}
        </>
    )
}

export default Home