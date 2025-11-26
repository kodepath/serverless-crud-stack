import { DynamoDB } from 'aws-sdk';
import { error as _error, success } from '../utils/responses';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    // Check if item exists
    const existingItem = await dynamodb.get({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    }).promise();

    if (!existingItem.Item) {
      return _error('Item not found', 404);
    }

    const updateExpression = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (body.name) {
      updateExpression.push('#name = :name');
      expressionAttributeNames['#name'] = 'name';
      expressionAttributeValues[':name'] = body.name;
    }

    if (body.description) {
      updateExpression.push('#description = :description');
      expressionAttributeNames['#description'] = 'description';
      expressionAttributeValues[':description'] = body.description;
    }

    if (body.category) {
      updateExpression.push('#category = :category');
      expressionAttributeNames['#category'] = 'category';
      expressionAttributeValues[':category'] = body.category;
    }

    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const params = {
      TableName: TABLE_NAME,
      Key: { itemId: id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamodb.update(params).promise();

    return success({
      message: 'Item updated successfully',
      item: result.Attributes
    });

  } catch (error) {
    console.error('Error updating item:', error);
    return _error('Failed to update item');
  }
}
