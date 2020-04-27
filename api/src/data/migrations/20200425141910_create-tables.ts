import * as Knex from "knex";

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("user", (table) => {
      table
        .uuid("id")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("email", 255).notNullable();
      table.string("firstName", 255).notNullable();
      table.string("lastName", 255).notNullable();
      table
        .timestamp("createdAt")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .timestamp("updatedAt")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    })
    .createTable("todo", (table) => {
      table
        .uuid("id")
        .notNullable()
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("userId")
        .notNullable()
        .references("id")
        .inTable("user")
        .onDelete("cascade");
      table.string("text", 255).notNullable();
      table.boolean("completed").notNullable().defaultTo(false);
      table
        .timestamp("createdAt")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
      table
        .timestamp("updatedAt")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema
    .dropTable("todo")
    .dropTable("user")
    .raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
