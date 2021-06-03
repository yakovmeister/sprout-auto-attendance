const resources = {
  "Resources": {
    "GatewayResponseDefault4XX": {
      "Type": "AWS::ApiGateway::GatewayResponse",
      "Properties": {
        "ResponseParameters": {
          "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
          "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
        },
        "ResponseType": "DEFAULT_4XX",
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        }
      }
    },
    "autoschedTable": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "TableName": "nananaTable",
        "AttributeDefinitions": [
          {
            "AttributeName": "date",
            "AttributeType": "N"
          },
          {
            "AttributeName": "type",
            "AttributeType": "S"
          }
        ],
        "KeySchema": [
          {
            "AttributeName": "type",
            "KeyType": "HASH"
          },
          {
            "AttributeName": "date",
            "KeyType": "RANGE"
          }
        ],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": 1,
          "WriteCapacityUnits": 1
        }
      }
    }
  }
}

export default resources;
