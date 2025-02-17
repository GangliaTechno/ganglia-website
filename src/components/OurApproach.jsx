import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import content from '../../content.json'

const OurApproach = () => {
  // Intersection Observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  return (
    <div className='w-[90%] mx-auto p-3 bg-white'>
      {/* Our Approach Section */}
      <section className="py-12 p-3" >
        <div className="p-4 items-center text-center lg:ml-36 md:ml-32">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 ml-4">Our Approach</h2>
          <p className='text-lg w-2/3 text-left mx-auto'>
            {content.aboutUs.ourApproach}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Processes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4" ref={ref}>
          {content.processes.map((process, index) => (
            <motion.div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-all duration-300
`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // Animation based on scroll position
              transition={{ delay: index * 0.3, type: 'spring', stiffness: 100 }}
            >
              <img src={process.imgurl} className='w-40 h-40 mx-auto' />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{process.title}</h3>
              <p className="text-lg text-gray-600">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OurApproach;
