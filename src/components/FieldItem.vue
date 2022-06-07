<template>
  <div class="mb-2" data-testid="fieldContainer">
    <div
      :class="[
        'text-xs rounded-lg bg-white p-2 px-4 flex items-center gap-2 h-12',
        { 'border border-red-500': !!error },
        { 'pointer-events-none bg-gray-50': disabled },
      ]"
      data-testid="boxContent"
      @mouseenter="boxHovered = true"
      @mouseleave="boxHovered = false"
    >
      <input
        type="text"
        name="text"
        placeholder="Enter text"
        :value="props.text"
        @blur="checkEmptyField"
        @input="emit('update:text', $event.target.value)"
        class="uppercase flex-1 focus:outline-none focus:border-0"
        data-testid="inputText"
      />
      <!-- Input value with tooltip -->
      <div class="relative">
        <input
          type="text"
          name="value"
          :value="redefineValue"
          @focus="formatValueOnFocus"
          @blur="formatValueOnBlur"
          @mouseenter="valueHovered = true"
          @mouseleave="valueHovered = false"
          @input="emit('update:value', $event.target.value)"
          class="px-2 bg-gray-100 w-12 rounded-full text-center"
          data-testid="inputValue"
        />
        <div
          v-if="value"
          :class="[
            'inline-block absolute right-0 top-5 z-10 text-xs px-3 font-medium text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm',
            { 'opacity-0 invisible': !valueHovered },
          ]"
          data-testid="tooltip"
        >
          {{ value }}
        </div>
      </div>
      <span>%</span>
      <span
        class="rounded-full bg-red-50 p-2 cursor-pointer"
        v-if="boxHovered && showIcon"
        @click="handleDelete"
        data-testid="deleteIcon"
      >
        <TrashIcon class="w-3 h-3 text-red-500" />
      </span>
    </div>
    <!-- warning message -->
    <span data-testid="errorMessage" class="text-red-500 text-sm" v-if="!!error"
      ><WarningIcon class="w-3 h-3 inline-flex items-center mr-1" />{{
        error
      }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType } from "vue";
import TrashIcon from "./icons/TrashIcon.vue";
import WarningIcon from "./icons/WarningIcon.vue";
import { formattedValue } from "../utils/parseFormat";

const emit = defineEmits(["update:text", "update:value", "dispatch:error"]);

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

const boxHovered = ref(false);
const valueHovered = ref(false);
const redefineValue = ref(props.value || "");

watch(
  () => props.value,
  (value) => {
    redefineValue.value = value;
  }
);

const formatValueOnFocus = (): void => {
  redefineValue.value = props.value;
};

const checkEmptyField = (): void => {
  if (!props.disabled && (props.value === "" || props.text === "")) {
    emit("dispatch:error", "Fields should not be empty");
  }
};

const formatValueOnBlur = (payload: FocusEvent): void => {
  const target = payload.target as HTMLInputElement;
  let value = target.value;
  const num = parseFloat(value);
  const btwTens: boolean = -10 > num || num < 10;

  const newVal = isNaN(num)
    ? value
    : btwTens
    ? formattedValue(value, 2)
    : formattedValue(value, 1);

  redefineValue.value = String(newVal);

  checkEmptyField();
};
</script>
