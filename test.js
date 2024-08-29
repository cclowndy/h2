const http = require('http');
const url = require('url');

// Define the port where the server will listen
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname and query parameters
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Only handle POST requests to the /callback endpoint
    if (req.method === 'POST' && pathname === '/callback') {
        let body = '';

        // Accumulate data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When all data is received, process it
        req.on('end', () => {
            try {
                // Parse the JSON body
                const data = JSON.parse(body);

                // Extract data from the request body
                const { tracker, tracker_name, app_name, activity_kind } = data;

                // Log the received data
                console.log('Received callback data:', data);

                // Send a JSON response confirming receipt of the data
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    message: 'Callback received successfully',
                    receivedData: {
                        tracker,
                        tracker_name,
                        app_name,
                        activity_kind
                    }
                }));
            } catch (err) {
                // Handle JSON parsing errors or other issues
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
        // Handle unsupported routes or methods
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});