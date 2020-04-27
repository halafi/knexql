import DataLoader from "dataloader";
import * as usersApi from "../api/users";
import * as todosApi from "../api/todos";
import type { Todo } from "../records/Todo";
import type { User } from "../records/User";

type Context = {
  userLoader: DataLoader<string, User>; // or ReturnType<typeof userLoader>
  todoLoader: DataLoader<string, Todo>;
  usersLoader: DataLoader<string, User[]>;
  todosLoader: DataLoader<string, Todo[]>;
  userTodosLoader: DataLoader<string, Todo[]>;
};

const context: Context = {
  userLoader: new DataLoader<string, User>((ids) =>
    Promise.all(ids.map((id: string) => usersApi.getUser(id)))
  ),
  todoLoader: new DataLoader<string, Todo>((ids) =>
    Promise.all(ids.map((id: string) => todosApi.getTodo(id)))
  ),
  usersLoader: new DataLoader((ids) => Promise.all(ids.map(usersApi.getUsers))),
  todosLoader: new DataLoader((ids) => Promise.all(ids.map(todosApi.getTodos))),
  userTodosLoader: new DataLoader((ids) =>
    Promise.all(ids.map(todosApi.getUserTodos))
  ),
};

export default context;
