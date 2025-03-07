import { useEffect } from 'react'
import ReactGA from 'react-ga4';
import Images from './../assets/images/index';

const About = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/aboutus', title: 'About Us' });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
              <img src={Images.aboutImg} alt="" />
              <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                <img src={Images.aboutCardImg} alt="" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ml-4">
              <h2 className="heading">
                About Us
              </h2>
              <p className="text__para mt-[30px]">
                Welcome to AcquireSpace! We specialize in delivering tailored real estate management solutions designed to meet the distinct needs of property owners and tenants. With years of industry expertise, we’ve earned a reputation as a trusted partner, renowned for our dedication to excellence, transparency, and exceptional client satisfaction.              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Our Mission
              </h2>
              <ul className="pl-4">
                <li className="text__para">
                  At AcquireSpace, our mission is to deliver exceptional property management solutions that enhance the value of your real estate investments while creating a seamless and satisfying experience for tenants. We aim to be the trusted link between property owners and tenants, fostering strong relationships built on trust, respect, and mutual success.                </li>
              </ul>
            </div>
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-[0]">
              <img src={Images.featureImg} className='w-3/4' alt="" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#F5F5F5" }}>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={Images.icon12} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Integrity
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center">
                  We operate with the highest level of integrity, ensuring honesty and transparency in all our dealings. Our clients trust us to manage their valuable assets, and we take this responsibility seriously.
                </p>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={Images.icon13} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Excellence
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center">
                  We are committed to delivering exceptional service in every aspect of property management. From maintenance to financial management, we aim to exceed your expectations.
                </p>
              </div>
            </div>

            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={Images.icon11} alt="" />
              </div>

              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Customer Focus
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 gtext-center'>
                  Our clients are at the heart of everything we do. We tailor our services to meet your specific needs, providing personalized solutions that ensure your satisfaction and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
              <img src={Images.aboutImg} alt="" />
              <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                <img src={Images.aboutCardImg} alt="" />
              </div>
            </div>

            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ml-4'>
              <h2 className='heading'>Our Team</h2>
              <p className="text__para mt-[30px]">
                Our team consists of experienced professionals with expertise spanning real estate, finance, legal, and customer service. Each member brings valuable insights and skills, guaranteeing your property is managed with the highest level of care and professionalism.              </p>

            </div>
          </div>
        </div>
      </section>
     
    </>
  )
}

export default About