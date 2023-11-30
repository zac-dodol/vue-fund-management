<template>
  <div>
    <h2>Fund List</h2>
    <ul>
      <li v-for="fund in funds" :key="fund.id">
        <router-link :to="{ name: 'fundDetails', params: { id: fund.id } }">
          {{ fund.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funds: [],
    };
  },
  mounted() {
    // Fetch funds from the mock API
    // You can replace this with actual API calls
    this.fetchFunds();
  },
  methods: {
    async fetchFunds() {
      // Simulating API call
      // Replace with axios.get('/api/funds') for a real API call
      const response = await import("@/mockApi.js");
      this.funds = await response.getFunds();
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
