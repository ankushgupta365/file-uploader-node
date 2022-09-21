const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const getAllProducts = async (req, res)=>{
    res.send("getting all products")
}
const createProduct = async (req,res)=>{
    res.send("creating product")
}

module.exports = {getAllProducts,createProduct}