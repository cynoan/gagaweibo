let qiniu = require('qiniu'); // 需要加载qiniu模块的
const express = require("express");
const pool = require("../pool.js");

let router = express.Router();



router.get('/token', (req, res) => {
  const accessKey = 'acRgw5Tf_paLgz3miuWl1MCYIQuu-mgkCh-n5sHW';
  const secretKey = '_144XjsHHjeY09x1fv6EGizr5VOeA4aAm5YY00IY';
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: "gagaweibo",
    expires: 7200
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  if (uploadToken) {
    res.send({ code: 1, data: { token: uploadToken } });
  } else {
    res.send({ code: 0, msg: "get token failed" });
  }
})

router.post("/newgaga", (req, res) => {
  var newgaga = req.body;
  console.log(newgaga);
  pool.query("INSERT INTO gagas SET ?", [newgaga], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "发布成功" });
    } else {
      res.send({ code: -1, msg: "发布失败" });
    }
  });
});


  router.post("/newcomm", (req, res) => {
  var newcomm = req.body;

  if(newcomm.ocid){
    delete newcomm.gid;
  }

  pool.query("INSERT INTO comms SET ?", [newcomm], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result.affectedRows > 0) {
      pool.query("UPDATE gagas SET comment = comment + 1 WHERE gid = ?", [newcomm.gid], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "评论成功" });
        } else {
          res.send({ code: -1, msg: "评论失败" });
        }
      });
    }
  });
});

router.post("/newlike", (req, res) => {
  var newlike = req.body;

  if (newlike.state == 1) {
    delete newlike.state;
    pool.query("INSERT INTO likes SET ?", [newlike], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result.affectedRows > 0) {
        pool.query("UPDATE gagas SET likes = likes + 1 WHERE gid = ?", [newlike.gid], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "success" });
          } else {
            res.send({ code: -1, msg: "failed" });
          }
        });
      }
    });
  } else {
    pool.query("DELETE FROM likes WHERE gid = ? AND uid = ?", [newlike.gid, newlike.uid], (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result.affectedRows > 0) {
        pool.query("UPDATE gagas SET likes = likes - 1 WHERE gid = ?", [newlike.gid], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "success" });
          } else {
            res.send({ code: -1, msg: "failed" });
          }
        });
      }
    });
  }



});
router.post("/newrelay", (req, res) => {
  var newRelay = req.body;

  let gids = newRelay.latestGid.split(",");
  console.log(gids);

  pool.query("INSERT INTO gagas SET ?", [newRelay], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result.affectedRows > 0) {
      pool.query("UPDATE gagas SET relay = relay + 1 WHERE gid IN (?) ", [gids], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "发布成功" });
        } else {
          res.send({ code: -1, msg: "failed" });
        }
      });
    }
  });



});



module.exports = router