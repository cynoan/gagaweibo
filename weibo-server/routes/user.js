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
            res.send({ code: 1, msg: "登录成功", uid: result[0].uid });
        } else {
            res.send({ code: -1, msg: "登录失败" });
        }
    });
});

router.post("/reg", (req, res) => {
    var $new = req.body;
    $new.upwd = $new.upwd;

    pool.query("INSERT INTO user SET ?", [$new], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "注册成功" });
        } else {
            res.send({ code: -1, msg: "注册失败" });
        }
    });
});
router.get("/checkuname", (req, res) => {
    var $uname = req.query.uname;
    pool.query("SELECT uid FROM user WHERE uname=?", [$uname], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            res.send({ code: -1, msg: "用户名已存在" });
        } else {
            res.send({ code: 1, msg: "用户名可用" });
        }
    });
});

router.get("/getlist", (req, res) => {
    var $uid = req.query.uid;
    var list = [];
    var getMyFollow = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT followUid FROM follow WHERE uid=?", [$uid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    let uids = result.map((item, index) => {
                        return item.followUid
                    });
                    uids.push($uid);
                    // let uidStr = uids.join(" OR uid = ");
                    // resolve([uidStr, uids]);
                    resolve(uids);
                }
            });
        });
    };

    var getGagas = (uids) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM gagas WHERE uid IN (?) ORDER BY date DESC", [uids], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    list = result;

                    let originUids = [];
                    let originGids = [];
                    list.forEach((item, index) => {
                        if (item.isRelay == 1) {
                            originUids.push(item.originUid);
                            originGids.push(item.originGid);
                        }
                    });
                    // let uids = data[1];
                    uids = unique(uids.concat(originUids));
                    // let originGidStr = unique(originGids).join(" OR gid = ");
                    // let uidStr = uids.join(" OR uid = ");
                    resolve([uids, originGids]);
                }
            });
        });
    }

    var getUserInfos = (data) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT uid,nickname,avatar FROM user WHERE uid IN (?) ", [data[0]], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    list.forEach((item, index) => {
                        result.forEach((user, index) => {
                            if (item.uid == user.uid) {
                                item.nickname = user.nickname;
                                item.avatar = user.avatar;
                            }
                            if (item.originUid == user.uid) {
                                item.originAuthor = user.nickname;
                                item.originAvatar = user.avatar;
                            }
                        });
                    });
                    resolve(data[1]);
                }
            });
        });
    };

    var getOrigin = (originGids) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT uid,content,gid FROM gagas WHERE gid IN (?)", [originGids], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    list.forEach((item, index) => {
                        result.forEach((origin, index) => {
                            if (item.originGid == origin.gid) {
                                item.originContent = origin.content;

                            }
                        });
                    });
                    // console.log(list)
                    resolve();
                }
            });
        });
    }

    var getMyLikes = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT gid FROM likes WHERE uid = ? ", [$uid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    list.forEach((item, index) => {
                        for (let like of result) {
                            if (item.gid == like.gid) {
                                item.isLike = true;
                                break;
                            } else {
                                item.isLike = false;
                            }
                        }
                    });
                    res.send(list);
                }
            });
        });
    }

    getMyFollow()
        .then((data) => { return getGagas(data) })
        .then((data) => { return getUserInfos(data) })
        .then((data) => { return getOrigin(data) })
        .then(() => { return getMyLikes() });

});

router.post("/getmylist", (req, res) => {
    var $uid = req.body.uid;
    var $nickname = req.body.nickname;
    var $avatar = req.body.avatar;
    pool.query("SELECT * FROM gagas WHERE uid = ? ORDER BY date DESC", [$uid], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            let list = result;
            let originUids = [];
            let originGids = [];
            list.forEach((item, index) => {
                item.nickname = $nickname;
                item.avatar = $avatar;
                if (item.isRelay == 1) {
                    originUids.push(item.originUid);
                    originGids.push(item.originGid);
                }
            });

            if (originUids) {
                let uidStr = unique(originUids).join(" OR uid = ");
                pool.query("SELECT uid,nickname FROM user WHERE uid = " + uidStr, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (result.length > 0) {
                        list.forEach((item, index) => {
                            result.forEach((user, index) => {
                                if (item.originUid == user.uid) {
                                    item.originAuthor = user.nickname;
                                }
                            });
                        });
                    }
                });
            }
            let originGidStr = unique(originGids).join(" OR gid = ");

            pool.query("SELECT uid,content,gid FROM gagas WHERE gid=" + originGidStr, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    list.forEach((item, index) => {
                        result.forEach((origin, index) => {
                            if (item.originGid == origin.gid) {
                                item.originContent = origin.content;

                            }
                        });
                    });
                    res.send(list);
                } else {
                    res.send({ code: -1, msg: "no data" });
                }
            });
        } else {
            res.send({ code: -1, msg: "no data" });
        }
    });
});

router.get("/follow", (req, res) => {
    var $uid = req.query.uid;
    pool.query("SELECT followUid FROM follow WHERE uid=?", [$uid], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ code: -1, msg: "no data" });
        }
    });
});

router.get("/getinfos", (req, res) => {
    var $uid = req.query.uid;
    pool.query("SELECT nickname,phone,avatar,intro FROM user WHERE uid=?", [$uid], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {

            res.send(result);

        } else {
            res.send({ code: -1, msg: "no data" });
        }
    });
});

router.get("/getdetails", (req, res) => {
    var $gid = req.query.gid;
    var details = {};
    var getComms = () => {
        return new Promise((resolve, reject) => {
            // let start = new Date().getTime();
            pool.query("SELECT * FROM comms WHERE gid = ? ORDER BY date DESC", [$gid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    var comms = result;
                    let uids = [], cids = [];
                    result.forEach((item, index) => {
                        uids.push(item.uid);
                        cids.push(item.cid);
                    });

                    pool.query("SELECT * FROM comms WHERE ocid IN (?) ORDER BY date DESC", [cids], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (result.length > 0) {
                            let cincRes = result;
                            cincRes.forEach((item, index) => {
                                uids.push(item.uid);
                            });
                            uids = unique(uids);

                            pool.query("SELECT uid,nickname,avatar FROM user WHERE uid IN (?)", [uids], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (result.length > 0) {
                                    comms.forEach((item, index) => {
                                        for (let user of result) {
                                            if (item.uid == user.uid) {
                                                item.nickname = user.nickname;
                                                item.avatar = user.avatar;
                                                break;
                                            }
                                        }
                                        item.cincs = [];
                                        for (let cinc of cincRes) {
                                            for (let user of result) {
                                                if (cinc.uid == user.uid) {
                                                    cinc.nickname = user.nickname;
                                                    cinc.avatar = user.avatar;
                                                    break;
                                                }
                                            }
                                            if (cinc.ocid == item.cid) {
                                                item.cincs.push(cinc);
                                                continue;
                                            }
                                        }
                                    });
                                    // let finish = new Date().getTime();
                                    // console.log(finish - start);
                                    details.comms = comms;
                                    resolve();
                                }
                            });
                        } else {
                            pool.query("SELECT uid,nickname,avatar FROM user WHERE uid IN (?)", [uids], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (result.length > 0) {
                                    comms.forEach((item, index) => {
                                        for (let user of result) {
                                            if (item.uid == user.uid) {
                                                item.nickname = user.nickname;
                                                item.avatar = user.avatar;
                                                break;
                                            }
                                        }
                                    });
                                    details.comms = comms;
                                    resolve();
                                }
                            });
                        }
                    });
                } else {
                    details.comms = [];
                    resolve();
                }
            });
        });
    }

    var getRelays = () => {
        return new Promise((resolve, reject) => {
            let gid1 = $gid + ",";
            let gid2 = "," + $gid;
            let gid3 = "," + $gid + ",";
            pool.query("SELECT uid,date,content FROM gagas WHERE latestGid LIKE '" + gid1 + "%' OR latestGid LIKE '%" + gid2 + "' OR latestGid LIKE '%" + gid3 + "%' ORDER BY date DESC", (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    var relays = result;
                    let uids = result.map((item, index) => {
                        return item.uid;
                    });
                    let uidStr = unique(uids).join(" OR uid = ");
                    pool.query("SELECT uid,nickname,avatar FROM user WHERE uid = " + uidStr, (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (result.length > 0) {
                            relays.forEach((item, index) => {
                                result.forEach((user, index) => {
                                    if (item.uid == user.uid) {
                                        item.nickname = user.nickname;
                                        item.avatar = user.avatar;
                                    }
                                });
                            });
                            details.relays = relays;
                            resolve();
                        }
                    });
                } else {
                    details.relays = [];
                    resolve();
                }
            });
        });
    }

    var getLikes = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT uid,date FROM likes WHERE gid = ? ORDER BY date DESC", [$gid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    var likes = result;
                    let uids = result.map((item, index) => {
                        return item.uid;
                    });
                    let uidStr = unique(uids).join(" OR uid = ");
                    pool.query("SELECT uid,nickname,avatar,intro,fans FROM user WHERE uid = " + uidStr, (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (result.length > 0) {
                            likes.forEach((item, index) => {
                                result.forEach((user, index) => {
                                    if (item.uid == user.uid) {
                                        item.nickname = user.nickname;
                                        item.avatar = user.avatar;
                                        item.intro = user.intro;
                                        item.fans = user.fans;
                                    }
                                });
                            });
                            details.likes = likes;
                            resolve();
                        }
                    });
                } else {
                    details.likes = [];
                    resolve();
                }
            });
        });
    };

    getComms().then(getRelays).then(getLikes).then(() => {
        res.send(details);
    });
});
router.get("/getcomms", (req, res) => {
    var $gid = req.query.gid;
    pool.query("SELECT * FROM comms WHERE gid = ? ORDER BY date DESC", [$gid], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            var comms = result;
            let uids = [], cids = [];
            result.forEach((item, index) => {
                uids.push(item.uid);
                cids.push(item.cid);
            });

            pool.query("SELECT * FROM comms WHERE ocid IN (?) ORDER BY date DESC", [cids], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length > 0) {
                    let cincRes = result;
                    cincRes.forEach((item, index) => {
                        uids.push(item.uid);
                    });
                    uids = unique(uids);

                    pool.query("SELECT uid,nickname,avatar FROM user WHERE uid IN (?)", [uids], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (result.length > 0) {
                            comms.forEach((item, index) => {
                                for (let user of result) {
                                    if (item.uid == user.uid) {
                                        item.nickname = user.nickname;
                                        item.avatar = user.avatar;
                                        break;
                                    }
                                }
                                item.cincs = [];
                                for (let cinc of cincRes) {
                                    for (let user of result) {
                                        if (cinc.uid == user.uid) {
                                            cinc.nickname = user.nickname;
                                            cinc.avatar = user.avatar;
                                            break;
                                        }
                                    }
                                    if (cinc.ocid == item.cid) {
                                        item.cincs.push(cinc);
                                        continue;
                                    }
                                }
                            });
                            // let finish = new Date().getTime();
                            // console.log(finish - start);
                            res.send(comms);
                        }
                    });
                } else {
                    pool.query("SELECT uid,nickname,avatar FROM user WHERE uid IN (?)", [uids], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (result.length > 0) {
                            comms.forEach((item, index) => {
                                for (let user of result) {
                                    if (item.uid == user.uid) {
                                        item.nickname = user.nickname;
                                        item.avatar = user.avatar;
                                        break;
                                    }
                                }
                            });
                            res.send(comms);
                        }
                    });
                }
            });
        } else {
            res.send({ code: -1, msg: "no data" });
        }
    });
});

function unique(arr) {
    var newArr = [];
    for (var val of arr) {
        if (newArr.indexOf(val) == -1) {
            newArr.push(val)
        }
    }
    return newArr;
}


module.exports = router;