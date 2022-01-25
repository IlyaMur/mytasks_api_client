# MyTasks API-client

**[🇬🇧 English readme](https://github.com/IlyaMur/mytasks_api_client/blob/master/README_en.md)**

## О Приложении  

**MyTasks API-client** - клиент API-приложения [MyTasks](https://github.com/ilyamur/mytasks_app).
Клиент демонстрирует работу API и функций его аутентификации/авторизации с использованием JWT.

Сам клиент написан на React с использованием библиотеки React-Bootstrap.  
Он предлагает взаимодействие с [MyTasks](https://github.com/ilyamur/mytasks_app) и поддерживает весь спектр его CRUD-операций по REST API и так же базовые валидации на фронтенде.


**[Live demo](https://ilyamur.github.io/mytasks_api_client/)**.

## Установка  

Необходимо склонировать репозиторий:

    $ git clone https://github.com/IlyaMur/mytasks_api_client

Для установки зависимостей и старта приложения:  

    $ npm install  
    $ npm start  

При необходимости URL сервера изменяется в [apiConfig.js](src/apiConfig.js).


## Использованные библиотеки

- React-bootstrap
- Axios
- Axios-Auth-Refresh
- JWT-decode
- Formik

Отдельно хочется выделить библиотеку `Axios Auth Refresh`, которая позволила удобно и бесшовно для пользователя регенерировать **Access Key** для JWT.
