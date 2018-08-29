##Server 

###Install
First, you need to create database for ChessGame:
```sh
psql
CREATE DATABASE chess;
```

Second, for start you need to run comman:
```sh
npm run server
```



###Authorization
For authorization needs to add to headers:
`Authorization: Bearer ${token}`



###API
You need to add `/api/v1` to route.

For route `/user`:

Route   | Params                                        | Return
--------|-----------------------------------------------|------------------------
/signup | email, username, password, repeat_password    | token
/signin | email, password                               | username, token


Example: `/api/v1/user/signin` with params email and password.


