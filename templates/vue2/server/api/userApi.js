const mysql = require('mysql')
const db = require('../db')
const sqlMap = require('../sqlMap')
const express = require('express')

const router = express.Router()

const conn = mysql.createConnection(db.mysql)
conn.connect()

router.post('/login', (req, res) => {
    var sql = sqlMap.user.pwdLogin
    var params = req.body
    conn.query(sql, [params.username, params.password],function(err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            const ret = JSON.parse(JSON.stringify(result))
            res.json(ret)
        }
    })
})

module.exports = router