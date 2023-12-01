<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a fund"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-color-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />

      <p class="py-2" v-if="searchError">
        Sorry, something went wrong, please try again. Please type more than 3
        characters.
      </p>

      <ul
        v-if="serpApiSearchResults"
        class="absolute bg-color-secondary text-white w-full shadow-md py-2 px-1"
      >
        <p
          class="py-2"
          v-if="!searchError && serpApiSearchResults.bestMatches.length === 0"
        >
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li
            v-for="searchResult in serpApiSearchResults.bestMatches"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewFund(searchResult)"
          >
            {{ searchResult["2. name"] }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <!-- Display search results here if needed -->
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const serpApiSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = async () => {
  try {
    if (searchQuery.value.length > 3) {
      console.log("run");
      // check api
      const apiKey =
        "48e0b3ac9fb2662ed8a752a69fc3599115d7aa6b0a702153bdb74bfe2e7b524b";
      const response = await fetch(
        `https://serpapi.com/search.json?engine=google_finance&q=${searchQuery.value}:KLSE&api_key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.summary);

      // items in the object if got result
      // .discover_more
      // .financials
      // .graph
      // .knowledge_graph
      // .markets
      // .news_result
      // .search_metadata
      // .search_parameters
      // .summary

      // DONT WANT THIS
      // items in the object if no result
      // .discover_more
      // .futures_chain
      // .markets
      // .search_metadata
      // .search_parameters

      if (data.summary) {
        serpApiSearchResults.value = data.summary;
      } else {
        throw new Error("Invalid response from SerpAPI");
      }
    } else {
      serpApiSearchResults.value = null;
    }
  } catch (error) {
    console.error(error);
    searchError.value = "Sorry, something went wrong, please try again.";
  }
};

const previewFund = (searchResult) => {
  // Implement preview logic if needed
  console.log("Previewing fund:", searchResult["2. name"]);
};
</script>
