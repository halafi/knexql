import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import fetch from "node-fetch";
import Todo from "./types/Todo";
import User from "./types/User";

type Args = {
  id: string;
};

function fetchResponseByURL(relativeURL): Promise<any> {
  return fetch(`${process.env.API_URL}${relativeURL}`).then((res) => res.json());
}

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root of all queries",
  fields: {
    todos: {
      type: new GraphQLList(Todo),
      resolve: () => fetchResponseByURL("/todos"),
    },
    users: {
      type: new GraphQLList(User),
      resolve: () => fetchResponseByURL("/users"),
    },
    todo: {
      type: Todo,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (parentValue, args: Args, req) =>
        fetchResponseByURL(`/todos/${args.id}`),
    },
    user: {
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (parentValue, args: Args, req) =>
        fetchResponseByURL(`/users/${args.id}`),
    },
  },
});

// const mutationType = new GraphQLObjectType({
//   name: "Mutation",
//   fields: () => ({
//     addRecord: record.addRecordMutation,
//     updateUser: user.updateUserMutation,
//   }),
// });

const schema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: mutationType,
});

export default schema;
