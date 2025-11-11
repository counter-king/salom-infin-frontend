FROM node:20-bullseye-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 build-essential ca-certificates git && rm -rf /var/lib/apt/lists/*
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml* ./
#COPY .yarn/ .yarn/
RUN corepack prepare yarn@4.10.3 --activate && yarn install --immutable
COPY . .
RUN yarn build

FROM nginx:1.27-alpine AS runtime
RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -fsS http://localhost/ || exit 1
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

