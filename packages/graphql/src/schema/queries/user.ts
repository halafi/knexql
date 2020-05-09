import { GraphQLNonNull, GraphQLID } from "graphql";
import User from "../types/User";

type Args = {
  id: string;
};

const userQuery = {
  type: User,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: (_, args: Args, ctx) => ctx.userLoader.load(args.id),
};

export default userQuery;
