import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Testimonial = () => {
    const testimonials = [
        {
            text: "AcquireSpace helped me find my dream home within weeks! The platform is intuitive and the options are fantastic.",
            name: "Emily Johnson",
            role: "Homeowner",
        },
        {
            text: "As a realtor, AcquireSpace has been a game-changer for connecting with clients and showcasing properties.",
            name: "James Carter",
            role: "Realtor",
        },
        {
            text: "I was able to list my property seamlessly and got multiple offers in no time. Great platform!",
            name: "Sophia Martinez",
            role: "Property Seller",
        },
        {
            text: "The best real estate app I’ve ever used. It’s fast, user-friendly, and helped me make informed decisions.",
            name: "Michael Lee",
            role: "Investor",
        },
        {
            text: "Finding commercial spaces for my business was a breeze with AcquireSpace. Highly recommend it!",
            name: "Chloe Anderson",
            role: "Business Owner",
        },
        {
            text: "Their customer support is top-notch! They helped me every step of the way to sell my property.",
            name: "David Kim",
            role: "Property Seller",
        },
        {
            text: "I found multiple options for rental properties that matched my budget and preferences perfectly.",
            name: "Olivia Brown",
            role: "Tenant",
        },
        {
            text: "AcquireSpace offers the best database of properties. Everything is so well organized and easy to search.",
            name: "Ethan Wilson",
            role: "Real Estate Consultant",
        },
        {
            text: "The user experience is seamless, and I love the attention to detail in the property listings.",
            name: "Ava Davis",
            role: "Homebuyer",
        },
    ]

    return (
        <div className="mt-[30px] lg:mt-[55px]  py-10 px-5 lg:px-20 my-4">
            <Swiper 
                style={{padding:'10px'}}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-2xl cursor-pointer 
                        ">
                            <p className="text-lg italic text-gray-700 mb-6">"{testimonial.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primaryColor text-white font-bold flex items-center justify-center rounded-full">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Testimonial
