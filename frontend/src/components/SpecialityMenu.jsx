import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='text-sm text-center sm:w-1/3'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex w-full gap-4 pt-5 overflow-x-scroll sm:justify-center'>
                {
                    specialityData.map((item, index) => (
                        <Link onClick={() => scrollTo(0, 0)} className='flex flex-col items-center flex-shrink-0 text-xs cursor-pointer hover:translate-y-[-10px] transition-all direction-500' key={index} to={`/doctors/${item.speciality}`}>
                            <img className='w-16 mb-2 sm:w-24' src={item.image} alt="" />
                            <p>{item.speciality}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default SpecialityMenu