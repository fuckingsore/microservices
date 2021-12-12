#!/bin/bash

docker build -t consumer -f Dockerfile consumer/.
docker build -t producer -f Dockerfile producer/.
docker build -t consumer-postgres -f Dockerfile consumer-postgres/.
