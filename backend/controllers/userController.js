import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay';

// API to register user

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid email' })
        }
        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter a Strong passowrd' })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)

        const user = await newUser.save()

        // create token so use can login

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'user does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile Data
const getProfile = async (req, res) => {
    try {
        // userId will get from token
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// API to update user Profile

const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to BOOK Appointment

const bookAppointment = async (req, res) => {
    try {
        // Taking the data to Appointment
        const { userId, docId, slotDate, slotTime } = req.body
        // finding tha doctor is available 
        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not availabe' })
        }
        // if Available then copying the booked Data

        let slots_booked = docData.slots_booked

        // Checking for slot availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                // if Time available then book the slot
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        // geting the UserData
        const userData = await userModel.findById(userId).select('-password')
        // deleting the slot Booked Data to avoid unneccesary Data
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots Data in docData

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user Appointment for Frontend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        // userId and appointmentId from req.body
        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user tht correct user is same as appointment data

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }
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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

})
// console.log(razorpayInstance)
// console.log(process.env.CURRENCY)
// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);


// API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        // if appointment is cancelled you dont have to pay
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }

        // creating option for razor pay
        const options = {
            amount: appointmentData.amount * 10,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an Order

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }