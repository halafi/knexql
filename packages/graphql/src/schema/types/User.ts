import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Todo from "./Todo";

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID), // converts number to string
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
    },
    todos: {
      type: GraphQLList(Todo),
      resolve: (user, _, ctx) => {
        console.log(user);
        return ctx.userTodosLoader.load(user.id);
      },
    },
  }),
});

export default User;
