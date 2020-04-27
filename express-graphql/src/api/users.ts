import { fetchResponseByURL } from "./utils";

export function getUser(id: string): Promise<any> {
  return fetchResponseByURL(`/users/${id}`);
}

export function getUsers(): Promise<any> {
  return fetchResponseByURL(`/users`);
}
