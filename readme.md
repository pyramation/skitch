# skitch

```sh
npm install -g skitch
```

Install sqitch

https://github.com/sqitchers/homebrew-sqitch

Then install the Template library from http://www.tt2.org/

```sh
sudo cpan Template
```
Create PostgreSQL sql code quickly and in a streamlined, versioned workflow.

`skitch` is a wrapper around `sqitch` to enable a sane workflow for sane database management.

## what's different

* interactive shell
* naming conventions
* utility functions to create verify/revert functions for most types
* bundled with templates for most common things:

```
column
foreignKey
grantExecute
grantSchema
grantTable
index
peoplestamps
policy
procedure
schema
table
timestamps
trigger
type
uniqueIndex
utility
```

## bundle an npm module

You can install an npm module and then bundle it for `plv8`

```sh
yarn add my-awesome-npm-module
skitch bundle my-awesome-npm-module awesomeThing
```

## Install some existing packages

```sh
skitch install @pyramation/skitch-inflection
skitch install @pyramation/skitch-ajv
```
