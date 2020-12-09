const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

///constants
const app = express()

///static files
app.use('/uploads',express.static('uploads'))

//user define modules
const productRoutes = require('./api/route/products');
const orderRoutes = require('./api/route/orders');

///morgan and body parser middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

///cors handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method==="OPTIONS"){
      res.header("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE")
      return res.status(200).json({});
  }
  next();
});

///user define routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

///Error handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.json({
        massage:err.message
    });
});

///exported modules
module.exports = app;


