import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AwardDetails = ({ award, close }) => {
  // const {state} = useLocation();
  // const {award} = state

  return (
    <div className='h-screen flex items-center'>
      <div className='absolute inset-0 bg-gray-900 opacity-70 item'></div>
      <div className='py-2 bg-white w-5/6 sm:w-2/3 m-auto my-auto max-h-[90vh] relative overflow-y-auto'>
        <button className="sticky top-0 left-full sm:mr-0 md:mr-3 text-gray-800 opacity-45 md:opacity-100 md:bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-2xl"
          onClick={close}>
          <FontAwesomeIcon icon={faClose} />
        </button>

        <div className='flex justify-center items-center p-5 flex-col pt-0' >
          <img src={award.certificateUrl} className='w-[70vw] md:w-[40vw] lg:w-[30vw]'></img>
          <div className='text-lg text-center pt-6'>
            <h1 className='text-gray-700 font-semibold'>{award.title}</h1>
            <h1 >Year : {award.year}</h1>
            <h1>{award.organization}</h1>
            <h1 className='max-w-[80%] mx-auto'>{award.description}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwardDetails