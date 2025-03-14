import { faFacebook, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import content from "../../content.json";

const Footer = () => {
    return (
        <footer className=" text-black w-full bg-white">
            <div className="py-6 relative overflow-hidden">
                <div className="mx-auto justify-between ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="inline text-black">
                        <img src={content.home.logo} className="h-10 mb-2" />
                        <p>Phone: {content.contact.phone}</p>
                        <p>Headquarters: {content.contact.headquarters}</p>
                        <p>Email: {content.contact.email}</p>
                    </div>
  
                    {/* Help Section */}
                    <div className="text-lg">
                        <h3 className="font-bold text-xl mb-4">Company</h3>
                        <div className="ml-2">
                            {/* <p><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></p> */}
                            {/* <p><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></p> */}
                            <p><Link to="/ourteam" onClick={() => setIsOpen(false)}>Our team</Link></p>
                            {/* <p><Link to="/">Blog</Link></p> */}
                            <p><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></p>
                        </div>
                    </div>

                    <div className="text-lg h-full">
                        <h3 className="font-bold text-xl mb-4">Our Services</h3>
                        <div className="ml-2">
                            <p><Link to="/ourservices" onClick={() => setIsOpen(false)}>Services</Link></p>
                            {/* <p><Link to="/ourproducts">Our products</Link></p> */}
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="mr-6 items-center">
                        <h3 className="text-xl font-bold mb-6">Team Solutions</h3>
                        <div className="flex space-x-6 text-2xl lg:ml-4">
                            <Link to="https://www.facebook.com/people/Ganglia-Technologies-Private-Limited/100093543685978/" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faFacebook} /></Link>
                            <Link to="https://x.com/Ganglia_in" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faXTwitter}/></Link>
                            <Link to="https://www.linkedin.com/company/ganglia-technologies-private-limited/" target="_blank"><FontAwesomeIcon className="transition hover:scale-125" icon={faLinkedin} /></Link>
                            <a href={`mailto:${content.contact.email}`}>
                                <FontAwesomeIcon
                                    className="transition hover:scale-125"
                                    icon={faEnvelope}
                                />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyrights section */}
            {/* <div className="bg-gray-100 py-1">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="text-gray-600 px-3">&copy; Ganglia Technologies Pvt. Ltd. 2022 All rights reserved.</p>
                </div>
            </div> */}
        </footer>
    );
};

export default Footer;
