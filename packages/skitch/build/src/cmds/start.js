"use strict";
// postgraphile --connection postgres://postgres:@localhost/dandb --schema users,projects
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
mutation;
addUser($input, CreateUserInput);
{
    createUser(input, $input);
    {
        user;
        {
            id;
            email;
            password;
        }
    }
}
{
    "input";
    {
        "user";
        {
            "id";
            "13331d10-7c0f-49d4-bcb7-bc43645299e1",
                "email";
            "d@nlynch.com",
                "password";
            "mypassword";
        }
    }
}
query;
getUsers;
{
    allUsers;
    {
        nodes;
        {
            id,
                email;
        }
    }
}
mutation;
addProject($input, CreateProjectInput);
{
    createProject(input, $input);
    {
        project;
        {
            id;
            name;
            ownerId;
        }
    }
}
{
    "input";
    {
        "project";
        {
            "name";
            "dansproject",
                "ownerId";
            "13331d10-7c0f-49d4-bcb7-bc43645299e1";
        }
    }
}
query;
getUsersAndProjects;
{
    allUsers;
    {
        nodes;
        {
            id,
                email;
            projectsByOwnerId;
            {
                edges;
                {
                    node;
                    {
                        id;
                        name;
                    }
                }
            }
        }
    }
}
query;
getUsersAndProjects;
{
    allUsers(condition, {
        email: "d@nlynch.com"
    });
    {
        nodes;
        {
            id,
                email;
            projectsByOwnerId;
            {
                edges;
                {
                    node;
                    {
                        id;
                        name;
                    }
                }
            }
        }
    }
}
""(__makeTemplateObject(["sql\nCREATE FUNCTION projects.search_user_projects (search TEXT, user_id uuid)\n    RETURNS SETOF projects.project\nAS $$\nSELECT\n    project.*\nFROM\n    projects.project AS project\nWHERE\n    project.name ILIKE ('%' || search || '%')\n    AND project.owner_id = user_id;\n$$\nLANGUAGE 'sql' STABLE;\n"], ["sql\nCREATE FUNCTION projects.search_user_projects (search TEXT, user_id uuid)\n    RETURNS SETOF projects.project\nAS $$\nSELECT\n    project.*\nFROM\n    projects.project AS project\nWHERE\n    project.name ILIKE ('%' || search || '%')\n    AND project.owner_id = user_id;\n$$\nLANGUAGE 'sql' STABLE;\n"]))(__makeTemplateObject([""], [""]))(__makeTemplateObject([""], [""]))(__makeTemplateObject(["gql\nquery getUsersAndProjects {\n  searchUserProjects(search:\"dans\", userId:\"13331d10-7c0f-49d4-bcb7-bc43645299e1\") {\n    nodes {\n      id,\n\t\t\tname\n    }\n  }\n}\n"], ["gql\nquery getUsersAndProjects {\n  searchUserProjects(search:\"dans\", userId:\"13331d10-7c0f-49d4-bcb7-bc43645299e1\") {\n    nodes {\n      id,\n\t\t\tname\n    }\n  }\n}\n"]))(__makeTemplateObject([""], [""]));
//# sourceMappingURL=start.js.map