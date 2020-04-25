import express from "express";
import morgan from "morgan";
import db from "./data/db";

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("tiny"));

app.get("/todo", async (req, res) => {
  const todos = await db("todo");
  res.json({ todos });
});

app.get("/user", async (req, res) => {
  const users = await db("user");
  res.json({ users });
});

app.listen(port, () => console.log(`[server] listening on port ${port}!`));
