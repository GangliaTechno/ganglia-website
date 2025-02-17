import React, { useState } from 'react';
import content from "../../content.json"
import AwardDetails from './AwardDetails';

const Milestones = () => {

  const [selectedAward,setSelected]=useState("")

  const openCertificate=(award)=>{
    setSelected(award)
  }

  const closeCertificate=()=>{
    setSelected(null)
  }

  return (
    <div className="w-full mx-auto p-6 bg-gray-100">
      {/* Milestones Section */}
      <section className="py-12">
        <div className="p-4 items-center text-center lg:ml-36 md:ml-32 mb-12">
          <h2 className="text-4xl  font-bold text-gray-800 mb-8 ml-4">Milestones and Recognition</h2>
          <p className='text-lg w-2/3 text-left mx-auto'>
            {content.milestoneDescription}
          </p>
        </div>

        {/* Award List */}
        <div className="flex flex-wrap justify-center gap-8 px-4 w-[90%] mx-auto">
          {content.awardsAndRecognition.map((award, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg mb-3 w-80 hover:shadow-2xl hover:-translate-y-0.5" onClick={()=>openCertificate(award)}>
              <img src={award.imgurl} alt={award.title} className="w-16 h-16 -mt-8 mb-4" />
              <span className="text-lg text-gray-600 mb-2">{award.year}</span>
              <h3 className="text-base font-semibold text-gray-800 text-center">{award.title}</h3>
            </div>
          ))}
        </div>

        {
          selectedAward && (
            <div className='fixed inset-0 z-20'>
              <AwardDetails award={selectedAward} close={closeCertificate}/>
            </div>
          )
        }
          
      </section>
    </div>
  );
}

export default Milestones;
