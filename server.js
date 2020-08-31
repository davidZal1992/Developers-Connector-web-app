const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app=express();
const path=require('path')


//connect DB
connectDB();

//Cors
const corsConfig = {
    origin: 'https://localhost:3000',
    credentials: true,
  };
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//Init Middleware
app.use(express.json({extended: false}))
app.use('/public', express.static('public'));



//Define routes
app.use('/api/users', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/oauth', require('./routes/api/oauth'))

app.use('/public', express.static('public'));

//Serve static assets in production

if(process.env.NODE_ENV=== 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client' , 'build' , 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Sever started on port ${PORT}`));