const mongo = require('./AWSHTML/dbconnect');
const dbconfig = require('./AWSHTML/dbsetup');
const quejasSchema = require('./AWSHTML/schema/quejas')

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

// Subir basura para comprobar post de datos:
//module.exports = (client, message, queue, track) => 
/*
const sendToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            //console.log('Connected to mongodb')

            const history = {
                queja: "buuuu quejado"
            }

            console.log('Queja mandada')
            await new quejasSchema(history).save()
        } finally {
            mongoose.connection.close()
        }
    })
}
sendToMongoDB()
*/