var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2"
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "GalleryLinks",
  KeySchema: [
    // Partition Key
    { AttributeName: "alt", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "src", KeyType: "RANGE"}  
  ],
  AttributeDefinitions: [
    { AttributeName: "alt", AttributeType: "S" },
    { AttributeName: "src", AttributeType: "S" },
    { AttributeName: "className", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "alt", KeyType: "HASH" },
        { AttributeName: "className", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error("Unable to create table: ", JSON.stringify(err, null, 2))
  else
    console.log("Created table with description: ", JSON.stringify(data, null, 2))
});