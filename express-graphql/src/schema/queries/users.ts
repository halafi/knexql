import { GraphQLList } from "graphql";
import User from "../types/User";

const usersQuery = {
  type: new GraphQLList(User),
  resolve: (_, args, ctx) => ctx.usersLoader.load(args), // args is {}
};

export default usersQuery;
