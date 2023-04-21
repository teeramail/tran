// server-middleware/postRequestHandler.js

const querystring = require('querystring');

module.exports = function (req, res, next) {
  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    req.body = querystring.parse(body) || {};
    res.end(JSON.stringify(req.body)); // Send the entire req.body to the client
  });
};
