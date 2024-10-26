import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const MyAppointment = () => {
  const { doctors } = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 font-medium border-b text-bg-zinc-700'>My Appointment</p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='mt-1 font-medium text-zinc-700'>Address:</p>
              <p className='text-xs'>{item.address.line1}</p>
              <p className='text-xs'>{item.address.line2}</p>
              <p className='mt-1 text-xs'><span className='text-sm font-medium text-neutral-700'>Date & Time: </span>25, July, 2024 | 8:23 PM</p>
            </div>
            <div></div>
            <div className='flex flex-col justify-end gap-2'>
              <button className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-primary hover:text-white'>Pay Online</button>
              <button className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-red-600 hover:text-white'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment