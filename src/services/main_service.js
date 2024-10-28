// Env Data
const API_URL_BASE = process.env.REACT_APP_API_URL_BASE;
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

export const getAllManufacturers  = async () => {
  try {
      const response = await fetch(`${API_URL_BASE}/api/manufacturers`, {
          method: 'GET',
          headers: {
              'x-authentication-token': `${AUTH_TOKEN}`,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
        console.log('Error fetching data on service');
      }

      // Return data
      const data = await response.json();
      return data;
  } catch (error) {
      console.log('Error fetching services:', error);
      throw error;
  }
};

export const getAllServices  = async () => {
  try {
      const response = await fetch(`${API_URL_BASE}/api/services`, {
          method: 'GET',
          headers: {
              'x-authentication-token': `${AUTH_TOKEN}`,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
        console.log('Error fetching data on service');
      }

      // Return data
      const data = await response.json();
      return data;
  } catch (error) {
      console.log('Error fetching services:', error);
      throw error;
  }
};