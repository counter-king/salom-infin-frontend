<script setup>
import { ref, unref, computed } from 'vue'
// Components
import { PriorityChip } from '@/components/Chips'
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { isObject } from '@/utils'
import { formatDateReverse } from '@/utils/formatDate'
import { generateDayHours } from '../utils'
// Composable
const commonStore = useCommonStore()
const calendarStore = useCalendarStore()
// Reactive
const sidebarRef = ref(null)
const times = ref(generateDayHours(15, 'ru'))
// Composable
const endTimes = computed(() => {
  let selected = times.value.findIndex(({ time }) => time === calendarStore.eventModel.start_time)

  if(selected > 0) {
    return times.value.map((time, index) => {
      return {
        ...time,
        disabled: index < selected + 1
      }
    })
  }
})
// Methods
const createEvent = async () => {
  const _sidebarRef = unref(sidebarRef)

  try {
    _sidebarRef.successButtonLoading = true
    await calendarStore.actionCreateEvent()
    _sidebarRef.successButtonLoading = false
  }
  finally {
    _sidebarRef.successButtonLoading = false
  }
}
const isOptionDisabled = (option) => {
  return option.disabled
}
</script>

<template>
  <base-sidebar
    ref="sidebarRef"
    v-model="calendarStore.eventSidebar"
    title="create-event"
    @emit:cancel-button="(value) => calendarStore.eventSidebar = value"
    @emit:success-button="createEvent"
  >
    <template #content>
      <base-row>
        <base-col col-class="w-full">
          <base-input
            v-model="calendarStore.eventModel.title"
            required
            label="name-event"
            placeholder="enter-name-event"
          />
        </base-col>

        <base-col col-class="w-1/2">
          <base-calendar
            v-model="calendarStore.eventModel.start_date"
            :min-date="new Date() /* Минимальная дата сегодняшние число */"
            required
            label="start-date"
            placeholder="start-date"
            @update:modelValue="(value) => calendarStore.eventModel.end_date = formatDateReverse(value)"
          />
        </base-col>

        <base-col col-class="w-1/2">
          <base-calendar
            v-model="calendarStore.eventModel.end_date"
            :min-date="calendarStore.eventModel.start_date"
            label="end-date"
            placeholder="end-date"
          />
        </base-col>

        <base-col col-class="w-1/2">
          <base-dropdown
            v-model="calendarStore.eventModel.start_time"
            :options="times"
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
            v-model="calendarStore.eventModel.end_time"
            :options="endTimes"
            :option-disabled="isOptionDisabled"
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
            v-model="calendarStore.eventModel.priority"
            :options="commonStore.prioryList"
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
            v-model="calendarStore.eventModel.__assigners"
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
          <base-multi-select
            v-model="calendarStore.eventModel.__organizers"
            api-url="users"
            label="add-organizer"
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
          <base-textarea
            v-model="calendarStore.eventModel.short_descriptions"
            label="short-description"
            placeholder="enter-short-description"
          />
        </base-col>

        <base-col col-class="w-full">
          <base-file-upload
            v-model="calendarStore.eventModel.__files"
            label="attach-file"
            @emit:file-upload="(files) => calendarStore.eventModel.__files = files"
          />
        </base-col>
      </base-row>

      <pre>{{ calendarStore.eventModel }}</pre>
    </template>
  </base-sidebar>
</template>

<style scoped>

</style>
