const AWS = require('aws-sdk');

const SES = new AWS.SES();

const Responses = {
    _200 (data = {}){
        return {
            statusMessage: 'Correo enviado',
            statusCode: 200,
        }
    },
    _400 (data = {}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }

};

var email
 
exports.handler = async event => {
    console.log('event',event);
    
    email = event;

    const to = email.to;
    const from = email.from;
    const subject = email.subject;
    const text = email.text;
    const origen = email.origen;
    const destino = email.destino;
    const horaSalida = email.horaSalida;
    const fechaSalida = email.fechaSalida;
    const asientos = email.asientos;


    if(!to || !from || !subject || !text){
        return Responses._400({message: "to, from, subject and text son requeridos en el body"})
    }

    const params = {
        Destination: {
            ToAddresses: [ to ]
        },
        Message: {
            Body: {
                Text: { Data: text}
            },
            Subject: {Data: subject}
        },
        Source: from
    };

    try{
        await SES.sendEmail(params).promise()
        return Responses._200({});
    } catch (error ){
        console.log('error al mandar el correo ', error);
        return Responses._400({message: "The email failed to send"})
    }

}