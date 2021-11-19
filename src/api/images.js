import { BASE_URL, API_KEY, per_page } from './constants';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

export const getImages = async (query, page) => {
  const params = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;
  const { data } = await axios.get(params);

  return data;
};
