import fetch from "node-fetch";

export function fetchResponseByURL(relativeURL): Promise<any> {
  console.log(`${process.env.API_URL}${relativeURL}`);
  return fetch(`${process.env.API_URL}${relativeURL}`).then((res) =>
    res.json()
  );
}
