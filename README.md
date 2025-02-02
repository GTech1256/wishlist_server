## Первый запуск

SSL - https://app.zerossl.com/dashboard

Domain - https://www.noip.com/


### При деплое надо заново создать базу данных

```
2025-02-01 20:17:46.452 UTC [39] FATAL:  database "wishlist" does not exist

sudo docker exec -it postgres psql -U postgres
CREATE DATABASE wishlist;
\q
```



sudo docker exec -it gtech156/wishlist-ui:latest cat /var/log/nginx/error.log



npm i                                   
## npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree

npm i --legacy-peer-deps