const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');
const favoritesRoutes = require('./routes/favorites');

//app
const app = express();
const port = process.env.PORT || 8000

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected to Atlas!'));
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log('DB connected!'));
mongoose
  .connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)});


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



app.use(express.static(path.join(__dirname, 'build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'build', 'index.html'));
  });
};

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));})

//start server
app.listen(port, () => {
  console.log( `server is listening on port ${port}`);
})




//routes middleware
//use /api to get all routes but in localhost add /api to url
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);
app.use('/api', favoritesRoutes);



// app.listen(port, () => {
//   console.log(`server is listening on ${port}`);
// });