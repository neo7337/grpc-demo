const grpc = require('@grpc/grpc-js');
const express = require('express');
const path = require('path');

// Load the pre-generated gRPC code
const protoServices = require('./generated/service_grpc_pb');
const protoMessages = require('./generated/service_pb');

// Use environment variable for gRPC server address or fallback to localhost for development
const grpcServerAddress = process.env.GRPC_SERVER || 'localhost:50051';
console.log(`Connecting to gRPC server at: ${grpcServerAddress}`);

// Create a gRPC client
const client = new protoServices.GreetingServiceClient(
    grpcServerAddress,
    grpc.credentials.createInsecure()
);

// Create an Express application
const app = express();

app.get('/data', (req, res) => {
    const query = req.query.query || 'default query';
    
    // Create a request message using the generated code
    const request = new protoMessages.RequestMessage();
    request.setQuery(query);
    
    client.getData(request, (err, response) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send(err);
        }
        res.send({
            data: response.getData()
        });
    });
});

app.listen(3000, () => {
    console.log('Express server running on http://localhost:3000');
});