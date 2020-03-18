const express = require("express");
const pool = require("../pool.js");

let router = express.Router();

router.post("/login", (req, res) => {
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    pool.query("SELECT uid FROM user WHERE uname=? AND upwd=?", [$uname, $upwd], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            res.send({code:1,msg:"登录成功"});
        } else {
            res.send({code:-1,msg:"登录失败"});
        }
    });
});

module.exports = router;