import React, { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Apointments</p>
      <div className='text-sm bg-white border rounded max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='grid max-sm:hidden grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div key={index}>
              <p>{index + 1}</p>
              <div>
                <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <div>
                <p>{item.payment ? "Online" : "Cash"}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
