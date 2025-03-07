import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className='group-hover:text-white w-5 h-5' />,
    label: "YouTube"
  },
  {
    path: "https://www.github.com/",
    icon: <AiFillGithub className='group-hover:text-white w-5 h-5' />,
    label: "GitHub"
  },
  {
    path: "https://www.instagram.com/",
    icon: <AiOutlineInstagram className='group-hover:text-white w-5 h-5' />,
    label: "Instagram"
  },
  {
    path: "https://www.linkedin.com/",
    icon: <RiLinkedinFill className='group-hover:text-white w-5 h-5' />,
    label: "LinkedIn"
  },
];

const quickLinks = [
  {
    section: "Quick Links",
    links: [
      { path: "/", display: "Home" },
      { path: "/", display: "About Us" },
      { path: "/services", display: "Services" },
    ],
  },
  {
    section: "I want to",
    links: [
      { path: "/", display: "Request an Appointment" },
      { path: "/", display: "Find a Location" },
      { path: "/", display: "Get an Opinion" },
    ],
  },
  {
    section: "Contact",
    links: [
      { path: "/contact", display: "Contact Us" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="w-full md:w-1/3">
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-2 text-white font-[Kanit]">
              <span className="text-primaryColor">Acquire</span>
              <span>Space</span>
            </h1>
            <p className="text-sm mb-4">
              Copyright &copy; {year} Developed by Sushmitha S. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primaryColor hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {quickLinks.map((section, index) => (
            <nav key={index} className="w-full md:w-1/4">
              <h2 className="text-lg font-semibold text-white mb-4">{section.section}</h2>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <Link
                      to={link.path}
                      className="text-sm hover:text-primaryColor transition-colors"
                    >
                      {link.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
