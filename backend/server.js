import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
// alow frontend to conect with backend
app.use(cors())

// api endpoint
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter)
// register path
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API WORKING Great')
})

app.listen(port, () => {
    console.log("Server Started at http://localhost:4000")
})