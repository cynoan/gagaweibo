const mysql = require("mysql");
let pool = mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"gagaweibo",
    connectionLimit:15
});

module.exports = pool;