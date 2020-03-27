const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.js");
const uploadRouter = require("./routes/upload.js");
const cors = require("cors");

let app = express();

app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080","http://192.168.1.103:8080"],
    credentials:true 
}));

app.listen(4000);

console.log("server is running on port 4000");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use("/user",userRouter);
app.use("/upload",uploadRouter);
