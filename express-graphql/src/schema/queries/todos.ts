import { GraphQLList } from "graphql";
import Todo from "../types/Todo";

const todosQuery = {
  type: new GraphQLList(Todo),
  resolve: (_, args, ctx) => ctx.todosLoader.load(args), // args is {}
};

export default todosQuery;
