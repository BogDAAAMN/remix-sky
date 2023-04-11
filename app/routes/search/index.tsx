import { json } from "@vercel/remix";

import type { LoaderArgs } from "@vercel/remix";
import type { City } from "~/types/weather";

export const loader = async ({ request }: LoaderArgs) => {
  // Load environment variables
  const { API_URL, API_KEY } = process.env;

  // Get the "city" query search parameter
  const url = new URL(request.url);
  const query = url.searchParams.get("city");

  // Query the Weather API
  const res = await fetch(`${API_URL}/search.json?key=${API_KEY}&q=${query}`);
  const data: Array<City> = await res.json();

  console.log("Searching for", query);

  return json(
    data.map((city) => {
      return {
        name: city.name,
        country: city.country,
        url: city.url,
      };
    })
  );
};
