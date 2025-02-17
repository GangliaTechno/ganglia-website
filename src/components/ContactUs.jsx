import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import content from "../../content.json";
import { toast, ToastContainer } from "react-toastify";

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const subject = `Contact from ${formData.firstName} ${formData.lastName} (${formData.company || 'No Company'})`;
    //     const body = `${formData.message}\n
    //     From:
    //         ${formData.firstName} ${formData.lastName}${formData.company ? '\n'+formData.company + ',' : ''}
    //         ${formData.phone ? 'Phone: ' + formData.phone : ''}
    //         Email: ${formData.email}
    //     `;
    //     window.location.href = `mailto:director@ganglia.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceID = "service_mf8vf0o";
        const templateID = "template_m7xa5mf";
        const userID = "cdH3coS9NNtTTiYXW";

        emailjs.send(serviceID, templateID, formData, userID)
            .then(() => {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    company: "",
                    phone: "",
                    message: "",
                });
                toast.success("Message sent successfully!");
            })
            .catch(() => {
                toast.error("Failed to send the message. Please try again.");
            });
    };

    return (
        <div className="">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className={'p-4'}
                toastClassName={() => "relative flex p-6 rounded-md justify-between cursor-pointer bg-white text-black"}
            />
            <div className="bg-cover bg-center relative">
                <div className='absolute inset-0 bg-black opacity-90 -z-10'>
                    <img src="/assets/images/contactBG.jpeg" className='w-full h-64 object-cover mask-image brightness-50' />

                </div>

                <h1 className="text-4xl lg:text-6xl md:text-5xl font-bold text-white pb-28 pt-10 text-center text-nowrap">Contact Us</h1>

            </div>

            <div className="w-5/6 mx-auto -mt-16 flex flex-col sm:flex-row justify-evenly gap-8 bg-gray-50 mb-6 shadow-2xl">
                {/* Contact Details */}
                <div className="p-8 rounded-lg">
                    <h2 className="text-xl font-semibold border-b pb-2 mb-4">Get in Touch</h2>
                    <p><strong><FontAwesomeIcon icon={faPhone} /> Phone:</strong>
                        &nbsp; {content.contact.phone}
                    </p>
                    <p><strong><FontAwesomeIcon icon={faEnvelope} /> Email:</strong>
                        &nbsp;{content.contact.email}
                    </p>
                    <div className="mt-10">
                        <span className="text-lg font-semibold">{content.contactUs.title}</span>,
                        <br />
                        <div className="ml-3">
                            {content.contactUs.address.map((element, index) => (
                                <p key={index}>{element}</p>
                            ))}

                        </div>
                    </div>
                    <p className="text-red-500 mt-2">{content.contactUs.footNote}</p>
                </div>

                {/* Contact Form */}
                <div className="p-8 rounded-lg w-full">
                    <h2 className="text-xl font-semibold border-b pb-2 mb-4">Send Us a Message</h2>
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="p-3 bg-gray-200 rounded" required />
                        <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="p-3 bg-gray-200 rounded" />
                        <input type="email" placeholder="Email *" name="email" value={formData.email} onChange={handleChange} className="p-3 bg-gray-200 rounded col-span-2" required />
                        <input type="text" placeholder="Company (optional)" name="company" value={formData.company} onChange={handleChange} className="p-3 bg-gray-200 rounded" />
                        <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} className="p-3 bg-gray-200 rounded" />
                        <textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleChange} className="p-3 bg-gray-200 rounded col-span-2 h-28" required></textarea>
                        <button className="col-span-2 bg-neutral-900 text-white py-3 rounded transition-colors hover:scale-101">Submit</button>
                    </form>
                </div>
            </div>
            <div className="px-16 relative p-10 flex flex-col border-b border-gray-300">
                <h3 className="font-bold text-xl sm:text-4xl sm:m-auto mb-6 sm:mb-6 text-nowrap">{content.contactUs.subtitle}</h3>
                <p className="max-w-4xl text-base sm:text-xl mx-auto">
                    {content.contactUs.note}
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
