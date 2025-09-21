FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# CMD ["sleep", "infinity"]


# or "start" if building prod image

# FROM ubuntu:22.04

# WORKDIR /home

# COPY . .

# RUN apt update && apt install -y git \
#     npm \
#     python3 \
#     python3-pip

# RUN pip install exa-py cerebras-cloud-sdk

# CMD ["sleep", "infinity"]