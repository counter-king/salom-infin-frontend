<script setup>
// Core
import { ref, unref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
// Enums
import { TEMPLATE_OPTIONS } from "@/enums";
// Store
import { useFilterStore } from "@/stores/filter.store";
import { usePaginationStore } from "@/stores/pagination.store";
// Components
import { CalendarIcon, AltArrowDownIcon } from '@/components/Icons'
import BaseSeparateCalendar from "../UI/BaseSeparateCalendar.vue";
// Utils
import { clearModel, filterObjectByKeys, getDateRange } from "@/utils";

const props = defineProps({
  actionList: {
    type: Function,
    default: () => void 0
  },
  keysToIncludeOnClearFilter: {
    type: Array,
    default: () => []
  }
})

const opRef = ref(null);
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const filterStore = useFilterStore();
const paginationStore = usePaginationStore();

const patternVisible = ref(true);
const selectedDate = ref(null);
const datePicker = ref(null);

// Methods
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
const clear = async () => {
  selectedDate.value = [];
  clearPatternActive();
  await clearModel(filterStore.filterState, props.keysToIncludeOnClearFilter);
  toggle();
  if (route.query) {
    let tempRouteQuery = filterObjectByKeys(route.query, props.keysToIncludeOnClearFilter);
    await paginationStore.resetPagination();
    await router.replace({
      query: {
        ...tempRouteQuery,
        page: paginationStore.page,
        page_size: paginationStore.pageSize,
        first_row: paginationStore.firstRow
      }
    });
    await props.actionList({ ...route.query });
  }
}
const returnStringDate = (date) => {
  return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`;
}
const filter = async () => {
  if (filterStore.filterState.created_start_date && filterStore.filterState.created_end_date) {
    await paginationStore.resetPagination();
    await router.replace({
      query: {
        ...route.query,
        created_start_date: filterStore.filterState.created_start_date,
        created_end_date: filterStore.filterState.created_end_date,
        page: paginationStore.page,
        page_size: paginationStore.pageSize,
        first_row: paginationStore.firstRow
      }
    });
    toggle();
    await props.actionList(route.query);
  }
}
const onChangePanelState = (val) => {
  if (val) {
    if (route.query && route.query.created_start_date && route.query.created_end_date) {
      filterStore.filterState.created_start_date = route.query.created_start_date;
      filterStore.filterState.created_end_date = route.query.created_end_date;
      selectedDate.value = [filterStore.filterState.created_start_date, filterStore.filterState.created_end_date]
    } else {
      filterStore.filterState.created_start_date = null;
      filterStore.filterState.created_end_date = null;
      selectedDate.value = [];
    }
  }
}

watch(patternVisible, (val) =>  {
  patternVisible.value = val;
  selectedDate.value = [];
  clearPatternActive();
}, { immediate: true });

watch(selectedDate, val => {
  filterStore.filterState.created_start_date = returnStringDate(selectedDate.value[0]);
  filterStore.filterState.created_end_date = returnStringDate(selectedDate.value[1]);
})

</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="date"
    icon-color="#767994"
    :icon-left="CalendarIcon"
    :icon-right="AltArrowDownIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    :width="patternVisible ? 'w-[784px]' : 'w-[582px]'"
    menu-class="bg-white mt-1 overflow-hidden"
    @emit:change-state="onChangePanelState"
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
          @click="filter"
        />
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
