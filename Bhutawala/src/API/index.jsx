import axios from 'axios';


const BASE_URL = 'http://192.168.43.252:9000/api/';

export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Create POST method
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${endpoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
