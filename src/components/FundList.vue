<template>
  <div v-for="fundes in savedFunds" :key="fundes.id">
    <FundCard :fundes="fundes" @click="goToFundView(fundes)" />
  </div>

  <p v-if="savedFunds.length === 0">
    No funds added. To start tracking a fund, search in the field above.
  </p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchFund } from "@/services/apiService";
import FundCard from "./FundCard.vue";

const savedFunds = ref([]);

const getCities = async () => {
  if (localStorage.getItem("savedFunds")) {
    savedFunds.value = JSON.parse(localStorage.getItem("savedFunds"));

    const requests = [];
    savedFunds.value.forEach(async (fundes) => {
      try {
        const fundData = await searchFund(fundes.fund);
        fundes.data = fundData;
      } catch (error) {
        console.error(error);
        console.log("5");
      }
    });
  }
};

onMounted(async () => {
  await getCities();
  console.log("test");
});

const router = useRouter();
const goToFundView = (fundes) => {
  router.push({
    name: "fundView",
    params: { fund: fundes.fund },
    query: {
      id: fundes.id,
      name: fundes.fund,
    },
  });
};
</script>
