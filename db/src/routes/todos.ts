import express from "express";
import apicache from "apicache";
import db from "../data/db";

const router = express.Router();

const cache = apicache.middleware("15 seconds");

router.post("/", (req, res) => {
  const { text, userId, completed } = req.body;
  if (
    !text ||
    !userId ||
    typeof text !== "string" ||
    typeof userId !== "number" ||
    (completed && typeof completed !== "boolean")
  ) {
    res.status(400).json({ error: "Invalid body" });
  } else {
    db("todo")
      .insert({ text, userId, completed })
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

router.get("/", cache, (_, res) => {
  db("todo")
    .select()
    .orderBy("id")
    .then((todos) => res.json(todos))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get("/:id", cache, (req, res) => {
  db("todo")
    .select()
    .where({ id: req.params.id })
    .then((data) => res.json(data[0]))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed, text } = req.body;
  if (!completed && !text) {
    res.status(400).json({ error: "Invalid body" });
  } else {
    db("todo")
      .update({ completed, text })
      .where({ id })
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("todo")
    .delete()
    .where({ id })
    .then((status) =>
      res.status(200).json(status ? "success" : "already deleted")
    )
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;
