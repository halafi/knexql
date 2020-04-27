import { GraphQLObjectType } from "graphql";
import todosQuery from "./todos";
import usersQuery from "./users";
import todoQuery from "./todo";
import userQuery from "./user";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root of all queries",
  fields: {
    todos: todosQuery,
    users: usersQuery,
    todo: todoQuery,
    user: userQuery,
  },
});

export default rootQuery;
