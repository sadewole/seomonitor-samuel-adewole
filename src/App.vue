<template>
  <div class="p-4 text-gray-500">
    <main class="max-w-sm mx-auto border-2">
      <TopHead />
      <section class="bg-gray-100 min-h-[600px]">
        <DefaultItem :text="defaultItem.text" :value="defaultItem.value" />
        <hr class="my-1" />
        <div class="p-3">
          <FieldItem
            v-model:text="item.text"
            v-model:value="item.value"
            :error="item.error"
            :disabled="item.disabled"
            v-for="(item, index) in items"
            :key="index"
            :handle-delete="() => handleDelete(index)"
            :show-icon="items.length > 6"
          />
          <ButtonBase
            class="bg-white text-gray-500 w-full disabled:text-gray-300"
            @click="handleNewField"
            :disabled="!!isMissingReq"
          >
            <template #icon
              ><PlusIcon class="w-4 h-4 font-semibold"
            /></template>
            Add another field
          </ButtonBase>
        </div>
      </section>
      <footer class="p-3 flex flex-col items-center text-center">
        <small class="italic"
          >N:B - A minimum of 6 fields are required and overall summation equal
          to 100</small
        >
        <ButtonBase
          :disabled="isOverrallSummed !== 100"
          class="bg-gray-500 disabled:bg-gray-400 disabled:text-gray-300 text-gray-100 w-48"
          >Apply</ButtonBase
        >
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import TopHead from "./components/TopHead.vue";
import FieldItem from "./components/FieldItem.vue";
import ButtonBase from "./components/ButtonBase.vue";
import PlusIcon from "./components/icons/PlusIcon.vue";
import DefaultItem from "./components/DefaultItem.vue";

type FieldType = {
  text: string;
  value: string;
  error: string;
  disabled: boolean;
};

const items = ref<FieldType[]>([
  { text: "Position 1", value: "", error: "", disabled: false },
  { text: "Position 2", value: "", error: "", disabled: true },
  { text: "Position 3", value: "", error: "", disabled: true },
  { text: "Position 4", value: "", error: "", disabled: true },
  { text: "Position 5", value: "", error: "", disabled: true },
  { text: "Position 6", value: "", error: "", disabled: true },
]);

const defaultItem = ref({ text: "unattributed value remaining", value: 5.8 });

const isMissingReq = computed(() => {
  return items.value.some((item) => item.error || item.value === "");
});

const isOverrallSummed = computed(() => {
  return items.value.reduce(
    (acc, cur) => acc + Number(cur.value),
    defaultItem.value.value
  );
});

const handleNewField = () => {
  items.value.push({ text: "", value: "", error: "", disabled: true });
};

const handleDelete = (index: number) => {
  items.value.splice(index, 1);
};

// enable exact next field item to be edited
const nextFocusField = () => {
  items.value.map((item, index) => {
    if (!item.disabled && item.value) {
      const nextItem = items.value[index + 1];
      if (nextItem) {
        nextItem.disabled = false;
      }
    }
  });
};

const validations = () => {
  let min: number;
  items.value.map((item) => {
    const isValidNumber =
      item.value.match(/^[-+]?[0-9]+\.[0-9]+$/) ||
      item.value.match(/^[-+]?[0-9]+$/);
    if (item.value) {
      if (!isValidNumber) {
        item.error = "Must be a valid number";
      } else if (Number(item.value) >= min) {
        item.error = "Must be lower than previous value";
      } else {
        min = Number(item.value);
        item.error = "";
      }
    }
  });
};

watch(() => items.value, validations, { deep: true });
watch(() => items.value, nextFocusField, { deep: true });
</script>
