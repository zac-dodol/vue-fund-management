export async function searchFund(query) {
  const apiKey =
    "48e0b3ac9fb2662ed8a752a69fc3599115d7aa6b0a702153bdb74bfe2e7b524b";
  const params = new URLSearchParams({
    engine: "google_finance",
    q: query,
    api_key: apiKey,
  });

  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data from SerpAPI");
  }
}
