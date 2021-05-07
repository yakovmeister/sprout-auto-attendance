const resources = {
  "Resources": {
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
