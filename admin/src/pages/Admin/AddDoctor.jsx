import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubbmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (!docImg) {
                return toast.error("Image not selected")
            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console.log formdata

            formData.forEach((value, key) => {
                console.log(`${key}:${value}`);
            })

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setExperience('')
                setDegree('')
                setSpeciality('')
                setAbout('')
                setFees('')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <form onSubmit={onSubbmitHandler} className='w-full m-4'>

            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='w-full max-w-4xl px-8 py-8 bg-white border rounded max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col items-start gap-10 text-gray-600 lg:flex-row'>
                    <div className='flex flex-col w-full gap-4 lg:flex-1'>

                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Doctor name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='px-3 py-2 border rounded' type="text" placeholder='Name' required />
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='px-3 py-2 border rounded' type="email" placeholder='Email' required />
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='px-3 py-2 border rounded' type="password" placeholder='Password' required />
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='px-3 py-2 border rounded'>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className='flex flex-col flex-1 gap-1' >
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='px-3 py-2 border rounded' type="number" placeholder='fees' required />
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4 lg:flex-1'>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='px-3 py-2 border rounded'>
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='px-3 py-2 border rounded' type="text" placeholder='Education' required />
                        </div>
                        <div className='flex flex-col flex-1 gap-1'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='px-3 py-2 border rounded' type="text" placeholder='address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='px-3 py-2 border rounded' type="text" placeholder='address 2' required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required />
                </div>
                <button type='submit' className='px-10 py-3 mt-4 text-white rounded-full bg-primary'>Add doctor</button>

            </div>
        </form>
    )
}

export default AddDoctor