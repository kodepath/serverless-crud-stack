import { DynamoDB } from 'aws-sdk';
import { error as _error, success } from '../utils/responses';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function handler(event) {
  try {
    const { id } = event.pathParameters;

    // Check if item exists
    const existingItem = await dynamodb.get({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    }).promise();

    if (!existingItem.Item) {
      return _error('Item not found', 404);
    }

    await dynamodb.delete({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    }).promise();

    return success({
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting item:', error);
    return _error('Failed to delete item');
  }
}
