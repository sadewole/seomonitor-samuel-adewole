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
import type { PropType } from "vue";

defineProps({
  text: {
    type: String as PropType<string>,
    required: true,
  },
  value: {
    type: Number as PropType<number>,
    required: true,
  },
});
</script>
