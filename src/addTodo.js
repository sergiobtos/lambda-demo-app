const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  console.log("Id: " + id);

  const todoObject = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  await dynamoDB
    .put({
      TableName: "TodoTable",
      Item: todoObject,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(todoObject),
  };
};

module.exports = {
  handler: addTodo,
};
