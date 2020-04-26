import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import dotenv from "dotenv";
import schema from "./schema";
import context from "./context";

if (process.env.NODE_ENV !== "production") {
  // development env variables
  dotenv.config({ path: __dirname + "/../dev.env" });
}

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: process.env.NODE_ENV !== "production",
    schema,
    context,
  })
);

app.listen(port, () =>
  console.log(
    `[graphql-server] ENV=${process.env.NODE_ENV} listening on port ${port}!`
  )
);
