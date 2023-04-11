import { Form, Link, useFetcher } from "@remix-run/react";

import type { City } from "~/types/weather";

export default function Index() {
  // Setup fetcher to query /search API route
  const searchCityFetcher = useFetcher<Array<City>>();

  return (
    <main className="m-10">
      <Form>
        <label htmlFor="city">City </label>
        <input
          type="text"
          name="city"
          id="city"
          className="border border-gray-300 rounded-md"
          onChange={(e) => {
            // Get the value from the input
            const input = e.target.value;

            if (input) {
              // Call the /search API route with the value
              searchCityFetcher.load(`/search?city=${input}`);
            }
          }}
        />
      </Form>
      {searchCityFetcher.data ? (
        <ul>
          {searchCityFetcher.data.map((city) => (
            <li key={city.url}>
              <Link to={`/city/${city.url}`}>
                {city.name}, {city.country} ➡️
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {searchCityFetcher.data ? (
        <pre>{JSON.stringify(searchCityFetcher.data, null, 2)}</pre>
      ) : null}
    </main>
  );
}
