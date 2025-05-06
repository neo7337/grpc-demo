// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var service_pb = require('./service_pb.js');

function serialize_grpcgoexpress_RequestMessage(arg) {
  if (!(arg instanceof service_pb.RequestMessage)) {
    throw new Error('Expected argument of type grpcgoexpress.RequestMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpcgoexpress_RequestMessage(buffer_arg) {
  return service_pb.RequestMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpcgoexpress_ResponseMessage(arg) {
  if (!(arg instanceof service_pb.ResponseMessage)) {
    throw new Error('Expected argument of type grpcgoexpress.ResponseMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpcgoexpress_ResponseMessage(buffer_arg) {
  return service_pb.ResponseMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var GreetingServiceService = exports.GreetingServiceService = {
  // Sends a greeting
getData: {
    path: '/grpcgoexpress.GreetingService/GetData',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.RequestMessage,
    responseType: service_pb.ResponseMessage,
    requestSerialize: serialize_grpcgoexpress_RequestMessage,
    requestDeserialize: deserialize_grpcgoexpress_RequestMessage,
    responseSerialize: serialize_grpcgoexpress_ResponseMessage,
    responseDeserialize: deserialize_grpcgoexpress_ResponseMessage,
  },
};

exports.GreetingServiceClient = grpc.makeGenericClientConstructor(GreetingServiceService, 'GreetingService');
