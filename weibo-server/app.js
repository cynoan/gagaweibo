const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.js");
const cors = require("cors");

let app = express();

app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true 
}));

app.listen(4000);

console.log("server is running");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use("/user",userRouter);
