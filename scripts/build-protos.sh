#!/bin/bash

PROTO_DEST=./src/proto
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

mkdir -p ${PROTO_DEST}

protoc \
  --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
  --ts_out=${PROTO_DEST} \
  --proto_path=./proto \
  proto/*.proto
