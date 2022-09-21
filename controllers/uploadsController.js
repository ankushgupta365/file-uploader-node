const {StatusCodes} = require('http-status-codes')

const uploadImageController = async (req, res)=>{
    res.send("uploading image")
}

module.exports = {uploadImageController}