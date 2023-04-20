// pages/api/receiveAndStoreData.js
import fs from 'fs/promises';

export default async (req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', async () => {
      console.log('Received data:', data);
      const parsedData = JSON.parse(data);

      await fs.writeFile('store/data.json', JSON.stringify(parsedData));

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'success' }));
    });
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Method Not Allowed' }));
  }
};
