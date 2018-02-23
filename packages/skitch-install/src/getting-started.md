## getting started

Here's a quick example using skitch and postgraphile

```
skitch generate --template schema --schema users
skitch generate --template table --schema users --table user
skitch generate --template column --schema users --table user --column email --columntype text --columnnull 'NOT NULL'
skitch generate --template column --schema users --table user --column password --columntype text --columnnull 'NOT NULL'

skitch generate --template schema --schema projects
skitch generate --template table --schema projects --table project
skitch generate --template column --schema projects --table project --column name --columntype text --columnnull 'NOT NULL'
skitch generate --template column --schema projects --table project --column owner_id --columntype uuid --columnnull 'NOT NULL'

skitch generate \
  --template foreignKey \
  --schema projects \
  --table project \
  --refschema users \
  --reftable user \
  --column owner_id \
  --refcolumn id \
  --cascade 'ON DELETE CASCADE'
```

## deploy the database

```sh
skitch createdb
skitch deploy
```

## start `postgraphile`

```sh
postgraphile --connection postgres://postgres:@localhost/mydb --schema users,projects
```

## users

#### mutation

```gql
mutation addUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      email
      password
    }
  }
}
```

#### mutation variables

```gql
{
	"input": {
    "user": {
      "id": "13331d10-7c0f-49d4-bcb7-bc43645299e1",
      "email": "d@nlynch.com",
      "password": "mypassword"
    }
  }
}
```

#### query

```gql
query getUsers {
  allUsers {
    nodes {
      id
      email
    }
  }
}
```

#### mutation to add a project

```gql
mutation addProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      id
      name
      ownerId
    }
  }
}
```

#### mutation variables

```json
{
  "input": {
    "project": {
      "name": "dansproject",
      "ownerId": "13331d10-7c0f-49d4-bcb7-bc43645299e1"
    }
  }
}
```

#### nested query

```gql
query getUsersAndProjects {
  allUsers {
    nodes {
      id
      email
      projectsByOwnerId {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
```

## direct matches

```gql
query getUsersAndProjects {
  allUsers(condition: { email: "d@nlynch.com" }) {
    nodes {
      id
      email
      projectsByOwnerId {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
```

## search

Search is not yet native to `postgraphile`, so you need to create functions

```sh
skitch generate --template procedure --schema projects --procedure search_user_projects
```

```sql
CREATE FUNCTION projects.search_user_projects (search text, user_id uuid)
    RETURNS SETOF projects.project
AS $$
SELECT
    project.*
FROM
    projects.project AS project
WHERE
    project.name ILIKE ('%' || search || '%')
    AND project.owner_id = user_id;
$$
LANGUAGE 'sql' STABLE;
```

```gql
query getUsersAndProjects {
  searchUserProjects(
    search: "dans"
    userId: "13331d10-7c0f-49d4-bcb7-bc43645299e1"
  ) {
    nodes {
      id
      name
    }
  }
}
```

```gql
query searchUsersAndProjects {
  allUsers(condition: { email: "d@nlynch.com" }) {
    nodes {
      id
      email
      projectsByOwnerId {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
}
```
