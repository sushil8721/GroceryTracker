const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require("mongoose-unique-validator");

const ProductSchema = new Schema({
  product_name: {type: String,required:[true,"please enter a name"], minlength:3},
  product_price: {type: Number,required:[true, "please enter a price"],min:0},
  product_quantity: {type: Number,required:[true,"please enter a quantity"],min:0},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Product', ProductSchema);
