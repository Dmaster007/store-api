const express = require('express');
require("dotenv").config()
require('express-async-errors')
// console.log('04 Store API')
const app = express();
const notFoundMiddleware = require('./middleware/error-handler')
const eroorHandlerdMiddleware = require('./middleware/not-found')
const connectDB =require('./db/connect');
const productRouter = require('./routes/products');

//middle ware
app.use(express.json())

//routes
app.get("/", (req, res) => {
    res.send('<div><h1 >Anand Agro API</h1><a href="/api/v1/products">durgesh</a></div>')
})

app.use("/api/v1/products",productRouter)
//products route
app.use(notFoundMiddleware);
app.use(eroorHandlerdMiddleware);
const port  = process.env.PORT||5000
const start = async()=>{
    try {
        //connect DB
        await connectDB(process.env.MONGO_URL);
         console.log("succesfully connect to DB");
         app.listen(port,console.log("server running at "+port)
    )
    } catch (error) {
        console.log(error);
    }
}
start();