## Server 

### Install
You need to install docker
Install Docker Compose on your system.
After, you start these command in bash: 
```sh
docker-compose up --build 
```
So you can see backend by port `localhost:5000`

### Pulling a new version
Refresh migrations:
```sh
docker-compose down
docker-compose up --build 
```



### Authorization
For authorization needs to add to headers:
`Authorization: Bearer ${token}`



### API
You need to add `/api/v1` to route.

For route `/user`:

Route   | Params                                               | Return
--------|------------------------------------------------------|------------------------
/signup | email, username, password, repeat_password, role?    | token, role
/signin | email(username), password                            | email, username, token, role


Example: `/api/v1/user/signin` with params `email` and `password`.


