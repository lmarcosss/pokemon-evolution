FROM node:22.15.0

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["yarn", "start"]
