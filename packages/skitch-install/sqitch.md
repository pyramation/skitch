commands to get you started

```
dropdb -U postgres -h localhost my-db
createdb -U postgres -h localhost my-db
PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch verify db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch revert db:pg:my-db
```
