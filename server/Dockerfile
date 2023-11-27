FROM node:18

# Установите рабочую директорию внутри контейнера
WORKDIR /app

# Скопируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте все файлы проекта внутрь контейнера
COPY . .

# Установка env для staging
ENV NODE_ENV = development

# Соберите приложение Next.js для production
RUN npm run build

# # Определите порт, на котором будет работать приложение Next.js
# EXPOSE 3000

# Команда для запуска приложения Next.js
CMD ["npm", "start"]
