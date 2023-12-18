import express from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";

const app = express()


//parsers
app.use(express.json())  //json parse will happen
app.use(cors())

//application routes
app.use('/api/v1/students', StudentRoutes)



app.get('/', (req, res) => {
    res.send('Hello World! how are you')
})

export default app;