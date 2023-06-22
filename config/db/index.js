// const mongoose = require('mongoose');
const mssql = require('mssql/msnodesqlv8');
const mysql = require('mysql');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
        
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


        const MSSQLpool = new mssql.ConnectionPool({
            server: process.env.MSSQL_SERVER_NAME,
            database: process.env.MSSQL_DATABASE_NAME,
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            }
        });

        MSSQLpool.connect().then(() => {
            console.log('Connected to mssql database');
        }).catch((err) => {
            console.log('MSSQL Database Connection Failed! Bad Config: ', err);
        });

    


module.exports = { mysqlPool, MSSQLpool };