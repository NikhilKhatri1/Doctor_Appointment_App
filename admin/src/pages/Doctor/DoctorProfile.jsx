import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,

      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {

    if (dToken) {
      getProfileData()
    }

  }, [dToken])


  return profileData && (

    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='w-full rounded-lg bg-primary/80 sm:max-w-64' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 px-8 bg-white border rounded-lg border-stone-100 py-7'>

          {/* ---- Doc Info Name,degree, experience */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>

          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 rounded-full px-2 border text-xs'>{profileData.experience}</button>
          </div>

          {/* ----- Doctor About ----- */}

          <div>
            <p className='flex items-center gap-1 mt-3 text-sm font-medium text-neutral-800 '>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>

          <p className='mt-4 font-medium text-gray-600'>
            Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees} </span>
          </p>
          <div className='flex gap-2 py-2 '>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit
              ?
              <button onClick={updateProfile} className='px-4 py-1 mt-5 text-sm transition-all border rounded-full border-primary hover:bg-primary hover:text-white'>save</button>
              :
              <button onClick={() => setIsEdit(true)} className='px-4 py-1 mt-5 text-sm transition-all border rounded-full border-primary hover:bg-primary hover:text-white'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile