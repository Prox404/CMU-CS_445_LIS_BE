const express = require('express')
const morgan = require('morgan')

const app = express()
const route = require('./routes/')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.text());
app.use(morgan('combined'));

var cors = require('cors')
const dotenv = require('dotenv');

// get config vars
dotenv.config();


const port = process.env.PORT || 3000



// const db = require('./config/db');
// // Connect to DB
// db.connectMySQL();
// db.connectMSSQL();


const corsOptions = {
  origin: "*",
  credentials: true, // Access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes init
route(app);


app.listen(port || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`)
})

app.listen(8800, function () {
  console.log('CORS-enabled web server listening on port 8000')
})