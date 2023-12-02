export const searchFund = async (query) => {
  try {
    if (query.length > 3) {
      const apiKey =
        "48e0b3ac9fb2662ed8a752a69fc3599115d7aa6b0a702153bdb74bfe2e7b524b";
      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_finance&q=${query}&api_key=${apiKey}`
      );

      // for exact result
      // const response = await fetch(
      //   `https://serpapi.com/search.json?engine=google_finance&q=${query}:KLSE&api_key=${apiKey}`
      // );
      const data = await response.json();
      console.log(data);

      if (data.futures_chain) {
        console.log("dfc");
        return data.futures_chain;
      } else if (data.summary) {
        console.log("ds");
        return data.summary;
      } else {
        console.log("de");
        throw new Error("Invalid response from SerpAPI");
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Sorry, something went wrong, please try again.");
  }
};
