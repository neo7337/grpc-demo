FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files first for better layer caching
COPY go.mod go.sum* ./
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Use a smaller base image for the final container
FROM alpine:latest

WORKDIR /app

# Install CA certificates for HTTPS
RUN apk --no-cache add ca-certificates

# Copy the binary from the builder stage
COPY --from=builder /app/main /app/

# Expose port 50051
EXPOSE 50051

# Run the application
CMD ["/app/main"]