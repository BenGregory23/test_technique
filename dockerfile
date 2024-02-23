FROM oven/bun:latest
WORKDIR /home/bun/app
COPY ./package.json .
RUN bun install
COPY . .

ARG PORT
EXPOSE ${PORT:-8080}

CMD [ "bun", "run", "index.ts" ]