const mysql = require('mysql2');
const db_connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'sosmed_todo_list'
});

module.exports = db_connection;