import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo)
    // console.log((docInfo));

  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting current Date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })

        // add slot to array

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // Increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }
      setDocSlots(prev => ([...prev, timeSlots]))

    }

  }


  useEffect(() => {

    fetchDocInfo();

  }, [doctors, docId])

  useEffect(() => {

    getAvailableSlots();

  }, [docInfo])

  useEffect(() => {

    console.log(docSlots);

  }, [docSlots])


  return docInfo && (
    <div >
      {/* ------ doctor details ------ */}

      <div className='flex flex-col gap-4 sm:flex-row'>
        <div>
          <img className='w-full rounded-lg bg-primary sm:max-w-72' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 p-8 mx-2 bg-white border border-gray-400 rounded-lg py-7 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ----- Doc Info name, degree, exp ----- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 mt-1 text-sm text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ---- Doctor About ----- */}
          <div>
            <p className='flex items-center gap-1 mt-3 text-sm font-medium text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='mt-4 font-medium text-gray-500'>
            Appointmnet fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* ---- Booking Slots ---- */}
      <div className='mt-4 font-medium text-gray-700 sm:ml-72 sm:pl-4'>
        <p>Bookin Slots</p>
        <div className='flex items-center w-full gap-3 mt-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border-gray-200 border'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center w-full gap-3 mt-4 overflow-x-scroll'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='py-3 my-6 text-sm font-light text-white rounded-full px-14 bg-primary'>Book an Appointment</button>
      </div>

      {/* ---- Listing Related Doctors ---- */}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment