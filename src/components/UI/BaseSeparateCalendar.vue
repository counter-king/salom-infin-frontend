<script setup>
// Core
import { ref, useModel } from "vue"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useI18n } from "vue-i18n"

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Array,
  }
})

const dayNames = [
  t('mo'),
  t('tu'),
  t('we'),
  t('th'),
  t('fr'),
  t('sa'),
  t('su'),
]

const modelValue = useModel(props, 'modelValue');
const datePicker = ref(null);

const setSelectedDate = (month, year) => {
  datePicker.value.setMonthYear({
    month,
    year
  })
}

const emits = defineEmits(['emit:rangeStart', 'update:modelValue'])

defineExpose({ setSelectedDate });

</script>

<template>
  <VueDatePicker
    v-model="modelValue"
    range
    inline
    :multi-calendars="{ solo: true }"
    auto-apply
    year-first
    week-start="1"
    :enable-time-picker="false"
    month-name-format="long"
    locale="ru"
    :day-names="dayNames"
    class="base-separate-calendar"
    ref="datePicker"
    @range-start="emits('emit:rangeStart')"
  >

  </VueDatePicker>
</template>

<style>
.dp__outer_menu_wrap {
  width: 100%;
}

.dp__menu, .dp__relative, .dp__theme_light {
  border: none!important;
}

.dp__menu_inner {
  padding: 0!important;
}

.dp__menu_inner .dp__instance_calendar {
  border-left: 1px solid var(--greyscale-200);
  padding: 20px
}

.dp__month_year_row {
  background: var(--greyscale-50);
  border-radius: 8px;
  height: 32px;
  padding: 0 5px;
  margin-bottom: 4px;
}

.dp__month_year_select {
  font-size: 14px;
  font-weight: 600;
}

.dp__calendar_header_item {
  height: 32px;
  width: 32px;
  font-size: 12px;
  font-weight: 500;
  color: var(--greyscale-300);
}

.dp__cell_inner {
  font-weight: 500
}

.dp__range_between {
  border: none!important;
}
/*.dp__range_start, .dp__range_end {
  border-radius: 200px!important;
}*/
</style>
