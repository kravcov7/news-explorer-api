# Backend дипломного проекта NewsExplorer

## Доступ
+ IP адрес: 84.201.157.58
+ https://www.news-card.site/
+ http://www.news-card.site/

## Стек
+ ES6
+ npm
+ JavaScript
+ Node.js
+ Express
+ Eslint
+ Mongoose
+ MongoDB
+ Nodemon
+ Git

## Функциональность
Сервер обрабатывает запросы
POST /signup (создание пользователя)
POST /signin (вход в систему), а также запросы с токеном к следующим страницам:

GET /users/me (возвращает информацию о пользователе),
GET /articles (возвращает все сохраненные пользователем статьи),
POST /articles (создаёт статью),
DELETE /articles/:articleId (удаляет статью, при условии что она принадлежит пользователю)

## Инструкция по запуску
1. Установить `Node.js`
2. Клонировать репозиторий `https://github.com/kravcov7/news-explorer-api.git`
3. Установить зависимости `npm i`
4. `npm run start` запускает сервер на `localhost:3000`
5. `npm run dev` запускает сервер на `localhost:3000` с хот релоудом



}
