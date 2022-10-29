import axios from 'axios';

export const fetch = async () => {
  const url = `https://cdn.cur.su/api/nbu.json`;
  const response = await axios.get(url);
  return response.data;
};
