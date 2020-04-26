import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import users from "./routes/users";
import todos from "./routes/todos";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/todos", todos);
app.use("/users", users);

app.listen(port, () => console.log(`[server] listening on port ${port}!`));
