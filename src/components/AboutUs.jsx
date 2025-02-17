import React, { useEffect } from "react";
import content from "../../content.json";
import Milestones from "./Milestones";
import OurApproach from "./OurApproach";

export const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-50">
      <div className="pt- relative ">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gray-800 opacity-50 z-0"></div>

        {/* Content Layer */}
        <div className="relative flex flex-col lg:flex-row md:flex-col p-2">
          <div className="p-2 my-auto text-white">
            <h1 className="text-4xl lg:text-5xl md:text-5xl font-bold text-center mb-4 pt-10">
              {" "}
              About Us .
            </h1>
            <h1 className="text-2xl lg:text-3xl md:text-3xl font-bold text-center mb-4">
              {content.aboutUs.heroTag}
            </h1>
            <p className="text-lg w-3/4 text-left mx-auto">
              {content.aboutUs.heroDescription}
            </p>
          </div>
          <img
            src="/assets/images/gangliateam.png"
            className="h-lg w-xl mix-blend-multiply"
          />
        </div>
      </div>
      <div className="relative z-10 -mt-16">
        <OurApproach />
      </div>
      <Milestones />
    </div>
  );
};
