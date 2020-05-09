import fetch from "node-fetch";
import { fetchResponseByURL } from "./utils";

export function createTodo(payload: {
  text: string;
  completed?: boolean;
  userId: string;
}): Promise<any> {
  return fetch(`${process.env.API_URL}/todos`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTodo(
  id: string,
  payload: {
    text?: string;
    completed?: boolean;
  }
): Promise<any> {
  return fetch(`${process.env.API_URL}/todos/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteTodo(id: string): Promise<any> {
  return fetch(`${process.env.API_URL}/todos/${id}`, {
    method: "DELETE",
  });
}

export function getTodo(id: string): Promise<any> {
  return fetchResponseByURL(`/todos/${id}`);
}

export function getTodos(): Promise<any> {
  return fetchResponseByURL(`/todos`);
}

export function getUserTodos(id: string): Promise<any> {
  return fetchResponseByURL(`/users/${id}/todos`);
}
