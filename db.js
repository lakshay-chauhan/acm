const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Lakshay@1234', 
    database: 'currency_exchange'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL Connected!');
});

module.exports = db;
