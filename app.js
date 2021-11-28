var port = process.env.PORT || 3000
    http = require('http')
    const express = require('express');
    const cors = require('cors');
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.static(__dirname+'/AWSHTML'))
    app.use('/infopago',express.static(__dirname+'/AWSHTML/infopago'))
    app.use('/masinfo',express.static(__dirname+'/AWSHTML/masinfo'))
    app.use('/confpago',express.static(__dirname+'/AWSHTML/confpago'))
    app.use('/Gracias',express.static(__dirname+'/AWSHTML/Gracias'))


// Put a bad ass message on the terminal
app.listen(port,() =>console.log(`Corriendo en el puerto ${port}`))
