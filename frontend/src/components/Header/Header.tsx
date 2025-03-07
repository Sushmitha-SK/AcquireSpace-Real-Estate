import { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import Images from '../../assets/images';

const navLinks = [
    { path: '/', display: 'Home' },
    { path: '/aboutus', display: 'About' },
    { path: '/services', display: 'Services' },
    { path: '/contact', display: 'Contact' },
];

const Header = () => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let lastScrollY = 0;
        let debounceTimer: number | null = null;

        const handleScroll = () => {
            if (headerRef.current) {
                const currentScrollY = window.scrollY;
                if (currentScrollY > 80 && lastScrollY <= 80) {
                    headerRef.current.classList.add('sticky__header');
                } else if (currentScrollY <= 80 && lastScrollY > 80) {
                    headerRef.current.classList.remove('sticky__header');
                }
                lastScrollY = currentScrollY;
            }
        };

        const debounceScroll = () => {
            if (debounceTimer !== null) clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(() => handleScroll(), 10);
        };

        window.addEventListener('scroll', debounceScroll);
        return () => {
            window.removeEventListener('scroll', debounceScroll);
            if (debounceTimer !== null) clearTimeout(debounceTimer);
        };
    }, []);

    const toggleMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.toggle('show__menu');
        }
    };

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl flex flex-wrap font-[Kanit]">
                                <span className="text-primaryColor">Acquire</span>
                                <span className="text-slate-700">Space</span>
                            </h1>
                        </Link>
                    </div>

                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                                                : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                                        }
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden">
                            <Link to="">
                                <figure className="w-[35px] h-[35px] rounder-full">
                                    <img src={Images.userImg} alt="userImg" className="w-full rounded-full cursor-pointer" />
                                </figure>
                            </Link>
                        </div>
                        <Link to="/login">
                            <button className="bg-primaryColor py-2 px-4 sm:px-6 rounded-[50px] text-white font-[600] h-[40px] sm:h-[44px] flex items-center justify-center">
                                Login
                            </button>
                        </Link>
                        <span className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
