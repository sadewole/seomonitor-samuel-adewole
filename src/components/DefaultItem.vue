<template>
  <div class="text-xs p-3 px-7 flex items-center gap-2">
    <span class="uppercase flex-1 focus:outline-none focus:border-0">{{
      text
    }}</span>
    <p class="px-2 bg-white w-12 rounded-full text-center">{{ value }}</p>
    <span>%</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
