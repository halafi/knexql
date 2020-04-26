import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const Todo = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
    },
    userId: {
      type: GraphQLNonNull(GraphQLID),
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

export default Todo;
