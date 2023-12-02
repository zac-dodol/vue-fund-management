<template>
  <div
    class="flex py-4 px-3 bg-color-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1 justify-center gap-2">
      <h2 class="text-xl">
        {{ fundes.data }}
      </h2>
      <h3 class="text-2xl">
        {{ fundes.fund }}
      </h3>

      <h4 class="text-xl">
        {{ fundes }}
      </h4>
    </div>

    <div class="flex flex-col gap-2 w-2/5 md:w-1/5">
      <p class="text-3xl self-end"></p>
      <div class="flex gap-2 flex-col">
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Exchange: </span>
          <span> {{ fundes.fund }} </span>
        </div>
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Currency: </span>
          <!-- <span> {{ fundes.data.currency }} </span> -->
        </div>
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Movement: </span>
          <!-- <span> {{ fundes.data.price_movement.movement }} </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fundes: {
    type: Object,
    default: () => ({}),
  },
});
</script>
