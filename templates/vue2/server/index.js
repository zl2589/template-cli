const express = require('express')
const bodyParser = require('body-parser')

const homeApi = require('./api/homeApi')
const userApi = require('./api/userApi')

const app = express()

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')//设置允许跨域的域名
    res.header('Access-Control-Allow-Headers', 'Content-type')//允许的header类型
    res.header('Access-Control-Allow-Methods', "DELETE,PUT,POST,GET,OPTIONS")//跨域允许的请求方式 
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端路由
app.use('/api/home', homeApi)
app.use('/api/user', userApi)

app.listen(3000)
console.log('success listen at port:3000......')

