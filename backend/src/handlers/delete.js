import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { error as _error, success } from '../utils/responses.js';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const { id } = event.pathParameters;

    // Check if item exists
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    });

    const existingItem = await docClient.send(getCommand);

    if (!existingItem.Item) {
      return _error('Item not found', 404);
    }

    const deleteCommand = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    });

    await docClient.send(deleteCommand);

    return success({
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting item:', error);
    return _error(error.message || 'Internal server error');
  }
}
