import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from 'cors';


dotenv.config();


connectDatabase();


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 1000;



app.use("/api/import", ImportData);
app.use("/api/user", userRouter);



app.use(notFound);
app.use(errorHandler);


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
});


process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
 
});

export default server;



