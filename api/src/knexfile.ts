import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  // development env variables
  dotenv.config({ path: __dirname + "/../dev.env" });
}

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
    debug: true, // Enable Query Debugging
  },
  staging: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
