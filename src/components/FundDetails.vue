<template>
  <div>
    <h2>Fund Details</h2>
    <div v-if="fund">
      <h3>{{ fund.name }}</h3>
      <p>Description: {{ fund.description }}</p>
      <p>Investment Type: {{ fund.investmentType }}</p>
      <p>NAV: ${{ fund.nav }}</p>
      <h4>Performance History:</h4>
      <ul>
        <li v-for="(value, index) in fund.performanceHistory" :key="index">
          {{ value }}%
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
  <a href="/"><button>back</button></a>
</template>

<script>
export default {
  data() {
    return {
      fund: null,
    };
  },
  mounted() {
    // Fetch fund details from the mock API
    // You can replace this with actual API calls
    this.fetchFundDetails();
  },
  methods: {
    async fetchFundDetails() {
      const fundId = this.$route.params.id;
      // Simulating API call
      // Replace with axios.get(`/api/funds/${fundId}`) for a real API call
      const response = await import("@/mockApi.js");
      this.fund = await response.getFundDetails(parseInt(fundId));
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
