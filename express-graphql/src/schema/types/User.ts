import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

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
    // todos: {
     // TODO lol
    // }
  }),
});

export default User;
