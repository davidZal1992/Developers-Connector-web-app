const express = require('express');
const connectDB = require('./config/db')

const app=express();

//connect DB
connectDB();

//Init Middleware
app.use(express.json({extended: false}))
//Check server Running
app.get('/', (req,res) =>res.send('API Runnig'))

//Define routes
app.use('/api/users', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Sever started on port ${PORT}`));