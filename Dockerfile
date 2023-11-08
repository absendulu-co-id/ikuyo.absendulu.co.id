# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /react-app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Check the contents of the directory at that point during the Docker build.
RUN ls -la /react-app/src/app/components/molecules

# Build the React application
RUN npm run build

# Expose port 8000 for the NGINX server
EXPOSE 8000

# Start NGINX when the container starts
CMD ["npm", "run", "dev"]
