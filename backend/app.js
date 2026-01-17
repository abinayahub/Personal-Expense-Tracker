const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const authRoutes = require('./routes/auth.js');
require('dotenv').config()

const PORT = process.env.PORT||5000;

//middlewares
app.use(express.json())
app.use(cors({
    origin: [
      "https://personal-expense-tracker.frontender.com", // frontend deployed URL
      "http://localhost:3000" // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }

))
//routes
app.use("/api/auth", authRoutes);
//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()