import express from 'express';
import dbConnect from './controller/dbConnect';

const app = express()
const port = process.env.PORT || 8085





app.listen(port, () => {
    console.log(`The server is running on port ${port}... 👍`);
})