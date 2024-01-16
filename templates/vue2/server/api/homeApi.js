const mysql = require('mysql')
const db = require('../db')
const sqlMap = require('../sqlMap')
const express = require('express')

const router = express.Router()

const conn = mysql.createConnection(db.mysql)
conn.connect()

router.post('/categorys', (req, res) => {
    // console.log('category-服务器')
    var sql = sqlMap.category.queryAll
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            const ret = JSON.parse(JSON.stringify(result))
            res.json(ret)
        }
    })
})

router.post('/shops', (req, res) => {
    var sql = sqlMap.shop.queryAll
    // var params = req.body
    conn.query(sql, function(err, result) {
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
