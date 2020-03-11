require('dotenv').config();


const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY:', e.query)
    }
});
const option = {
    host: process.env['DB_HOST'],
    database: process.env['DB_NAME']
};
const db = pgp(option);

module.exports = db;