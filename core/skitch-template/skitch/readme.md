# getting started

# start the postgres db process

First you'll want to create the postgres-plv8 docker (you can also just use `docker-compose up -d`):

```sh
make up
```

# install modules

If you can, do `skitch install`, otherwise:

```sh
yarn install
```

# install the Postgres extensions

Now that the postgres process is running, install the extensions:

```sh
make install
```

This basically `ssh`s into the postgres instance with the `packages/` folder mounted as a volume, and installs the bundled sql code as pgxn extensions.

# now you can deploy code

Now you can use `CREATE EXTENSION` in your sql projects!
