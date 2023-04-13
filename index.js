const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://127.0.0.1:27017/api_database',
    {
        useNewUrlParser: true,
    }
);

// habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// habilitar cors
app.use(cors());


app.use('/', routes());

// Para que se puedan ver las imagenes
app.use(express.static('uploads'));


app.listen(5000, function() {
    console.log('¡Servidor web Express en ejecucion!');
});