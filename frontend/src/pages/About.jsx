import React from 'react'
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='pt-10 text-2xl text-center text-gray-500'>
        <p>About <span className='font-medium text-gray-700'>US</span></p>
      </div>
      <div className='flex flex-col gap-12 my-10 md:flex-row '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records</p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it</p>
        </div>
      </div>
      <div className='my-4 text-xl'>
        <p className=''>WHY <span className='font-semibold text-gray-700'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col mb-20 md:flex-row'>
        <div className='flex flex-col px-10 py-8 border md:px-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer md:me-2 my-1 sm:my-0'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='flex flex-col px-10 py-8 border md:px-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer md:me-2 my-1 sm:my-0'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='flex flex-col px-10 py-8 border md:px-16 gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer md:me-2 my-1 sm:my-0'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About