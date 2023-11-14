<script setup>
// Core
import {ref, unref, watch} from "vue";
import {useI18n} from "vue-i18n";
// Enums
import { TEMPLATE_OPTIONS } from "../../enums";
import BaseSeparateCalendar from "../UI/BaseSeparateCalendar.vue";

const opRef = ref(null);
const { t } = useI18n();

const patternVisible = ref(true);
const tempDate= ref(null)


const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}

watch(patternVisible, (val) =>  {
  patternVisible.value = val
}, { immediate: true })

</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="date"
    icon-color="#767994"
    icon-left="CalendarIcon"
    icon-right="AltArrowDownIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[784px]"
    menu-class="bg-white  mt-1"
  >
    <template #header>
      <div class="flex items-center justify-between h-14 px-4">
        <span class="text-lg font-semibold">{{ t('select-date') }}</span>
        <div class="flex items-center">
          <span class="text-sm text-greyscale-500">{{ t('templates') }}</span>
          <base-switch
            v-model="patternVisible"
            class-switch-root="mr-0"
            class-body="flex"
            class="ml-3"
          />
        </div>
      </div>
    </template>

    <div class="flex">
      <div
        class="flex flex-col p-1 w-52"
        :class="{ 'hidden' : !patternVisible }"
      >
        <div
          v-for="item in TEMPLATE_OPTIONS"
          :key="item.label"
          class="rounded-[8px] hover:bg-greyscale-50 cursor-pointer px-4 h-10 flex items-center"
        >
          <span class="text-sm font-medium">{{ t(item.label) }}</span>
        </div>
      </div>

      <div class="flex flex-1">
        <base-separate-calendar />
      </div>
    </div>

    <template #actions>
      <div class="flex justify-end gap-2 py-2">
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
          label="select"
          :rounded="true"
          shadow
          type="button"
          size="small"
        />
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
