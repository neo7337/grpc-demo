# gRPC Microservices Demo

This repository demonstrates how to build microservices using gRPC for communication between a Go backend service and a Node.js/Express frontend service.

## Architecture Overview

```
                                     ┌─────────────────┐
                                     │                 │
                                     │   Client/User   │
                                     │                 │
                                     └────────┬────────┘
                                              │
                                              │ HTTP
                                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌────────────────────────────┐           ┌────────────────────────────┐    │
│  │                            │           │                            │    │
│  │     Express.js Service     │   gRPC    │        Go Service          │    │
│  │     (Node.js, port 3000)   ◄──────────►    (Golang, port 50051)     │    │
│  │                            │           │                            │    │
│  └────────────────────────────┘           └────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                          Docker Compose Network
```

## Communication Flow

1. **Client Request**: External clients send HTTP requests to the Express.js service on port 3000
2. **gRPC Client Call**: The Express service acts as a gRPC client, serializing the request using Protocol Buffers
3. **Service Communication**: The Express service communicates with the Go service via gRPC on port 50051
4. **Processing**: The Go service processes the request and returns a gRPC response
5. **HTTP Response**: The Express service deserializes the gRPC response and returns an HTTP response to the client

## Project Structure

- **proto/**: Contains Protocol Buffer definitions (.proto files) that define the service interface
- **go-service/**: Go implementation of the gRPC server
  - **grpcgoexpress/**: Auto-generated gRPC code for Go
  - **api/**: API handlers and business logic
  - **models/**: Data models
- **express-service/**: Node.js/Express implementation of the gRPC client
  - **src/generated/**: Auto-generated gRPC code for Node.js
  - **src/controllers/**: Express controllers
  - **src/routes/**: Express route definitions
- **docker-compose.yml**: Docker Compose configuration for running both services

## Setup and Installation

### Prerequisites

- Docker and Docker Compose
- Go 1.18+ (for local development)
- Node.js 16+ (for local development)
- Protocol Buffers compiler (protoc)

### Running with Docker Compose

1. Build and start the services:

   ```bash
   docker-compose up -d
   ```

2. Check if the services are running:

   ```bash
   docker-compose ps
   ```

3. Test the API:

   ```bash
   curl "http://localhost:3000/data?query=hello"
   ```

### Local Development Setup

#### Go Service

1. Install dependencies:

   ```bash
   cd go-service
   go mod tidy
   ```

2. Run the service:

   ```bash
   go run main.go
   ```

#### Express Service

1. Install dependencies:

   ```bash
   cd express-service
   npm install
   ```

2. Run the service:

   ```bash
   npm start
   ```

### Regenerating gRPC Code

#### For Go

```bash
protoc --go_out=. --go-grpc_out=. proto/service.proto
```

#### For Node.js

```bash
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./express-service/src/generated \
  --grpc_out=grpc_js:./express-service/src/generated \
  --proto_path=./proto \
  ./proto/service.proto
```

## API Endpoints

### Express Service (HTTP)

- `GET /data?query=<your_query>`
  - Returns data from the Go service via gRPC
  - Example: `curl "http://localhost:3000/data?query=hello"`

## gRPC Service Definition

The service is defined in `proto/service.proto`:

```protobuf
service GreetingService {
  rpc GetData (RequestMessage) returns (ResponseMessage);
}

message RequestMessage {
  string query = 1;
}

message ResponseMessage {
  string data = 1;
}
```

## Technical Choices

1. **gRPC**: Used for efficient, typed communication between microservices
2. **Protocol Buffers**: Service contract definition and efficient serialization
3. **Docker & Docker Compose**: Containerization and orchestration
4. **Go**: High-performance backend service implementation
5. **Express.js**: Flexible frontend service exposing HTTP endpoints

## Benefits of This Architecture

- **Strong Typing**: Compile-time type checking for service contracts
- **Performance**: Efficient binary serialization and HTTP/2
- **Language Agnostic**: Services implemented in different languages
- **Scalability**: Services can be scaled independently
- **Developer Experience**: Auto-generated client/server code

## Potential Extensions

1. **Authentication**: Add JWT or other authentication mechanisms
2. **Service Discovery**: Integrate with Consul or etcd
3. **Streaming**: Implement streaming APIs for real-time data
4. **Monitoring**: Add Prometheus metrics and Grafana dashboards
5. **CI/CD**: Set up automated testing and deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see LICENSE for details.
