import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { error as _error, success } from '../utils/responses.js';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const { id } = event.pathParameters;
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    // Check if item exists
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    });

    const existingItem = await docClient.send(getCommand);

    if (!existingItem.Item) {
      return _error('Item not found', 404);
    }

    const updatedItem = {
      ...existingItem.Item,
      ...body,
      updatedAt: new Date().toISOString()
    };

    const putCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: updatedItem
    });

    await docClient.send(putCommand);

    return success({
      message: 'Item updated successfully',
      item: updatedItem
    });

  } catch (error) {
    console.error('Error updating item:', error);
    return _error('Failed to update item');
  }
}
