const createError = require('http-errors');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const {normalizeErrors} = require('./helpers/mongoose.js');
const axios = require('axios');
const cors = require('cors');
const Product= require('./models/product.js');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//-------------------------------------------------------
const app = express();

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//------------------------------------------------
app.use(express.static(path.join(__dirname , '../dist/angTemplateProj' )));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

//-----------------------------------------------
app.use(session({
  secret: 'keyboardkittelh',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));
//---------------------------------------------
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//----------------------------------------------

app.get('/api/products',function (req, res, next) {

  console.log(req.url);
  // axios.get(req.url).then(data=>{
  //   console.log(data);
  //
  //   res.json(data);
  // } );
  Product.find({},(err, result) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.error)});
    }
    console.log(result);
    return res.json({results: result});
  });
});

app.post('/api/create_product', function (req, res, next) {
  console.log(req.body);
  const new_product = new Product({
    product_name: req.body['name'],
    product_price: req.body['price'],
    product_quantity: req.body['quantity']
  });
  new_product.save((err, result)=>
  {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.json({results: result,message:"product successful created!"});
  });
});
app.get('/api/product/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, foundProduct) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    return res.json({product: foundProduct});
  })

});

app.post('/api/edit/:id', function (req, res, next) {

  Product.findById(req.params.id, function (err, foundProduct) {
    console.log("gfet",foundProduct);
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    foundProduct.product_name=req.body.name;
    foundProduct.product_price=req.body.price;

    foundProduct.product_quantity=req.body.quantity;

    foundProduct.save((err, result)=>
    {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({results: result,message:"product successful created!"});
    });

    // return res.json({message: "The product's name has been updated!",product:foundProduct});
  });

});

app.delete('/api/delete/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, foundProduct) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    foundProduct.remove(
      function (err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json({message: "A Product has been deleted, please reload to see changes!",product:foundProduct});
      });

  });

});
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("../dist/angTemplateProj/index.html"))
});

const PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
  console.log('App is running!');
});


module.exports = app;
