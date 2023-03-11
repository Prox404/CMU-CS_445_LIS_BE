// const mongoose = require('mongoose');
const mssql = require('mssql/msnodesqlv8');
const mysql = require('mysql');

async function connect() {
    try {
        const pool = new mssql.ConnectionPool({
            server: process.env.MSSQL_SERVER_NAME,
            database: process.env.MSSQL_DATABASE_NAME,
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            }
        });
        await pool.connect().then(() => {
            console.log('Connected to mssql database');
        }).catch((err) => {
            console.log('MSSQL Database Connection Failed! Bad Config: ', err);
        });

        const mysqlPool = mysql.createConnection({
            host: process.env.MYSQL_SERVER_NAME,
            user: process.env.MYSQL_USER_NAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE_NAME
        });

        mysqlPool.connect(function (err) {
            if (err) {
                console.log('Mysql Database Connection Failed! Bad Config: ', err);
            } else {
                console.log('Connected to mysql database');
            }
        });
    } catch (error) {
        console.log('Connect failure!!!');
    }

}

module.exports = { connect };