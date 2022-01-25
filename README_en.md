# MyTasks API-client

**[🇷🇺 Russian readme](https://github.com/IlyaMur/mytasks_api_client/blob/master/README.md)**

## Overview  

**MyTasks API-client** - API client for the [MyTasks](https://github.com/ilyamur/mytasks_app) app.
The client demonstrates the API and its authentication/authorization functions using JWT.

**MyTasks API-client** itself is written in React using the React-Bootstrap library.  
It offers interaction with [MyTasks](https://github.com/ilyamur/mytasks_app) and supports the full range of CRUD operations over the REST API as well as basic front-end validations.

**[Live demo](https://ilyamur.github.io/mytasks_api_client/)**

## Install  

You need to clone the repository:

    $ git clone https://github.com/IlyaMur/mytasks_api_client

To install dependencies and start the application:

    $ npm install  
    $ npm start  

The server URL is changed in [apiConfig.js](src/apiConfig.js).

## Used libraries

- React-bootstrap
- Axios
- Axios-Auth-Refresh
- JWT-decode
- Formik

 I would like to highlight the `Axios Auth Refresh` library, which made it possible to conveniently and seamlessly regenerate the JWT for the user.