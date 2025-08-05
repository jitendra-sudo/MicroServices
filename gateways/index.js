const proxy = require('express-http-proxy');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', proxy('http://localhost:3001'));
app.use('/', proxy('http://localhost:3002'));

app.listen(3000, () => {
    console.log('Gateway is running on port 3000');
});



