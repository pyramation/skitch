commands to get you started

```
dropdb -U postgres -h localhost my-db
createdb -U postgres -h localhost my-db
PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch verify db:pg:my-db
PGUSER=postgres PGHOST=localhost sqitch revert db:pg:my-db
```

try it out! here's some examples

```
skitch template --template schema --schema users
skitch template --template table --schema users --table user
skitch template --template column --schema users --table user --column email --columntype text --columnnull 'NOT NULL'
skitch template --template column --schema users --table user --column password --columntype text --columnnull 'NOT NULL'

skitch template --template schema --schema projects
skitch template --template table --schema projects --table project
skitch template --template column --schema projects --table project --column name --columntype text --columnnull 'NOT NULL'
skitch template --template column --schema projects --table project --column owner_id --columntype uuid --columnnull 'NOT NULL'

skitch template \
  --template foreignKey \
  --schema projects \
  --table project \
  --refschema users \
  --reftable user \
  --column owner_id \
  --refcolumn id \
  --cascade 'ON DELETE CASCADE'
```

install v8 modules

```
skitch template --template schema --schema v8
skitch template --template table --schema v8 --table modules
skitch template --template column --schema v8 --table modules --column name --columntype text --columnnull 'NOT NULL'
skitch template --template column --schema v8 --table modules --column code --columntype text --columnnull 'NOT NULL'
// todo unique!
```
