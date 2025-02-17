import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about", hasDropdown: true },
  { name: "Services", path: "/services" },
  { name: "Our Products", path: "/ourproducts" },
  { name: "Contact", path: "/contact" },
];

const aboutDropdown = [
  { name: "Our Company", path: "/about" },
  { name: "Our Team", path: "/ourteam" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    setSelected(currentTab ? currentTab.name : "About Us");
  }, [location.pathname]);

  return (
    <nav className="bg-white p-4 text-black fixed top-0 left-0 w-full shadow-md z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex flex-row gap-2" to={"/"}>
          <img src="/assets/images/GANGLIA LOGO BLACK.png" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex text-lg relative">
          {tabs.map((tab) => (
            <div key={tab.name} className="relative group">
              <Link
                to={tab.path}
                onClick={() => setSelected(tab.name)}
                className="relative text-black px-4 py-2 rounded-md"
                onMouseEnter={() => tab.hasDropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span className="relative z-10">{tab.name}</span>
                {tab.hasDropdown && (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="relative z-10 pl-2"
                  />
                )}
                {selected === tab.name && (
                  <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 1 }}
                    className="absolute inset-0 z-0 bg-gray-400 rounded-md"
                  ></motion.span>
                )}
              </Link>

              {/* Dropdown for About Us */}
              {tab.hasDropdown && isDropdownOpen && (
                <div
                  className="absolute left-0 w-44 mt-0.5 bg-white shadow-lg rounded border border-gray-600 text-base"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-400 hover:to-indigo-600 "
                      onClick={() => {
                        setSelected("About Us");
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white py-4 space-y-4 absolute top-full left-0 w-full border-b border-gray-600">
          {tabs.map((tab) => (
            <div key={tab.name} className="relative">
              <Link
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className="block py-2"
              >
                {tab.name !== "About Us" ? tab.name : ""}
              </Link>

              {/* Mobile Dropdown for About Us */}
              {tab.hasDropdown && (
                <div className="text-center -mt-5 space-y-7">
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
