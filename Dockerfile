FROM node:20 AS front_builder

ARG VITE_COMMIT_HASH=undefined
RUN export VITE_COMMIT_HASH=$VITE_COMMIT_HASH

WORKDIR /app
COPY . ./
RUN npm config set update-notifier false
RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine as runtime

ENV TZ="Europe/Moscow"
ENV LANG=ru_RU.UTF-8
ENV LANGUAGE=ru_RU:ru
ENV LC_ALL=ru_RU.UTF-8
RUN date

COPY --from=front_builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=front_builder /app/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
