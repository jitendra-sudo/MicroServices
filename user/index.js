const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.model.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

app.listen(3001, () => {
    console.log('Server is running on port 3000');
    connectDB();
});


app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);

