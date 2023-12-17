import express from "express";
import cors from "cors";

const app = express()


//parsers
app.use(express.json())  //json parse will happen
app.use(cors())





app.get('/', (req, res) => {
    res.send('Hello World! how are you')
})

export default app;