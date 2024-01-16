var sqlMap = {
    user: {
        // phoneLogin: 'select '
        // add: 'insert into user(username,password) values (?,?)',
        // query: 'select * from user where username = ? && password = ?',
        pwdLogin: 'select * from user where username=? && password=?'
    },
    category: {
        queryAll: 'select * from category'
    },
    shop: {
        queryAll: 'select * from shop'
    }
}
module.exports = sqlMap