FROM node:8.4-alpine

ADD . .
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

ENV PARSE_URL http://192.168.65.1:1337/parse
ENTRYPOINT [ "node", "lib/index.js" ]
