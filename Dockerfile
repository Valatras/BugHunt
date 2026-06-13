# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="false"
ENV NODE_ENV="development"
ENV EXPO_NO_TELEMETRY="1"

RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app

FROM base AS app

COPY . .
RUN pnpm install --frozen-lockfile

FROM app AS web

EXPOSE 3001
CMD ["pnpm", "--filter", "web", "dev"]

FROM app AS mobile

EXPOSE 8081
CMD ["pnpm", "run", "dev:native"]
