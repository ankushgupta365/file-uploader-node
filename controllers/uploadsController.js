const { StatusCodes } = require('http-status-codes')
const path = require('path')
const cloudinary = require('cloudinary').v2
const customError = require('../errors')
const fs = require('fs')

const uploadImageControllerLocal = async (req, res) => {
    //when we are using express-fileupload, we get image at req.files
    if (!req.files) {
        throw new customError.BadRequestError("Please provide the image")
    }
    const uploadedImage = req.files.image
    if (!uploadedImage.mimetype.startsWith('image')) {
        throw new customError.BadRequestError("Please provide image format file")
    }
    const maxSize = 1024 * 1024
    if (uploadedImage.size > maxSize) {
        throw new customError.BadRequestError("Please provide image with less size")
    }
    const pathName = path.join(__dirname, '../public/uploads/' + `${uploadedImage.name}`)
    //mv function from express-file-upload move the uploaded file to the provided path on the server by running the callback
    await uploadedImage.mv(pathName)
    //we returned the src with half path bcz we are always on the root path when static files are served to use, so providing img tag src attribute this value will do the work
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${uploadedImage.name}` } })
}
const uploadImageController = async (req, res) => {
    //when we are using express-fileupload, we get image at req.files
    if (!req.files) {
        throw new customError.BadRequestError("Please provide the image")
    }
    const uploadedImage = req.files.image
    if (!uploadedImage.mimetype.startsWith('image')) {
        throw new customError.BadRequestError("Please provide image format file")
    }
    const maxSize = 1024 * 1024
    if (uploadedImage.size > maxSize) {
        throw new customError.BadRequestError("Please provide image with less size")
    }

    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload'
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    res.status(StatusCodes.OK).json({image: {src: `${result.secure_url}`}})
}

module.exports = { uploadImageController }