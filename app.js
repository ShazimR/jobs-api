require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Jobs API');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
