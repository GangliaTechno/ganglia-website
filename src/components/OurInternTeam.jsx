import React, { useEffect } from 'react'
import content from '../../content.json'

export const OurInternTeam = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-100 pb-6">
            {/* Interns section */}
            <section className=" p-6 mb-4 w-[90%] mx-auto">
                <div className="p-4 items-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        {content.employeeSectionheader}
                    </h2>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8 mx-auto">
                    {content.ourEmployees.map((member, index) => (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-lg shadow-lg transition transform`}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-60 rounded-lg mb-4 object-cover"
                            />
                            <h3 className="text-lg font-semibold text-gray-700">
                                {member.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
