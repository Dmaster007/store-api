const express = require('express');
const routes=  express.Router();
const {getAllProduct,getAllProductsSTATIC} = require('../controllers/products')
routes.route("/").get(getAllProduct)
routes.route("/static").get(getAllProductsSTATIC) 
module.exports= routes
