<template>
  <div class="text-xs p-3 px-7 flex items-center gap-2" data-testid="defaultItem">
    <span class="uppercase flex-1 focus:outline-none focus:border-0" data-testid="textItem">{{
      text
    }}</span>
    <p class="px-2 bg-white w-12 rounded-full text-center" data-testid="valueItem">{{ value }}</p>
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
