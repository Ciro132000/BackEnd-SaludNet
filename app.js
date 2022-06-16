require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnectMySql } = require('./config/db')
const app = express();

/************* */
app.use(cors());
app.use(express.json());

app.use("/storage",express.static('storage'));

const port = process.env.PORT || 300;

// RUTAS

app.use("/api", require('./routes'));

app.listen(port, () =>{
    console.log('Servidor corriendo en el puerto '+port)
})

dbConnectMySql();