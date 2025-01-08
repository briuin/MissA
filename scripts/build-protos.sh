#!/bin/bash

PROTO_DEST=./src/proto

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"


mkdir -p ${PROTO_DEST}

protoc  --proto_path=./proto \
        -I./ \
        --js_out=import_style=commonjs:${PROTO_DEST}  \
        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${PROTO_DEST} \
        proto/*.proto


#protoc  --proto_path=./proto \
#        -I./ \
#        --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. \
#        proto/*.proto
