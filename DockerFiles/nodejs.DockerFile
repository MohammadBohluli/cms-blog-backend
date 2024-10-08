FROM node:20.17.0-slim

RUN mkdir -p /app/cms-blog-backend/node_modules && chown -R node:node /app/cms-blog-backend

WORKDIR /app/cms-blog-backend

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]