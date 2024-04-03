const AWS = require("aws-sdk");
const middy = require("@middy/core");
const bodyParser = require("@middy/http-json-body-parser");

const updateTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const { completed } = event.body;

  await dynamoDB
    .update({
      TableName: "TodoTable",
      Key: { id },
      UpdateExpression: "set completed = :completed",
      ExpressionAttributeValues: {
        ":completed": completed,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "This todo has been updated",
    }),
  };
};

module.exports = {
  handler: middy(updateTodo).use(bodyParser()),
};
