import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@vercel/remix";
import type { Weather } from "~/types/weather";

export const loader = async ({ params }: LoaderArgs) => {
  // Load environment variables
  const { API_URL, API_KEY } = process.env;

  // Get the "url" parameter
  const { url } = params;

  // Query the Weather API
  const res = await fetch(`${API_URL}/current.json?key=${API_KEY}&q=${url}`);
  const data: Weather = await res.json();

  return json({ data });
};

export default function City() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <main className="m-10">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
