import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import content from "../../../content.json"

const WhoAreWe = () => {
  return (
    <div className="relative mb-10"> {/* Added mb-10 to ensure spacing */}
      <div className="flex flex-col md:flex-row">
      <div className="relative w-full sm:w-[100%]  h-fit mb-4">
          <img
            src={content.home.whoAreWeBG}
            className=""
          />
          {/* Opacity Layer */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <h2 className="absolute left-0 top-36 lg:top-56 md:top-56 text-4xl lg:text-6xl md:text-5xl sm:text-5xl font-bold text-white mb-8 ml-4">
          Who Are We?
        </h2>

        {/* Right content */}
        <div className="relative text-left -mt-20 md:mt-10 mx-4 md:-ml-10 w-[90%] lg:w-full md:w-full h-fit flex justify-center">
  <div className="p-6 md:p-16 lg:p-20 text-base md:text-xl lg:text-xl bg-gray-100 rounded-md shadow-xl">
    <p>
      {content.home.whoAreWe}
    </p>
    <p className="text-base mt-2 text-blue-950">
      {content.home.joinUs}
    </p>
    <Link
      to="/about"
      className="w-full rounded mt-2 bg-neutral-900 px-4 py-3 text-lg text-white transition-colors hover:scale-105 md:w-fit group flex items-center justify-center no-underline"
    >
      Learn more
      <FiArrowUpRight className="inline transition-transform duration-300 group-hover:rotate-45" />
    </Link>
  </div>
</div>

      </div>
    </div>
  );
};

export default WhoAreWe;
