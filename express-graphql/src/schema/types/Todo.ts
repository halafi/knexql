import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import User from "./User";

const Todo = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
    },
    user: {
      type: GraphQLNonNull(User),
      resolve: (todo, _, ctx) => ctx.userLoader.load(todo.userId),
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
