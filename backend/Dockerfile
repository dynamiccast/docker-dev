FROM node:6.2.1-slim
MAINTAINER Olivier Berthonneau <berthonneau.olivier@gmail.com>

WORKDIR /opt

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /opt/

COPY ./ /opt/

EXPOSE 3000

CMD ["node", "index.js"]
