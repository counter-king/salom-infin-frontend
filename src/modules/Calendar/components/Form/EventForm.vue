<script setup>
// Core
import { computed, ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { helpers, required, requiredIf } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// Components
import { PriorityChip } from '@/components/Chips'
import { ClockCircleLinearIcon, TextSquareBoldIcon, FileTextBoldIcon } from '@/components/Icons'
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
// Stores
import { useCommonStore } from '@/stores/common'
import { useUsersStore } from '@/stores/users.store'
import { useCalendarStore } from '../../stores/calendar.store'
// Utils
import { formatDateReverse } from '@/utils/formatDate'
import { isObject } from '@/utils'
import { generateDayHours } from '../../utils'
// Enums
import { EVENT_TYPES } from '../../../Calendar/enums'
// Composable
const { t } = useI18n()
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
      type: EVENT_TYPES.EVENT,
      source: null, // zoom | cisco
      link: null,
      notify_by: null, // system | email | sms
      __formatType: null,
      __tabActiveIndex: null,
      __zoomLink: null,
      __ciscoLink: null
    })
  }
})
// Reactive
const times = ref(generateDayHours(15, 'ru'))
const formatList = ref([
  {
    title: 'Zoom',
    slot: 'zoom',
    icon: TextSquareBoldIcon
  },
  {
    title: 'Cisco',
    slot: 'cisco',
    icon: FileTextBoldIcon
  },
])
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
  __participants: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __organizer: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __zoomLink: {
    requiredIf: helpers.withMessage(
      `Поле не должен быть пустым`,
      requiredIf(function () {
        return props.model.__formatType === 'online' && props.model.__tabActiveIndex === 0
      })
    )
  },
  __ciscoLink: {
    requiredIf: helpers.withMessage(
      `Поле не должен быть пустым`,
      requiredIf(function () {
        return props.model.__formatType === 'online' && props.model.__tabActiveIndex === 1
      })
    )
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
        label="name-event"
        placeholder="enter-name-event"
      />
    </base-col>

    <base-col col-class="w-1/2">
      <base-label label="Формат" />

      <div class="flex">
        <div class="flex flex-1">
          <base-radio
            v-model="props.model.__formatType"
            input-id="offline"
            name="format"
            value="offline"
            @emit:update:modelValue="() => { props.model.source = props.model.link = null  }"
          />

          <label for="offline" class="text-sm font-medium text-greyscale-900 cursor-pointer">Оффлайн</label>
        </div>

        <div class="flex flex-1">
          <base-radio
            v-model="props.model.__formatType"
            input-id="online"
            name="format"
            value="online"
            @emit:update:modelValue="() => props.model.source = 'zoom'"
          />

          <label for="online" class="text-sm font-medium text-greyscale-900 cursor-pointer">Онлайн</label>
        </div>
      </div>
    </base-col>

    <base-col col-class="w-1/2">
      <template v-if="props.model.__formatType === 'online'">
        <div class="mt-[10px]">
          <base-tab-view
            v-model:active-index="props.model.__tabActiveIndex"
            :tab-view="formatList"
            scrollable
            bricks
            header-action-class="!p-[4px]"
            title-class="!h-auto"
            @emit:tab-click="(value) => props.model.source = value.slot"
          />
        </div>
      </template>
    </base-col>

    <template v-if="props.model.__formatType === 'online'">
      <base-col col-class="w-full">
        <template v-if="props.model.__tabActiveIndex === 0">
          <base-input
            v-model="$v.__zoomLink.$model"
            :error="$v.__zoomLink"
            required
            label="Zoom ссылка"
            placeholder="Вставте zoom cсылку"
          />
        </template>

        <template v-if="props.model.__tabActiveIndex === 1">
          <base-input
            v-model="$v.__ciscoLink.$model"
            :error="$v.__ciscoLink"
            required
            label="Cisco номер и пароль"
            placeholder="Введите cisco номер и пароль"
          />
        </template>
      </base-col>
    </template>

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
          <base-iconify :icon="ClockCircleLinearIcon" />
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
	        <base-iconify :icon="ClockCircleLinearIcon" />
        </template>
      </base-dropdown>
    </base-col>

    <base-col col-class="w-full">
      <base-dropdown
        v-model="props.model.priority"
        :options="commonStore.prioryList"
        :show-clear="false"
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
            :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            color="#635AFF"
            avatar-classes="w-5 h-5"
          />
        </template>

        <template #option="{ value }">
          <user-with-selectable :items="[value]" />
        </template>

        <template #hint="{ value }">
          <user-with-label
            :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
            shadow
            color="#635AFF"
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
        v-model="props.model.__attachments"
        label="attach-file"
        @emit:file-upload="(files) => props.model.__attachments = files"
      />
    </base-col>

    <base-col col-class="w-full">
      <base-label label="Уведомление" />

      <div class="flex items-center gap-6">
        <div class="flex items-center">
          <base-radio
            v-model="props.model.notify_by"
            input-id="system"
            name="notify"
            value="system"
          />

          <label for="system" class="text-sm font-medium text-greyscale-900 cursor-pointer">Система</label>
        </div>

        <div class="flex items-center">
          <base-radio
            v-model="props.model.notify_by"
            input-id="email"
            name="notify"
            value="email"
          />

          <label for="email" class="text-sm font-medium text-greyscale-900 cursor-pointer">Почта</label>
        </div>

        <div class="flex items-center">
          <base-radio
            v-model="props.model.notify_by"
            input-id="sms"
            name="notify"
            value="sms"
          />

          <label for="sms" class="text-sm font-medium text-greyscale-900 cursor-pointer">SMS сообщения</label>
        </div>
      </div>
    </base-col>
  </base-row>
</template>

<style scoped>

</style>
