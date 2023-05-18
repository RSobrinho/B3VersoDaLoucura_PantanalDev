# Base Image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy local code to the container working directory
COPY . .

# Rebuild bcrypt in the correct environment
RUN npm rebuild bcrypt --update-binary

# Build the application
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# Start the application
CMD ["npm", "start"]