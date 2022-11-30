FROM node:16 as builder
WORKDIR /build
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .
RUN npm run bundle

FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /build/dist/handler.js ./

CMD ["handler.handler"]
