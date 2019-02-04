FROM ubuntu
RUN apt-get update
RUN apt-get install -y redis-server
ADD redis.conf redis.conf
EXPOSE 6379
VOLUME data
WORKDIR data
CMD ["redis-server", "/redis.conf"]