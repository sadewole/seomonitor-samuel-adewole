<template>
  <div class="p-4 text-gray-500">
    <main class="max-w-sm mx-auto border-2">
      <TopHead />
      <section class="bg-gray-100 min-h-[600px]">
        <DefaultItem text="unattributed value remanining" value="5.8" />
        <hr class="my-1" />
        <div class="p-3">
          <FieldItem
            :text="item.text"
            v-model="item.value"
            :error="item.error"
            v-for="(item, index) in items"
            :key="index"
          />
          <ButtonBase class="bg-white text-gray-500 w-full">
            <template #icon
              ><PlusIcon class="w-4 h-4 font-semibold"
            /></template>
            Add another field
          </ButtonBase>
        </div>
      </section>
      <footer class="p-3 flex justify-center">
        <ButtonBase
          disabled
          class="bg-gray-500 disabled:bg-gray-400 disabled:text-gray-300 text-gray-100 w-48"
          >Apply</ButtonBase
        >
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import TopHead from "./components/TopHead.vue";
import FieldItem from "./components/FieldItem.vue";
import ButtonBase from "./components/ButtonBase.vue";
import PlusIcon from "./components/icons/PlusIcon.vue";
import DefaultItem from "./components/DefaultItem.vue";

const items = ref<{ text: string; value: string; error: string }[]>([
  { text: "Position 2", value: "10", error: "" },
  { text: "position 3", value: "8", error: "" },
  { text: "position 3", value: "7", error: "" },
]);

const validations = () => {
  let min: number;
  items.value.map((item) => {
    const isValidNumber =
      item.value.match(/^[-+]?[0-9]+\.[0-9]+$/) ||
      item.value.match(/^[-+]?[0-9]+$/);
    if (!isValidNumber || item.value === "") {
      item.error = "Must be a valid number";
    } else if (Number(item.value) >= min) {
      item.error = "Must be lower than previous value";
    } else {
      min = Number(item.value);
      item.error = "";
    }
  });
};

watch(() => items.value, validations, { deep: true });
</script>
