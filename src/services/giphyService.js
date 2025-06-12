import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

const giphyApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingGifs = async (offset = 0, limit = 20)=> {
  const response = await giphyApi.get('/trending', {
    params: {
      limit,
      offset,
      rating: 'g',
    },
  });
  return response.data;
};

export const searchGifs = async (query, offset = 0, limit = 20)=> {
  const response = await giphyApi.get('/search', {
    params: {
      q: query,
      limit,
      offset,
      rating: 'g',
      lang: 'en',
    },
  });
  return response.data;
}; 