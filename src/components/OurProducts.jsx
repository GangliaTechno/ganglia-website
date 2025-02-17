import React from 'react';
import { useNavigate } from 'react-router-dom';
import content from '../../content.json';
import { useEffect } from 'react';

export const OurProducts = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();
  const handleOnclick = (product) => {
    navigate(`/product-detail/${product.name}`, { state: { product } })
  }

  return (
    <div className=" bg-gray-100 py-4">
      <div className=" relative h-fit flex flex-col items-center justify-center text-center">
        <div className='absolute inset-0 bg-gray-400 opacity-60 z-0'></div>
        {/* Background Image */}
        <img
          src="/assets/images/productBg.jpg"
          className="absolute inset-0 w-full h-full object-center mix-blend-multiply z-0"
          alt="Background"
        />
        {/* Text Content */}
        <div className="relative  bg-white/50 p-10 h-full w-full">
          <h1 className="text-4xl font-bold text-gray-700 mb-6">Our Products</h1>
          <p className="text-gray-600 mb-10 mx-auto max-w-5xl text-lg">
            {content.ourProducts}
          </p>
        </div>
      </div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-w-3/4 md:min-w-2xl max-w-3xl  mx-auto relative -top-16">
        {content.products.map((product, index) => (
          <div
            key={index}
            className="text-gray-800 shadow-lg shadow-gray-400 rounded-lg overflow-hidden h-full flex flex-col transform transition duration-300 mx-5 ease-in-out hover:scale-105 hover:shadow-gray-500"
            onClick={(e) => { handleOnclick(product) }}
          >
            {/* Image Section - Takes 2/3 height */}
            <div className="h-60">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center"
              />
            </div>

            {/* Content Section - Takes 1/3 height */}
            <div className="h-2/4 p-4 flex flex-col justify-center text-center">
              <h3 className="text-xl font-semibold mb-5">{product.name}</h3>
              <p className="text-gray-900  italic text-base">{product.description}</p>
              {/* <p className="text-gray-700 text-sm">{product.details}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProducts;

