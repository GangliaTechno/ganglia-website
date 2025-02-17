import React, { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import content from '../../content.json'

const OurServices = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="bg-gray-100 h-auto ">
            {/* New Background Section at the Top */}
            <div className="relative bg-gray-100">
                <div className='absolute inset-0 bg-gray-300 opacity-60 z-0'></div>
                {/* Background Image */}
                <img
                    src="/assets/images/productBg.jpg"
                    className="absolute inset-0 w-full h-full object-center mix-blend-multiply z-0"
                    alt="Background"
                />
                <div
                    className="w-full h-fit bg-cover bg-center pb-4"
                // initial={{ opacity: 0, y: -100 }}
                // animate={{ opacity: 1, y: -60 }}
                // transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Text Overlay on Background */}
                    <div className=" transform text-center z-10 py-14">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">{content.servicesPage.heroTitle}</h2>
                        <p className='text-base md:text-lg text-gray-600'>{content.servicesPage.heroSubtitle}</p>
                    </div>
                </div>
            </div>

            {/* Services List */}
            <div className='relative w-5/6 mx-auto pb-1'>
                <div className="flex flex-wrap justify-center relative -top-16">
                    {content.services.map((service, index) => {
                        const ref = useRef(null);
                        const isInView = useInView(ref, { triggerOnce: false, margin: "-50px 0px" });

                        return (
                            <div
                                key={index}
                                ref={ref}
                                className="bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 overflow-hidden mb-12 flex flex-col md:flex-row ml-6 justify-between hover:bg-gray-100 transition duration-300"
                                style={{ width: "100%", maxWidth: "1200px" }}
                            >
                                {/* Image Section (Fixed) */}
                                <div className={`w-full md:w-70 h-64 flex items-center justify-center transition duration-300 my-auto ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                                    <img src={service.image} alt={service.title} className="w-full h-full  " />
                                </div>

                                {/* Text Section (ANIMATED) */}
                                <div className="p-6 md:w-2/3 max-w-4xl text-gray-800">
                                    {isInView && (
                                        <>
                                            <motion.h3
                                                className="text-2xl font-bold text-gray-800 mb-2"
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                            >
                                                {service.title}
                                            </motion.h3>

                                            <motion.p
                                                className="text-gray-800"
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                                            >
                                                {service.subtitle}
                                            </motion.p>

                                            <motion.p
                                                className="text-gray-600"
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                                            >
                                                {service.description}
                                            </motion.p>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OurServices;
