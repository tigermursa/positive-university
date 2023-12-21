import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express()


//parsers
app.use(express.json())  //json parse will happen
app.use(cors())

//application routes
app.use('/api/v1/', router)




app.get('/', (req, res) => {
    res.send('Hello World! how are you')
})

//global error handler function
app.use(globalErrorHandler)
//Not Found for unknown routes
app.use(notFound)



export default app;