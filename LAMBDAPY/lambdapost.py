import json
import boto3
from botocore.exceptions import ClientError
dynamodb = boto3.resource('dynamodb')
dynamodb_client = boto3.client('dynamodb', region_name="us-east-2")
tabla = dynamodb.Table('BOLARIZ')

def lambda_handler(event, context):
    try:
        response = dynamodb_client.get_item(
            TableName="BOLARIZ",
            Key={
                'Email': {'S': 'edgargajo5@gmail.com'}
            }
        )
        return response['Item']
    except ClientError as e:
        print(e.response['Error']['Message'])