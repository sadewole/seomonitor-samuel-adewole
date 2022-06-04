<template>
  <button v-bind="$attrs" class="rounded-full p-1 px-6 font-semibold">
    <span class="mr-1 inline-flex align-middle">
      <slot name="icon"></slot>
    </span>
    <slot />
  </button>
</template>
