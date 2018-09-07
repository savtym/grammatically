##Server 

###Install
First, you need to install [postgres](https://www.postgresql.org/download/) or using brew
```sh
brew update
brew doctor
brew install postgresql
```

and create database for Grammatically:

```sh
psql
CREATE DATABASE grammatically;
```

Also you should have `nodejs` with `npm`

Second, start migrations for database:
```sh
npm run db:up
```

Third, for start you need to run command:
```sh
npm run server
```


###Pulling a new version
Refresh migrations:
```sh
npm run db:refresh
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
/signin | email, password                               | username, token, role


Example: `/api/v1/user/signin` with params `email` and `password`.


