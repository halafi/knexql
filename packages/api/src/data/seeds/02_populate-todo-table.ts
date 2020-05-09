import * as Knex from "knex";

export function seed(knex: Knex): Promise<any> {
  console.log(`[seed] ${__filename}`);
  // TODO: Todo type
  return knex("todo")
    .del()
    .then(function () {
      return (
        knex("user")
          .where({ email: "john@doe.com" })
          .first()
          // TODO: User type
          .then((user: any) => {
            return knex("todo").insert([
              { userId: user.id, text: "Create API" },
              { userId: user.id, text: "Create GraphQL layer" },
              { userId: user.id, text: "Create Frontend" },
            ]);
          })
      );
    });
}
