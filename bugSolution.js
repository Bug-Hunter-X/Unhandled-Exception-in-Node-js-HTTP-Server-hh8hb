const http = require('http');

const requestListener = (request, response) => {
  try {
    // Attempt to parse incoming request data (e.g., JSON)
    const body = [];
    request.on('data', chunk => {
      body.push(chunk);
    });

    request.on('end', () => {
      try {
        const parsedBody = JSON.parse(Buffer.concat(body).toString());
        response.writeHead(200);
        response.end(JSON.stringify({ message: 'Request processed successfully', data: parsedBody }));
      } catch (parseError) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Invalid request data' }));
      }
    });
  } catch (error) {
    console.error('Error handling request:', error);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Internal server error' }));
  }
};

const server = http.createServer(requestListener);

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});