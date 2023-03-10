// const mongoose = require('mongoose');
const mssql = require('mssql/msnodesqlv8');

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
            console.log('Connected to database');
        }).catch((err) => {
            console.log('Database Connection Failed! Bad Config: ', err);
        });
    } catch (error) {
        console.log('Connect failure!!!');
    }

}

module.exports = { connect };