<script setup>
// Core
import { ref, unref } from "vue";

const opRef = ref(null);
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="filter"
    icon-color="#767994"
    icon-left="SortIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[539px]"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <template #header>
      <div class="flex items-center h-[72px] px-6">
        <span class="text-lg font-semibold">Фильтрация</span>
      </div>
    </template>

    <div class="px-5 py-4">
      <base-row>
        <base-col col-class="w-1/2">
          <base-dropdown />
        </base-col>
        <base-col col-class="w-1/2">
          <base-dropdown />
        </base-col>
      </base-row>
    </div>

    <template #actions>
      <div class="flex py-3 px-4 justify-between items-center">
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-900"
          border-color="border-transparent"
          label="save"
          :rounded="true"
          shadow
          type="button"
          size="small"
        />

        <div class="flex items-center gap-3">
          <base-button
            color="bg-white hover:bg-greyscale-100 text-primary-900"
            border-color="border-transparent"
            label="clear"
            :rounded="true"
            shadow
            type="button"
            size="small"
          />

          <base-button
            border-color="border-transparent"
            label="filter"
            :rounded="true"
            shadow
            type="button"
            size="small"
          />
        </div>
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
