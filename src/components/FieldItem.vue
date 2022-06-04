<template>
  <div class="mb-2">
    <div
      :class="[
        'text-xs rounded-lg bg-white p-2 px-4 flex items-center gap-2 h-12',
        { 'border border-red-500': !!error },
      ]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <span class="uppercase flex-1 focus:outline-none focus:border-0">{{
        text
      }}</span>
      <input
        type="text"
        name="value"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="px-2 bg-gray-100 w-12 rounded-full text-center"
      />
      <span>%</span>
      <span class="rounded-full bg-red-50 p-2" v-show="hovered">
        <TrashIcon class="w-3 h-3 text-red-500" />
      </span>
    </div>
    <span class="text-red-500 text-sm" v-if="!!error"
      ><WarningIcon class="w-3 h-3 inline-flex items-center mr-1" />{{
        error
      }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import TrashIcon from "./icons/TrashIcon.vue";
import WarningIcon from "./icons/WarningIcon.vue";

const hovered = ref(false);

defineEmits(["update:modelValue"]);

defineProps({
  text: {
    type: String as PropType<string>,
    required: true,
  },
  modelValue: {
    type: String as PropType<string>,
    required: true,
  },
  error: {
    type: String as PropType<string>,
    default: "",
  },
});
</script>
