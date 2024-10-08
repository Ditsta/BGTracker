#!/bin/bash

# Update the repository
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

# Restart Nginx to ensure new files are served
sudo systemctl restart nginx

echo "Deployment completed successfully!"