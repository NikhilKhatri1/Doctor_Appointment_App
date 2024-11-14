import validator from 'validator'
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
// import upload from '../middlewares/multer.js'
// API for adding doctor

const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        //get image file 
        const imageFile = req.file
        // console.log({ name, email, password, speciality, degree, experience, about, fees, address, imageFile });

        //checking for all data to add doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" })
        }

        // hashing doctor password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uplaod image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url


        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()
        res.json({ success: true, message: "Doctor Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// api for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credential" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctor list for admin panel
const allDoctors = async (req, res) => {
    try {
        //select property remove password from res
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API to get all apointment list
const appointmentAdmin = async (req, res) => {

    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// API for Appointment cancellation

const appointmentCancel = async (req, res) => {
    try {
        // userId and appointmentId from req.body
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // cancelling appointment from db
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // removing doctor Slot
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)
        // copy doctor data ot slots booked to remove cancelled date

        let slots_booked = doctorData.slots_booked
        // check individual slot is not equal to slotTime if found then remove
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        // removing slots details and displaying new data after removing 
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        // once removed the data then display message
        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// API to get dashboard data in admin panel

const adminDashboard = async (req, res) => {
    try {
        // total number of appointment details
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        // need no. doctors,users,appointments and latest appointments
        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard }