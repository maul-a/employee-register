FROM node:16-alpine as build

WORKDIR /app

RUN apk add --no-cache bash git openssh

COPY package.json ./
RUN npm install --silent --only=prod
COPY . ./
RUN npm run build && mv dist/ build/

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
