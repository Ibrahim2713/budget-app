import axios from 'axios';

export const fetchDataByCategory = async (category, token) => {
  try {
    const response = await axios(`http://localhost:8000/api/${category}`, {
      headers: {
        authorization: token,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


  