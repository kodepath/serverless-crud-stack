import { DynamoDB } from 'aws-sdk';
import { success, error as _error } from '../utils/responses';

const dynamodb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_TABLE;

export async function getAllItems(event) {
  try {
    const result = await dynamodb.scan({
      TableName: TABLE_NAME
    }).promise();

    return success({
      items: result.Items,
      count: result.Count
    });

  } catch (error) {
    console.error('Error fetching items:', error);
    return _error('Failed to fetch items');
  }
}

export async function getItem(event) {
  try {
    const { id } = event.pathParameters;

    const result = await dynamodb.get({
      TableName: TABLE_NAME,
      Key: { itemId: id }
    }).promise();

    if (!result.Item) {
      return _error('Item not found', 404);
    }

    return success({
      item: result.Item
    });

  } catch (error) {
    console.error('Error fetching item:', error);
    return _error('Failed to fetch item');
  }
}
