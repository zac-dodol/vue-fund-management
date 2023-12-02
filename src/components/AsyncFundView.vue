<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-color-secondary w-full text-center"
    >
      <p>
        You are currently previewing this fund, click the "+" icon to start
        tracking this fund.
      </p>
    </div>
    <!-- Fund Overview -->
    <div class="container flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2 bg-color-secondary p-4 rounded-md">
        {{ route.params.fund }}
      </h1>
      <ul v-if="fundDetails" class="text-sm mb-12 w-full">
        <li class="flex justify-between w-full gap-16">
          <span> Exchange: </span>
          {{ fundDetails.exchange }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Name: </span>
          {{ fundDetails.title }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Price: </span>
          {{ fundDetails.extracted_price }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Currency: </span>
          {{ fundDetails.currency }}
        </li>
      </ul>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeFund"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove Fund</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { searchFund } from "@/services/apiService";

const fundDetails = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    fundDetails.value = await searchFund(route.params.fund);
    console.log(fundDetails.value);
  } catch (error) {
    console.error(error);
    // Handle error
  }
});

const router = useRouter();
const removeFund = () => {
  const funds = JSON.parse(localStorage.getItem("savedFunds"));
  const updatedFunds = funds.filter((fund) => fund.id !== route.query.id);
  localStorage.setItem("savedFunds", JSON.stringify(updatedFunds));
  router.push({
    name: "home",
  });
};
</script>
