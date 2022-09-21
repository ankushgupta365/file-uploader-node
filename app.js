require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
//extra security pacakages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const fileUploader = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// database
const connectDB = require('./db/connect');

//product router
const productRouter = require('./routes/productRoutes')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(express.static('./public'))
app.use(express.json())
app.use(fileUploader({useTempFiles: true}))
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});
app.use('/api/v1/products', productRouter)
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
