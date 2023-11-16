<script setup>
// Core
import {ref, unref, watch} from "vue";
import {useI18n} from "vue-i18n";
// Enums
import { TEMPLATE_OPTIONS } from "@/enums";
// Components
import BaseSeparateCalendar from "../UI/BaseSeparateCalendar.vue";
// Utils
import {getDateRange} from "@/utils";

const opRef = ref(null);
const { t } = useI18n();

const patternVisible = ref(true);
const selectedDate= ref(null);
const datePicker= ref(null);


const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}

const setPatternDate = (item) => {
  selectedDate.value = getDateRange(item.label);
  const year = new Date(selectedDate.value[0]).getFullYear();
  const month = new Date(selectedDate.value[0]).getMonth();
  datePicker.value.setSelectedDate(month, year);
  TEMPLATE_OPTIONS.forEach(option => {
    option.active = option === item;
  })
}

const clearPatternActive = () => {
  TEMPLATE_OPTIONS.forEach(option => {
    option.active = false;
  })
}

const clear = () => {
  selectedDate.value = [];
  clearPatternActive();
}

watch(patternVisible, (val) =>  {
  patternVisible.value = val;
  clear();
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
    :width="patternVisible ? 'w-[784px]' : 'w-[582px]'"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <template #header>
      <div class="flex items-center justify-between h-14 px-4">
        <span class="text-lg font-semibold">{{ t('select-date') }}</span>
<!--        <pre>{{ selectedDate }}</pre>-->
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
        class="flex flex-col p-3 w-52"
        :class="{ 'hidden' : !patternVisible }"
      >
        <div
          v-for="item in TEMPLATE_OPTIONS"
          :key="item.label"
          class="rounded-[8px] hover:bg-greyscale-50 cursor-pointer px-4 h-10 flex items-center"
          :class="{ 'bg-greyscale-50' : item.active }"
          @click="setPatternDate(item)"
        >
          <span class="text-sm font-medium">{{ t(item.label) }}</span>
        </div>
      </div>

      <div class="flex flex-1">
        <base-separate-calendar
          v-model="selectedDate"
          ref="datePicker"
          @emit:range-start="clearPatternActive"
        />
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
          @click="clear"
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
