const express = require('express');
const connDB = require('./config/db');
const cors = require('cors');

//Creamos el servidor
const app = express();

//Conectamos la base de datos
connDB();
app.use(cors());

app.use(express.json());

app.use('/api/productos', require('./routes/producto'));

app.listen(4000, () => {
    console.log('El servidor corre en el puerto 4000');
})