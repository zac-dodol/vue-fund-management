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
        <p class="py-2" v-if="!searchError && serpApiSearchResults.value">
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li
            v-for="searchResult in serpApiSearchResults"
            :key="searchResult"
            class="py-2 cursor-pointer"
            @click="previewFund(searchResult)"
          >
            {{ searchResult.date }} : {{ searchResult.stock }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <FundList />
        <template #fallback>
          <FundCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { searchFund } from "@/services/apiService";
import { useRouter } from "vue-router";
import FundCardSkeleton from "../components/FundCardSkeleton.vue";
import FundList from "../components/FundList.vue";

const searchQuery = ref("");
const serpApiSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = async () => {
  try {
    serpApiSearchResults.value = await searchFund(searchQuery.value);
  } catch (error) {
    searchError.value = error.message;
  }
};

// page routing
const router = useRouter();
const previewFund = (searchResult) => {
  router.push({
    name: "fundView",
    params: {
      fund: searchResult.stock,
    },
    query: {
      name: searchResult,
      region: searchResult,
      preview: true,
    },
  });
};
</script>
