// postgraphile --connection postgres://postgres:@localhost/dandb --schema users,projects


mutation addUser($input: CreateUserInput!) {
  createUser(input: $input) {
 		user {
 		  id
      email
      password
 		}
  }
}

{
	"input": {
    "user": {
      "id": "13331d10-7c0f-49d4-bcb7-bc43645299e1",
      "email": "d@nlynch.com",
      "password": "mypassword"
    }
  }
}

query getUsers {
  allUsers {
    nodes {
      id,
			email
    }
  }
}

mutation addProject ($input: CreateProjectInput!) {
  createProject(input:$input) {
    project {
      id
      name
			ownerId
    }
  }
}

{
	"input": {
    "project": {
      "name": "dansproject",
      "ownerId": "13331d10-7c0f-49d4-bcb7-bc43645299e1"
    }
  }
}

query getUsersAndProjects {
  allUsers {
    nodes {
      id,
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


query getUsersAndProjects {
  allUsers(condition:{
    email:"d@nlynch.com"
  }) {
    nodes {
      id,
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

```sql
CREATE FUNCTION projects.search_user_projects (search TEXT, user_id uuid)
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
  searchUserProjects(search:"dans", userId:"13331d10-7c0f-49d4-bcb7-bc43645299e1") {
    nodes {
      id,
			name
    }
  }
}
```
