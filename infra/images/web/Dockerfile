FROM node:latest

# Set the environment variables accordingly.
ENV PORT="3000"

# Mount the repository.
VOLUME ["/go/src/github.com/skeswa/gauntlet"]
WORKDIR /go/src/github.com/skeswa/gauntlet

# Expose port for HTTP.
EXPOSE 3000

# Start the web server.
CMD cd ./web \
 && npm install \
 && npm start
