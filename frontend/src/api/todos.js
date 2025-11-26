import axios from 'axios';
import config from './config';

export const getTodos = async () => {
  try {
    const response = await axios.get(config.ITEMS.BASE);
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await axios.post(config.ITEMS.BASE, todo);
    return response.data.item;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(config.ITEMS.BY_ID(id), updatedTodo);
    return response.data.item;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(config.ITEMS.BY_ID(id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
