import * as Knex from "knex";

export function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
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
      table.increments("id").primary();
      table
        .integer("userId")
        .unsigned()
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
  return knex.schema.dropTable("todo").dropTable("user");
}
