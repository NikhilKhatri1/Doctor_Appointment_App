import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'

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


app.get('/', (req, res) => {
    res.send('API WORKING Great')
})

app.listen(port, () => {
    console.log("Server Started at http://localhost:4000")
})