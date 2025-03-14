import { motion } from "framer-motion";
import React, { useEffect } from "react";
import content from "../../content.json";

const OurServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 h-auto">
      {/* Background Section */}
      <div className="relative bg-gray-100">
        <div className="absolute inset-0 bg-gray-300 opacity-60 z-0"></div>
        {/* Background Image */}
        <img
          src="/assets/images/productBg.jpg"
          className="absolute inset-0 w-full h-full object-center mix-blend-multiply z-0"
          alt="Background"
        />
        <div className="w-full h-fit bg-cover bg-center pb-4">
          {/* Text Overlay on Background */}
          <div className=" transform text-center z-10 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">
              {content.servicesPage.heroTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              {content.servicesPage.heroSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="relative w-5/6 mx-auto pb-1">
        <div className="flex flex-wrap justify-center relative -top-16">
          {content.services.map((service, index) => (
            // <a href='/contact'>
            <motion.div
              key={index}
              className="bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 overflow-hidden mb-12 flex flex-col md:flex-row justify-between transition duration-300 hover:bg-gray-100"
              style={{ width: "100%", maxWidth: "1200px" }}
              whileHover="visible"
              initial="hidden"
              animate="hidden"
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1 },
              }}
            >
              {/* Image Section */}
              <div
                className={`w-full md:w-70 h-64 flex items-center justify-center transition duration-300 my-auto ${
                  index % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full"
                />
              </div>

              {/* Text Section */}
              <motion.div className="p-6 md:w-2/3 max-w-4xl text-gray-800 flex flex-col transition-all duration-500 mx-auto">
                {/* Title */}
                <motion.h3
                  className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-500"
                  variants={{
                    hidden: { fontSize: "2rem", marginTop: 34 },
                    visible: { fontSize: "1.8rem", marginTop: 4 },
                  }}
                >
                  {service.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  className="text-lg text-gray-700 mb-2 transition-all duration-500"
                  variants={{
                    hidden: { fontSize: "1.2rem" },
                    visible: { fontSize: "1rem" },
                  }}
                >
                  {service.subtitle}
                </motion.p>

                {/* Description (Now Appears on Whole Card Hover, Including Image) */}
                <motion.p
                  className="text-gray-600 opacity-0 transition-all duration-500"
                  variants={{
                    hidden: {
                      opacity: window.innerWidth < 1024 ? 1 : 0,
                      height: window.innerWidth < 1024 ? "auto" : 0,
                    },
                    visible: { opacity: 1, height: "auto" },
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            </motion.div>
            // </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
