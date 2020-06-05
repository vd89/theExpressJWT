import express from 'express';
import dbConnect from './controller/dbConnect';
import userRoute from './routers/userRoutes';

const app = express()
const port = process.env.PORT || 8085

// Import middleWare
app.use(express.json())

/*
   Route : /api/user/   
   User Route
   Public Route
*/
app.use('/API/user', userRoute)


app.listen(port, () => {
    console.log(`The server is running on port ${port}... 👍`);
})