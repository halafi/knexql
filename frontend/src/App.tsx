import React from "react";
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
  mutation createTodo($id: String!, $text: String, $completed: Boolean) {
    updateTodo(id: $id, text: $text, completed: $completed)
  }
`;
const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

function App() {
  const { loading, error, data } = useQuery(TODOS);
  const [createTodo, createTodoData] = useMutation(CREATE_TODO);
  const [updateTodo, updateTodoData] = useMutation(UPDATE_TODO);
  const [deleteTodo, deleteTodoData] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.todos);
  return (
    <div className="App">
      <header className="App-header">Minimalistic Todo App</header>
      <main>
        <ul>
          {data.todos.map((todo: any, i: number) => (
            <li key={`${todo.text}-${i}`}>
              [{todo.user.firstName} {todo.user.lastName}]: {todo.text}{" "}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  updateTodo({
                    variables: { id: todo.id, completed: !todo.completed },
                    update(cache, { data: { addTodo } }) {
                      const { todos }: any = cache.readQuery({ query: TODOS });
                      cache.writeQuery({
                        query: TODOS,
                        data: { todos: todos.concat(todos) },
                        // just fuck with cache for now, but yeah either api needs to return updated object + id or need to implement here what was changed
                      });
                    },
                  })
                }
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
