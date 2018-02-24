### commands to get you started

```
dropdb -U postgres -h localhost my-db
createdb -U postgres -h localhost my-db
PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch verify db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch revert db:pg:my-db
```

### install v8 modules

```
skitch generate --template schema --schema v8
skitch generate --template table --schema v8 --table modules
skitch generate --template column --schema v8 --table modules --column name --columntype text --columnnull 'NOT NULL'
skitch generate --template column --schema v8 --table modules --column code --columntype text --columnnull 'NOT NULL'
// todo unique!
```

### search, filters, etc

you can use `require.resolve('postgraphile-plugin-connection-filter')` to get the path

```sh
npm init .
yarn add postgraphile-plugin-connection-filter
postgraphile --append-plugins `pwd`/node_modules/postgraphile-plugin-connection-filter/index.js --connection postgres://postgres:@localhost/cyrus --schema projects,users
```

### now you can search!

```sh
query getUsersAndProjects {
	allUsers (filter:{email: {containsInsensitive:"nlynch"}}) {
    nodes {
      email
    }
  }
}
```
