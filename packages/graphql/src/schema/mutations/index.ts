import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import * as todosApi from "../../api/todos";

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of all mutations",
  fields: () => ({
    createTodo: {
      type: GraphQLString, // better to return newly created object
      args: {
        text: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLBoolean },
      },
      resolve: async (_, args) => {
        const res = await todosApi.createTodo({
          text: args.text,
          userId: args.userId,
          completed: args.completed,
        });
        return res.status === 200 ? "ok" : "error";
      },
    },
    updateTodo: {
      type: GraphQLString, // better to return updated object
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        text: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      resolve: async (_, args) => {
        const res = await todosApi.updateTodo(args.id, {
          text: args.text,
          completed: args.completed,
        });
        return res.status === 200 ? "ok" : "error";
      },
    },
    deleteTodo: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const res = await todosApi.deleteTodo(args.id);
        return res.status === 200 ? "ok" : "error";
      },
    },
  }),
});

export default rootMutation;
