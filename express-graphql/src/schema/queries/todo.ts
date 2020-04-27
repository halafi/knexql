import { GraphQLNonNull, GraphQLID } from "graphql";
import Todo from "../types/Todo";

type Args = {
  id: string;
};

const todoQuery = {
  type: Todo,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, args: Args, ctx) => ctx.todoLoader.load(args.id),
};

export default todoQuery;
