require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const routes = require('./routes/productRouter');
mongoose.set('strictQuery', true);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


app.use(express.json());  
app.use(fileUpload({useTempFiles: true}));


app.use('/api/v1/products',routes)

//error route
app.use((req, res) => {
    res.status(404).send('Route not found')
})



const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error)
    };
};

start();
