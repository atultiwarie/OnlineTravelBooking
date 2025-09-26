require('dotenv').config()
const express = require('express')
const cors= require('cors')
const app = express()
const connectDB = require('./config/mongo')
const {connectPostgres} = require('./config/postgres')
const PORT = process.env.PORT || 3000

// Connect Database
connectDB()
connectPostgres()

// cors
app.use(
  cors({
    origin: "https://online-travel-booking.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Define Routes    

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/hotels', require('./routes/hotelRoute'))
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/cart', require('./routes/cartRoute'))
app.use('/api/bookings', require("./routes/bookingRoute"))


app.listen(PORT, console.log(`Server running on port  http://localhost:${PORT}`))