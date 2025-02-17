import React from "react";
import content from "../../../content.json";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const OurTeam = ({ context }) => {
  const [images, setImages] = useState(content.teamImages)
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  return (
    <div className="bg-gray-100 pb-6">
      <section className="py-10 bg-gray-100">
        <div className="p-4 items-center lg:ml-36">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 ml-4">
            {content.teamHeader}
          </h2>
          <p className="max-w-2xl text-left text-xl m-4">
            {content.ourTeamDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {content.ourTeam.map((member, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1`}
            >
              <a href={member.linkedIn}
                target="_blank">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full rounded-lg mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  {member.name}
                </h3>
                <h4 className="text-base font-semibold text-gray-600">
                  {member.position}
                </h4>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Emplyee section */}
      {context !== "home" ? (
        <section className="py-12 w-[90%] mx-auto shadow-lg rounded-xl p-6 border-t border-gray-200 bg-gray-50">
          <div className="p-4 items-center lg:ml-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 ml-4">
              {content.SubteamTitle}
            </h2>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap md:w-[90%] mx-auto gap-x-10">
          <div className="relative w-full max-w-3xl h-100 flex justify-center mx-auto p-2">
            {/* Image Transition */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
              onClick={nextSlide} 
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="w-full my-auto">
            <p className="p-4 md:text-xl lg:text-xl max-w-3xl bg-gray-100 rounded-md shadow-lg">{content.teamDescriptions[currentIndex]}</p>
          </div>
          </div>
        </section>

      ) : ("")}
    </div>
  );
};

export default OurTeam;
