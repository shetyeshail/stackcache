FROM golang:alpine

# Install sparkplug.
RUN set -ex && apk add --update 'git'
RUN go get github.com/skeswa/sparkplug

# Set the environment variables accordingly.
ENV PORT="3000"
ENV GAUNTLET_ENV="dev"
ENV GAUNTLET_MIGRATIONS_PATH="/go/src/github.com/skeswa/gauntlet/db/migrations"

# Mount the repository.
VOLUME ["/go/src/github.com/skeswa/gauntlet"]
WORKDIR /go/src/github.com/skeswa/gauntlet

# Expose port for HTTP.
EXPOSE 3000

# Start the api.
CMD cd ./api \
 && go get -d -v \
 && sparkplug
