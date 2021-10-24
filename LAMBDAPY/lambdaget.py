#import asyncio
import boto3
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context)
    tabla = dynamodb.Table('BOLARIZ')

    input = {
        "Name" : "Edgar Gajo",
        "Email" : "edgargajo@gmail.com",
        "Address" : "Av. LÃ³pez Mateos 4470",
        "Telephone" : "33 16 83 77 52",
        "CreditCard" : "4556 4221 5025 4995",
        "From" : "Guadalajara",
        "To" : "Cancun",
        "Hour" : "07:00",
        "Date" : "18/JUN/2022",
        "Seats": {
            "D,22","E,22"
        }
    }

    response = tabla.put_item(Item=input)

    return response