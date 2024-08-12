<script setup>
// Core
import { computed, ref, inject } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// Components
import { PriorityChip } from '@/components/Chips'
// Stores
import { useCommonStore } from '@/stores/common'
import { useUsersStore } from '@/stores/users.store'
import { useCalendarStore } from '../../stores/calendar.store'
// Utils
import { formatDateReverse } from '@/utils/formatDate'
import { generateDayHours } from '../../utils'
// Enums
import { EVENT_TYPES } from '../../../Calendar/enums'
// Composable
const commonStore = useCommonStore()
const userStore = useUsersStore()
const calendarStore = useCalendarStore()
// Macros
const props = defineProps({
  model: {
    type: Object,
    default: () => ({
      title: null,
      start_date: null,
      __start_time: null,
      end_date: null,
      __end_time: null,
      priority: null,
      participants: null,
      __participants: [],
      organizer: null,
      __organizer: null,
      description: null,
      attachments: [],
      __attachments: [],
      type: EVENT_TYPES.EVENT
    })
  }
})
// Reactive
const times = ref(generateDayHours(15, 'ru'))
// Composable
const endTimes = computed(() => {
  let selected = times.value.findIndex(({ time }) => time === props.model.__start_time)

  if(selected >= 0) {
    return times.value.map((time, index) => ({ ...time, disabled: index < selected + 1 }))
  }
})
const isOptionDisabled = (option) => {
  return option.disabled
}
// Non-reactive
const rules = {
  title: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  start_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __start_time: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  end_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __end_time: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  priority: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const $v = useVuelidate(rules, props.model)
// Macros
defineExpose({ $v })
// Inject
const { date } = inject('calendar')
</script>

<template>
  <base-row>
    <base-col col-class="w-full">
      <base-input
        v-model="$v.title.$model"
        :error="$v.title"
        required
        label="name-task"
        placeholder="enter-name-task"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-calendar
        v-model="$v.start_date.$model"
        :error="$v.start_date"
        required
        label="start-date"
        placeholder="start-date"
        @update:modelValue="(value) => {
          props.model.start_date = formatDateReverse(value)
          props.model.end_date = formatDateReverse(value)
        }"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-calendar
        v-model="$v.end_date.$model"
        :error="$v.end_date"
        required
        label="end-date"
        placeholder="end-date"
        @update:modelValue="(value) => {
          props.model.end_date = formatDateReverse(value)
        }"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-dropdown
        v-model="$v.__start_time.$model"
        :error="$v.__start_time"
        :options="times"
        required
        option-value="time"
        option-label="time"
        label="start-time"
        placeholder="choose-start-time"
      >
        <template #dropdownicon>
          <base-iconify icon="solar:clock-circle-linear" class="!w-5 !h-5" />
        </template>
      </base-dropdown>
    </base-col>

    <base-col col-class="w-1/2">
      <base-dropdown
        v-model="$v.__end_time.$model"
        :error="$v.__end_time"
        :options="endTimes"
        :option-disabled="isOptionDisabled"
        required
        option-value="time"
        option-label="time"
        label="end-time"
        placeholder="choose-end-time"
      >
        <template #dropdownicon>
          <base-iconify icon="solar:clock-circle-linear" class="!w-5 !h-5" />
        </template>
      </base-dropdown>
    </base-col>

    <base-col col-class="w-full">
      <base-dropdown
        v-model="$v.priority.$model"
        :error="$v.priority"
        :options="commonStore.prioryList"
        required
        option-value="id"
        label="priority"
      >
        <template #option="{ option }">
          <priority-chip :id="option?.id" />
        </template>
      </base-dropdown>
    </base-col>

    <base-col col-class="w-full">
      <base-textarea
        v-model="$v.description.$model"
        :error="$v.description"
        required
        label="short-description"
        placeholder="enter-short-description"
      />
    </base-col>
  </base-row>
</template>

<style scoped>

</style>
