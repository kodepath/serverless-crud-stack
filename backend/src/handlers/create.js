import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { error as _error, success } from '../utils/responses.js';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    
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

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    });

    await docClient.send(command);

    return success({
      message: 'Item created successfully',
      item: item
    }, 201);

  } catch (error) {
    console.error('Error creating item:', error);
    return _error(error.message || 'Internal server error');
  }
}
