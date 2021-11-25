const functions = require("firebase-functions");
const admin = require('firebase-admin')
const express = require('express')

const app = express()
admin.initializeApp({
    credential: admin.credential.cert('./permissions.json'),
    databaseURL: "https://bolariz-default-rtdb.firebaseio.com"
})

const db = admin.firestore()

/*
app.get('/hello', (req, res) => {
    return res.status(200).json({message: 'Kiubo'})
})
*/

// Recibir id y sugerencia para guardar en firestone
app.post('/api/sugerencias', async (req,res)=>{
    try {
        await db.collection('sugerencias')
        .doc('/' + req.body.id + '/')
        .create({sugerencia: req.body.sugerencia})
        return res.status(204).json();
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

// Pasar codigo de firebase para poderlo ejecutar
exports.app = functions.https.onRequest(app);

