import { GraphQLSchema } from "graphql";
import rootQuery from "./queries";

// const mutationType = new GraphQLObjectType({
//   name: "Mutation",
//   fields: () => ({
//     addRecord: record.addRecordMutation,
//     updateUser: user.updateUserMutation,
//   }),
// });

const schema = new GraphQLSchema({
  query: rootQuery,
  // mutation: mutationType,
});

export default schema;
