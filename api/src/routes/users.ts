import express from "express";
import apicache from "apicache";
import db from "../data/db";

const router = express.Router();

const cache = apicache.middleware("15 seconds");

router.get("/", cache, (_, res) => {
  db("user")
    .select()
    .orderBy("id")
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get("/:id", cache, (req, res) => {
  db("user")
    .select()
    .where({ id: req.params.id })
    .then((data) => res.json(data[0]))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get("/:userId/todos", cache, (req, res) => {
  const { userId } = req.params;
  db("todo")
    .select()
    .where({ userId })
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;
