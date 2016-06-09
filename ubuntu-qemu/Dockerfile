FROM debian:8.4
MAINTAINER Olivier Berthonneau <berthonneau.olivier@gmail.com>

RUN apt-get update && \
    apt-get install -y qemu-system-x86

COPY ./run-ubuntu.sh /usr/local/bin/run_ubuntu

CMD ["run_ubuntu"]
