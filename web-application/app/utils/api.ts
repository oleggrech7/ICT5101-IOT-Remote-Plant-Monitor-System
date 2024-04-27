export const GET = (url: string) => {
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};
