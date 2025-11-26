import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { error as _error, success } from '../utils/responses';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    
    // Validation
    if (!body.name || !body.description) {
      return _error('Name and description are required', 400);
    }

    const item = {
      itemId: uuidv4(),
      name: body.name,
      description: body.description,
      category: body.category || 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();

    return success({
      message: 'Item created successfully',
      item: item
    }, 201);

  } catch (error) {
    console.error('Error creating item:', error);
    return _error('Failed to create item');
  }
}
