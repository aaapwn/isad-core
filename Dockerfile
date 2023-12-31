FROM node:18
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm db:generate
RUN pnpm run build
EXPOSE 3000
CMD pnpm run start
