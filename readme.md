# skitch

```sh
npm install -g skitch
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

## other features, less documented, or work in progress

* installing and bundling v8 modules
