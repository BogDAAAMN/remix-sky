import { json } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  // Get the "city" query search parameter
  const url = new URL(request.url);
  const query = url.searchParams.get("city");

  // Search the languages, you can go look at `app/langs.ts` to see what it's
  // doing, but this part will obviously be different for your app.
  console.log("Searching for", query);

  return json({
    data: { city: query },
    headers: { "Cache-Control": "max-age=60" },
  });
};
