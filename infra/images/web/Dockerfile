FROM node:latest

# Set the environment variables accordingly.
ENV PORT="3000"

# Mount the repository.
VOLUME ["/code"]
WORKDIR /code

# Expose port for HTTP.
EXPOSE 3000

# Start the web server.
CMD cd ./web \
 && npm install --no-bin-links \
 && npm start
