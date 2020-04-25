import * as Knex from "knex";

export function seed(knex: Knex): Promise<any> {
  console.log(`[seed] ${__filename}`);
  return knex("user")
    .del()
    .then(function () {
      return knex("user").insert([
        { email: "john@doe.com", firstName: "John", lastName: "Doe" },
      ]);
    });
}
