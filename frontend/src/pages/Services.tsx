import { useEffect } from 'react'
import ServiceCard from '../components/Services/ServiceCard'
import ReactGA from 'react-ga4';

const services = [
  {
    name: "Property Management",
    desc: "Comprehensive property management services for residential, commercial, and industrial properties. Our team handles everything from tenant acquisition and screening to rent collection, maintenance, and compliance with local regulations.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
  },
  {
    name: "Tenant Services",
    desc: "Providing exceptional tenant support, including 24/7 maintenance request handling, tenant onboarding and orientation, lease renewal processing, and conflict resolution to ensure a comfortable living or working environment.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
  },
  {
    name: "Financial Management",
    desc: "Expert financial management services, including budgeting, financial reporting, rent collection, and disbursement, ensuring transparency and efficiency in all financial transactions related to your property.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
  },
  {
    name: "Maintenance and Repairs",
    desc: "Proactive and responsive maintenance and repair services, utilizing a network of trusted contractors to ensure that your property remains in top condition and any issues are addressed promptly.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
  },
  {
    name: "Legal and Compliance",
    desc: "Ensuring that your property complies with all local, state, and federal regulations. Our legal team handles lease agreements, eviction proceedings, and other legal matters to protect your investment.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
  },
  {
    name: "Marketing and Leasing",
    desc: "Effective marketing and leasing strategies to minimize vacancies and maximize rental income. Our services include professional photography, online listings, property showings, and lease negotiations to attract and retain high-quality tenants.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
  },
];


const Services = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/services', title: 'Services' });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <h2 className='heading text-center mb-4'>Services</h2>
      <div className="container">

        <div className='grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 gsp-5 lg:gap-[30px]'>
          {services.map((item, index) => <ServiceCard item={item} index={index} key={index} />)}
        </div>
      </div>
    </section>

  )
}

export default Services