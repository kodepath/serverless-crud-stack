const API_BASE_URL = 'https://ofjk1suj0b.execute-api.us-east-1.amazonaws.com/dev';

export default {
  ITEMS: {
    BASE: `${API_BASE_URL}/items`,
    BY_ID: (id) => `${API_BASE_URL}/items/${id}`,
  },
};
