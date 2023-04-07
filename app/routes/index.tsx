import { Form, useFetcher } from "@remix-run/react";

export default function Index() {
  // Setup fetcher to query /search API route
  const searchCityFetcher = useFetcher();

  return (
    <div>
      <Form>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => {
            // Get the value from the input
            const input = e.target.value;

            // Call the /search API route with the value
            searchCityFetcher.load(`/search?city=${input}`);
          }}
        />
      </Form>
    </div>
  );
}
