const express = require('express');
const mongoose = require('mongoose');
const Product = require('./products.model.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
app.listen(3002, () => {
    console.log('Server is running on port 3002');
    connectDB();
});
app.post('/products', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = new Product({ name, price, description });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});