require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const authenticationMiddleWare = require('./middleware/authentication');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleWare, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("CONNECTED\n");
        app.listen(port, () => {
            console.log(`Server is listening at http://${host}:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
