import type { APIRoute } from "astro";

export const GET: APIRoute = async function ({ params, request }) {
  return new Response(
    JSON.stringify({
      name: "Pikachu (from playground)",
      types: "electric",
    }),
  );
};
