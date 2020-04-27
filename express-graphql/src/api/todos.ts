import { fetchResponseByURL } from "./utils";

export function getTodo(id: string): Promise<any> {
  return fetchResponseByURL(`/todos/${id}`);
}

export function getTodos(): Promise<any> {
  return fetchResponseByURL(`/todos`);
}

export function getUserTodos(id: string): Promise<any> {
  return fetchResponseByURL(`/users/${id}/todos`);
}
