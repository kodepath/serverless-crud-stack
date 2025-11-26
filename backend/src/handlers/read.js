import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { success, error as _error } from '../utils/responses.js';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function getAllItems() {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME
    });

    const result = await docClient.send(command);

    return success({
      items: result.Items || []
    });
  } catch (error) {
    console.error('Error getting items:', error);
    return _error(error.message || 'Internal server error');
  }
}

export async function getItem(event) {
  try {
    const { id } = event.pathParameters;

    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    });

    const result = await docClient.send(command);

    if (!result.Item) {
      return _error('Item not found', 404);
    }

    return success({
      item: result.Item
    });
  } catch (error) {
    console.error('Error getting item:', error);
    return _error(error.message || 'Internal server error');
  }
}
