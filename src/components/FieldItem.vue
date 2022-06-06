<template>
  <div class="mb-2">
    <div
      :class="[
        'text-xs rounded-lg bg-white p-2 px-4 flex items-center gap-2 h-12',
        { 'border border-red-500': !!error },
        { 'pointer-events-none bg-gray-50': disabled },
      ]"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <input
        type="text"
        name="text"
        placeholder="Enter text"
        :value="text"
        @input="$emit('update:text', $event.target.value)"
        class="uppercase flex-1 focus:outline-none focus:border-0"
      />
      <input
        type="text"
        name="value"
        :value="value"
        @focus="formatValueOnFocus"
        @blur="formatValueOnBlur"
        @input="$emit('update:value', $event.target.value)"
        class="px-2 bg-gray-100 w-12 rounded-full text-center"
      />
      <span>%</span>
      <span
        class="rounded-full bg-red-50 p-2 cursor-pointer"
        v-if="hovered && showIcon"
        @click="handleDelete"
      >
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

defineEmits(["update:text", "update:value"]);

const props = defineProps({
  text: {
    type: String as PropType<string>,
    required: true,
  },
  value: {
    type: String as PropType<string>,
    required: true,
  },
  error: {
    type: String as PropType<string>,
    default: "",
  },
  handleDelete: {
    type: Function as PropType<() => void>,
    required: true,
  },
  showIcon: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const formatValueOnFocus = (payload: FocusEvent) => {
  const target = payload.target as HTMLInputElement;
  target.value = props.value;
};

const formatValueOnBlur = (payload: FocusEvent) => {
  const target = payload.target as HTMLInputElement;
  let value = target.value;
  const num = parseFloat(value);
  const btwTens: boolean = -10 > num || num < 10;

  const newVal = isNaN(num)
    ? value
    : btwTens
    ? formattedValue(value, 2)
    : formattedValue(value, 1);

  target.value = String(newVal);
};

function formattedValue(str: string | number, val: number) {
  return isFloat(str) ? parseFixed(str, val) : str;
}

function parseFixed(str: string | number, val: number) {
  str = str.toString();
  str = str.slice(0, str.indexOf(".") + val + 1);
  return Number(str);
}

// check if number is a floating point number
function isFloat(num: number | string) {
  return Number(num) % 1 !== 0;
}
</script>
