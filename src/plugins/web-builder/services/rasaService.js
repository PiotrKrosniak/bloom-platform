const axios = require('axios');

const RASA_URL = process.env.STRAPI_ADMIN_RASA_URL;

module.exports = {
  async sendMessage(message) {
    try {
      const response = await axios.post(`${RASA_URL}/webhooks/rest/webhook`, {
        sender: 'user',
        message: message,
      });
      return response.data;
    } catch (error) {
      console.error('Error communicating with Rasa:', error);
      throw error;
    }
  },
};
