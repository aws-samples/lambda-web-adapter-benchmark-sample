FROM node:16 as builder
WORKDIR /build
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .
RUN npm run bundle

FROM node:16

# Web Adapter Extensionの追加
# https://github.com/awslabs/aws-lambda-web-adapter#lambda-functions-packaged-as-docker-images-or-oci-images
# PORTはExpressアプリのポート番号
# READINESS_CHECK_PATHはExpressのヘルスチェックエンドポイントのパス
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.4.0 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=8080
ENV READINESS_CHECK_PATH=/health

WORKDIR /app
COPY --from=builder /build/dist/main.js ./

EXPOSE 8080
CMD ["node", "main.js"]
