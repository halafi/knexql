import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

const TODOS = gql`
  {
    todos {
      id
      text
      completed
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($text: String!, $userId: String!, $completed: Boolean) {
    createTodo(text: $text, userId: $userId, completed: $completed)
  }
`;
const UPDATE_TODO = gql`
  mutation updateTodo($id: String!, $text: String, $completed: Boolean) {
    updateTodo(id: $id, text: $text, completed: $completed)
  }
`;
const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

function App() {
  const [value, setValue] = useState("");
  const { loading, error, data } = useQuery(TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  return (
    <div>
      <header className="navbar">
        Minimalistic Todo App (unfinished, lot of todos left)
      </header>
      <main className="center">
        <div className="todos">
          <ul>
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {!loading && !error && (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createTodo({
                      variables: {
                        text: value,
                        userId:
                          data?.todos[0]?.user?.id ||
                          "74faf0ad-8a0b-47fb-9973-b4099baf4aaa", // don't do this at home
                      },
                      update(cache, gqlresponse) {
                        const { todos }: any = cache.readQuery({
                          query: TODOS,
                        });
                        // TODO: fix GQL API so it returns the newly created Todo
                        cache.writeQuery({
                          query: TODOS,
                          data: {
                            todos: todos.concat([
                              {
                                id: "will-break-if-referenced",
                                text: value,
                                completed: false,
                                user: {
                                  ...data.todos[0].user,
                                },
                                __typename: "Todo",
                              },
                            ]),
                          },
                        });
                      },
                    });
                    setValue("");
                  }}
                >
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button type="submit">create</button>
                </form>
                {data.todos.map((todo: any, i: number) => (
                  <li
                    key={`${todo.text}-${i}`}
                    className={todo.completed ? "completed" : ""}
                  >
                    <span
                      role="img"
                      aria-label="remove"
                      className="spanbutton"
                      onClick={() =>
                        deleteTodo({
                          variables: {
                            id: todo.id,
                          },
                          update(cache) {
                            const { todos }: any = cache.readQuery({
                              query: TODOS,
                            });
                            // TODO: fix GQL API so it returns the removed Todo id
                            cache.writeQuery({
                              query: TODOS,
                              data: {
                                todos: todos.filter(
                                  (t: any) => t.id !== todo.id
                                ),
                              },
                            });
                          },
                        })
                      }
                    >
                      ❌
                    </span>
                    [{todo.user.firstName} {todo.user.lastName}]: {todo.text}{" "}
                    (id: ${todo.id}){" "}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        updateTodo({
                          variables: {
                            id: todo.id,
                            completed: !todo.completed,
                          },
                          // TODO: fix GQL API so it returns the newly updated Todo
                          update(cache) {
                            const { todos }: any = cache.readQuery({
                              query: TODOS,
                            });
                            // TODO: fix GQL API so it returns the removed Todo id
                            cache.writeQuery({
                              query: TODOS,
                              data: {
                                todos: todos.map((t: any) =>
                                  t.id === todo.id
                                    ? { ...todo, completed: !todo.completed }
                                    : t
                                ),
                              },
                            });
                          },
                        })
                      }
                    />
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
