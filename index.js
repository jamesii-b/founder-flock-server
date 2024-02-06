const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/dbConnection')();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', require('./routes/authRoutes'));

app.use('/test', require('./middleware/jwtAuth'))
app.get("/test/x", (req, res) => {
    res.send("authentication succces")
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});