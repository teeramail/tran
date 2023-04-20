// pages/api/getStoredData.js
import fs from 'fs/promises';

export default async (req, res) => {
  if (req.method === 'GET') {
    const data = await fs.readFile('store/data.json', 'utf-8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Method Not Allowed' }));
  }
};
