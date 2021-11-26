/*
const mongoose = require('mongoose');*/
const mongo = require('../dbconnect');
const dbconfig = require('../dbsetup');
const quejasSchema = require('../schema/quejas')

const sendToMongoDB = async () => {
    var nameValue = document.getElementById("inputSugerencia").value;
    await mongo().then(async (mongoose) => {
        try {
            //console.log('Connected to mongodb')

            const history = {
                queja: (nameValue.value)
            }

            console.log(nameValue.value)
            await new quejasSchema(history).save()
        } finally {
            mongoose.connection.close()
        }
    })
}
sendToMongoDB()
