<script setup>
// Core
import { computed, ref, inject, onMounted } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// Components
import { PriorityChip } from '@/components/Chips'
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
// Stores
import { useCommonStore } from '@/stores/common'
import { useUsersStore } from '@/stores/users.store'
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { formatDateReverse } from '@/utils/formatDate'
import { isObject } from '@/utils'
import { generateDayHours } from '../utils'
// Composable
const commonStore = useCommonStore()
const userStore = useUsersStore()
const calendarStore = useCalendarStore()
// Reactive
const times = ref(generateDayHours(15, 'ru'))
// Composable
const endTimes = computed(() => {
  let selected = times.value.findIndex(({ time }) => time === calendarStore.eventModel.__start_time)

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
  __participants: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __organizer: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const $v = useVuelidate(rules, calendarStore.eventModel)
// Macros
defineExpose({ $v })
// Inject
const { date } = inject('calendar')
// Hooks
onMounted(() => {
	calendarStore.eventModel.start_date = date.value
	calendarStore.eventModel.end_date = date.value
})
</script>

<template>
  <base-row>
    <base-col col-class="w-full">
      <base-input
        v-model="$v.title.$model"
        :error="$v.title"
        required
        label="name-event"
        placeholder="enter-name-event"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-calendar
        v-model="$v.start_date.$model"
        :error="$v.start_date"
        :min-date="new Date() /* Минимальная дата сегодняшние число */"
        required
        label="start-date"
        placeholder="start-date"
        @update:modelValue="(value) => {
          calendarStore.eventModel.start_date = formatDateReverse(value)
          calendarStore.eventModel.end_date = formatDateReverse(value)
        }"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-calendar
        v-model="$v.end_date.$model"
        :error="$v.end_date"
        :min-date="new Date(calendarStore.eventModel.start_date)"
        required
        label="end-date"
        placeholder="end-date"
        @update:modelValue="(value) => {
          calendarStore.eventModel.end_date = formatDateReverse(value)
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
          <base-icon name="ClockCircleIcon" width="18" />
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
          <base-icon name="ClockCircleIcon" width="18" />
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
      <base-multi-select
        v-model="$v.__participants.$model"
        :error="$v.__participants"
        api-url="users"
        label="add-participants"
        display="chip"
        placeholder="search-users"
        menu-placeholder="search-users"
        required
      >
        <template #chip="{ value }">
          <user-with-label
            :compact="true"
            :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          />
        </template>

        <template #option="{ value }">
          <user-with-selectable :items="[value]" />
        </template>

        <template #hint="{ value }">
          <user-with-label
            :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            shadow
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          />
        </template>
      </base-multi-select>
    </base-col>

    <base-col col-class="w-full">
      <base-dropdown
        v-model="$v.__organizer.$model"
        :error="$v.__organizer"
        v-model:options="userStore.usersList"
        required
        searchable
        api-url="users"
        label="add-organizer"
        placeholder="search-users"
        menu-placeholder="search-users"
        option-value="id"
        option-label="full_name"
      >
        <template #option="{ option }">
          <user-with-selectable :items="[option]" />
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

    <base-col col-class="w-full">
      <base-file-upload
        v-model="calendarStore.eventModel.__attachments"
        label="attach-file"
        @emit:file-upload="(files) => calendarStore.eventModel.__attachments = files"
      />
    </base-col>
  </base-row>
</template>

<style scoped>

</style>
