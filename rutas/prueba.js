;
const express = require('express')
let api = express.Router(),
    pruebaControl = require('../controles/prueba')

api.get('/get', pruebaControl.getDatos),
    api.post('/post', pruebaControl.postDatos),
    api.put('/put', pruebaControl.updateDatos),
    api.post('/delete', pruebaControl.deleteDatos),
    api.get('/routebyid', pruebaControl.getDatosbyID)

module.exports = api