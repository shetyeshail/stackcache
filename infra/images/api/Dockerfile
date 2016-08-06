FROM node:latest

RUN npm install -g nodemon

# Set the environment variables accordingly.
ENV PORT="3000"

# Mount the repository.
VOLUME ["/code"]
WORKDIR /code

# Expose port for HTTP.
EXPOSE 3000

# Start the api.
CMD cd api && npm install && nodemon index.js
