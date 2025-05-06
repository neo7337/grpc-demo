package main

import (
	"context"
	"log"
	"net"

	pb "github.com/go-service/grpcgoexpress"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedGreetingServiceServer
}

func (s *server) GetData(ctx context.Context, req *pb.RequestMessage) (*pb.ResponseMessage, error) {
	// Implement your logic here
	log.Printf("Received: %s", req.Query)
	return &pb.ResponseMessage{Data: "Hello from Go server!"}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterGreetingServiceServer(s, &server{})
	log.Println("Server is running on port :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
