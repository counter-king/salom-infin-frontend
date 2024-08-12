<script setup>
// Core
import { ref, inject, unref, nextTick, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import ScrollPanel from 'primevue/scrollpanel'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { clearModel } from '@/utils'
import { generateDayHours } from '@/modules/Calendar/utils'
// Enums
import { EVENT_TYPES, ACTION_FORM_TYPES, CALENDAR_TYPES } from '../enums'
// Macros
const props = defineProps({
	interval: {
		type: Array,
		default: () => []
	},
	events: {
		type: Array,
		default: () => []
	},
  type: {
    type: String,
    default: CALENDAR_TYPES.MONTHS,
    validator(value) {
      return Object.values(CALENDAR_TYPES).includes(value)
    }
  }
})
// Inject
const { date, daysList } = inject('calendar')
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const calendarStore = useCalendarStore()
// Reactive
const dateCopy = computed(() => new Date(
  date.value.getFullYear(),
  date.value.getMonth(),
  date.value.getDate(),
  8,
  0,
  0
))
const menuContainerRef = ref(null)
const menuTopRef = ref(null)
const menuContentRef = ref(null)
const menuBottomRef = ref(null)
const eventRef = ref(null)
const formRef = ref(null)
const formComponent = shallowRef(null)
const menuVisible = ref(false)
const toggleCount = ref(1)
const times = ref(generateDayHours(60, 'ru', 0))
// Computed
const firstDateOfWeek = computed(() => dateCopy.value.getDate() - dateCopy.value.getDay() + 1)
const beginOfWeek = computed(() => new Date(dateCopy.value.setDate(firstDateOfWeek.value)))
const weekInterval = computed(() => {
  return props.interval.filter(interval =>
    dayjs(beginOfWeek.value).format('D')
    <= interval.date && interval.date <=
    dayjs(beginOfWeek.value).add(6, 'day').format('D')
  )
})
const getOneEvent = computed(() => daysList.value.find(day => day.date === +dayjs(date.value).format('D')))
// Methods
const collapseEventList = (index) => {
	const _eventsListRef = document.querySelector(`#events-list-${index}`)
	const _eventItemsWrapRef = document.querySelector(`#event-items-wrap-${index}`)

	if(toggleCount.value & 1) {
		_eventsListRef.classList.add('shadow-calendar-cell')
		_eventsListRef.style.height = `${_eventItemsWrapRef?.clientHeight + 70}px`
		_eventsListRef.style.zIndex = 3
	}
	else {
		_eventsListRef.classList.remove('shadow-calendar-cell')
		_eventsListRef.style.height = null
		_eventsListRef.style.zIndex = null
	}

	toggleCount.value = toggleCount.value + 1
}
const cellClick = async (cellIndex, date, month, year, time) => {
	clearModel(calendarStore.updateEventModel, ['type'])
  if(time) {
    calendarStore.eventModel.__start_time = time
    calendarStore.eventModel.__end_time = `${time.split(':')[0]}:30`
  }
  menuVisible.value = true
	calendarStore.actionToggleEventClick(false)
	await nextTick()
  const _eventItemRef = document.querySelector(`#events-list-${cellIndex}`)
	const { left: eventLeft, top: eventTop, width: eventWidth } = _eventItemRef.getBoundingClientRect()
  const _menuContentRef = unref(menuContentRef)
  const { width: menuWidth } = _menuContentRef.getBoundingClientRect()
  const _menuContainerRef = unref(menuContainerRef)
  const _menuTopRef = unref(menuTopRef)

  // Right side
  if(eventLeft - eventWidth < menuWidth) {
    _menuContainerRef.style.marginLeft = `${eventLeft + eventWidth + 10}px`
    _menuTopRef.style.maxHeight = `${eventTop}px`
    _menuTopRef.style.minHeight = `32px`
  }
  else {
    // Left side
    _menuContainerRef.style.marginLeft = `${eventLeft - menuWidth - 10}px`
    _menuTopRef.style.maxHeight = `${eventTop}px`
    _menuTopRef.style.minHeight = `32px`
  }

	await router.replace({
		name: 'CalendarDate',
		params: {
			...route.params,
			y: year,
			m: month,
			d: date
		}
	})
}
const eventClick = async (event, cellIndex, eventIndex, date, month, year, type) => {
  type === EVENT_TYPES.EVENT
    ? calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.EVENT
    : calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.TASK

  calendarStore.actionToggleEventClick(true)
	calendarStore.actionSetEventModel(event)
	menuVisible.value = true
	await nextTick()
	const _eventItemRef = document.querySelector(`#event-item-${cellIndex}-${eventIndex}`)
	const { left: eventLeft, top: eventTop, width: eventWidth } = _eventItemRef.getBoundingClientRect()
	const _menuContentRef = unref(menuContentRef)
	const { width: menuWidth } = _menuContentRef.getBoundingClientRect()
	const _menuContainerRef = unref(menuContainerRef)
	const _menuTopRef = unref(menuTopRef)

	// Right side
	if(eventLeft - eventWidth < menuWidth) {
		_menuContainerRef.style.marginLeft = `${eventLeft + eventWidth + 10}px`
		_menuTopRef.style.maxHeight = `${eventTop}px`
		_menuTopRef.style.minHeight = `32px`
	}
	else {
		// Left side
		_menuContainerRef.style.marginLeft = `${eventLeft - menuWidth - 10}px`
		_menuTopRef.style.maxHeight = `${eventTop}px`
		_menuTopRef.style.minHeight = `32px`
	}

	await router.replace({
		name: 'CalendarDate',
		params: {
			...route.params,
			y: year,
			m: month,
			d: date
		}
	})

	// {
	// 	"x": 34,
	// 	"y": 581.59375,
	// 	"width": 192.421875,
	// 	"height": 21,
	// 	"top": 581.59375,
	// 	"right": 226.421875,
	// 	"bottom": 602.59375,
	// 	"left": 34
	// }
}
const maximizeEvent = () => {
  menuVisible.value = false
  calendarStore.eventSidebar = true
}
const createEvent = async (type) => {
  try {
    await calendarStore.actionCreateEvent(type)
    menuVisible.value = false
  }
  catch (error) {

  }
}
const changeEvent = async (type) => {
  try {
    await calendarStore.actionChangeEvent(type)
    menuVisible.value = false
  }
  catch (error) {

  }
}
const closeEvent = () => {
  menuVisible.value = false
  clearModel(
    calendarStore.isEventClicked
      ? calendarStore.updateEventModel
      : calendarStore.eventModel,
    ['type', 'start_date', 'end_date']
  )
}
const deleteEvent = async (type) => {
  if(!confirm(`Действительно хотите удалить ?`)) {
    return
  }

  try {
    await calendarStore.actionDeleteEvent(type)
    menuVisible.value = false
  }
  catch (error) {

  }
}
// Watch
watch(() => calendarStore.actionTypesMenuSelected.name, (value) => {
  formComponent.value = defineAsyncComponent({
    loader: () => import(`./Form/${value}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
// onClickOutside(
// 	eventRef,
// 	() => {
// 		menuVisible.value = false
// 	},
// 	{ ignore: [menuContentRef] }
// )
</script>

<template>
  <template v-if="props.type === CALENDAR_TYPES.DAYS">
    <ScrollPanel class="flex-1 w-full h-[1px] border-t border-greyscale-200">
      <div class="grid grid-cols-[90px_1fr] flex-1">
        <div class="grid grid-cols-subgrid col-span-1 border-r border-greyscale-200">
          <template v-for="{ time } in times">
            <div class="h-[120px] p-3 font-medium text-sm text-gray-2 text-right [&:not(:last-child)]:border-b border-greyscale-200">
              {{ time }}
            </div>
          </template>
        </div>

        <div>
          <template v-for="({ time }, index) in times">
            <div
              class="relative h-[120px] p-2 [&:not(:last-child)]:border-b border-greyscale-200"
              @click="cellClick(index, route.params.d, route.params.m, route.params.y, null)"
            >
              <div
                :id="`events-list-${index}`"
                class="events-list flex flex-col bg-white absolute top-0 left-0 w-full h-full border-[2px] border-transparent transition-all rounded-lg p-2 group-hover:border-primary-500"
              >
                <template v-if="getOneEvent">
                  <template v-if="getOneEvent.events?.length">
                    <div
                      :id="`event-items-wrap-${index}`"
                      class="event-items-wrap grid grid-cols-4 gap-2"
                    >
                      <template v-for="(event, eventIndex) in getOneEvent?.events">
                        <template v-if="time.split(':')[0] === dayjs(event.start_date).format('HH')">
                          <div
                            ref="eventRef"
                            :id="`event-item-${index}-${eventIndex}`"
                            :class="[
                              event.type === EVENT_TYPES.EVENT ? 'bg-info-100' : 'bg-warning-100',
                            ]"
                            class="flex items-center rounded-[6px] cursor-pointer px-2 py-1"
                            @click.stop="eventClick(event, index, eventIndex, getOneEvent.date, getOneEvent.month, getOneEvent.year, event.type)"
                          >
                            <div class="flex-1">
                              <h1 class="text-sm font-semibold truncate">{{ event.title }}</h1>
                              <p class="text-sm font-medium text-greyscale-500 mt-1 mb-auto">{{ dayjs(event.start_date).format('HH:mm') }}-{{ dayjs(event.end_date).format('HH:mm') }}</p>
                            </div>

                            <div>
                              <base-avatar-group
                                :items="event.participants"
                                avatar-classes="w-7 h-7"
                                class="ml-2"
                              />
                            </div>
                          </div>
                        </template>
                      </template>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </ScrollPanel>
  </template>

  <template v-else-if="props.type === CALENDAR_TYPES.WEEKS">
    <ScrollPanel class="flex-1 w-full h-[1px] border-t border-greyscale-200">
      <div class="grid grid-cols-[90px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] flex-1">
        <div class="grid grid-cols-subgrid col-span-1 border-r border-greyscale-200">
          <template v-for="{ time } in times">
            <div class="h-[120px] p-3 font-medium text-sm text-gray-2 text-right [&:not(:last-child)]:border-b border-greyscale-200">
              {{ time }}
            </div>
          </template>
        </div>

        <div class="col-span-7">
          <div class="grid grid-cols-7 grid-rows-[repeat(17, minmax(0, 1fr))] flex-col">
            <template v-for="({ date, month, year, events }, weekIndex) in weekInterval">
              <div class="[&:not(:last-child)]:border-r border-greyscale-200">
                <template v-for="({ time }, index) in times">
                  <div class="group flex flex-col h-[120px] relative [&:not(:last-child)]:border-b border-greyscale-200 p-2">
                    <div
                      :id="`events-list-${weekIndex}-${index}`"
                      class="events-list flex flex-col bg-white absolute top-0 left-0 w-full h-full border-[2px] border-transparent transition-all rounded-lg p-2 group-hover:border-primary-500"
                    >
                      <template v-if="events.length">
                        <div class="overflow-hidden flex-1">
                          <div
                            :id="`event-items-wrap-${weekIndex}-${index}`"
                            class="event-items-wrap flex flex-col gap-1"
                          >
                            <template v-for="(event, eventIndex) in events">
                              <template v-if="time.split(':')[0] === dayjs(event.start_date).format('HH')">
                                <div
                                  ref="eventRef"
                                  :id="`event-item-${index}-${eventIndex}`"
                                  :class="[
                                    event.type === EVENT_TYPES.EVENT ? 'bg-info-100' : 'bg-warning-100',
                                  ]"
                                  class="flex flex-col bg-info-100 h-[100px] rounded-lg py-[6px] px-2 cursor-pointer"
                                  @click.stop="eventClick(event, index, eventIndex, date, month, year, event.type)"
                                >
                                  <h1 class="text-sm font-semibold truncate">{{ event.title }}</h1>
                                  <p class="text-sm font-medium text-greyscale-500 mt-1 mb-auto">{{ dayjs(event.start_date).format('HH:mm') }}-{{ dayjs(event.end_date).format('HH:mm') }}</p>

                                  <base-avatar-group
                                    :items="event.participants"
                                    avatar-classes="w-7 h-7"
                                    class="ml-2"
                                  />
                                </div>
                              </template>
                            </template>
                          </div>
                        </div>
                      </template>

                      <div class="flex gap-2 absolute bottom-0 right-[50%] translate-x-1/2 translate-y-[16px] z-[1] rounded-full opacity-0 transition group-hover:opacity-100">
                        <button
                          @click.stop="collapseEventList(`${weekIndex}-${index}`)"
                          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 transition"
                        >
                          <base-iconify
                            icon="solar:double-alt-arrow-down-linear"
                            class="text-white"
                            :class="{ 'rotate-180' : !(toggleCount & 1) }"
                          />
                        </button>

                        <button
                          @click="cellClick(`${weekIndex}-${index}`, date, month, year, time)"
                          v-tooltip.top="{
                            value: `<h4 class='text-xs text-white -my-1'>Создать</h4>`,
                            escape: true,
                            autoHide: false
                          }"
                          class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 transition"
                        >
                          <base-iconify
                            icon="octicon:plus-16"
                            class="text-white"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </ScrollPanel>
  </template>

  <template v-else>
    <div
      class="grid grid-cols-7 grid-rows-5 flex-1"
      :class="{ 'grid-rows-6' : daysList.length > 35 }"
    >
      <template v-for="({ date, month, year, status, events }, index) in props.interval">
        <div
          class="group relative transition-all [&:not(:nth-child(7n))]:border-r border-t border-greyscale-200 p-2"
          :class="{ '!bg-greyscale-50': status !== 'now' }"
          @click="cellClick(index, date, month, year, null)"
        >
          <div
            :id="`events-list-${index}`"
            :class="{ '!bg-greyscale-50': status !== 'now' }"
            class="events-list flex flex-col bg-white absolute top-0 left-0 w-full h-full border-[2px] border-transparent transition-all rounded-lg p-2 group-hover:border-primary-500"
          >
            <div class="h-7 mb-2">
              <span
                class="flex items-center justify-center w-7 h-7 relative rounded-full m-auto text-[15px] font-medium text-gray-2"
                :class="{
                  'text-primary-900': status === 'now',
                  'bg-primary-500 text-white': month === new Date().getMonth() && date === new Date().getDate()
                }"
              >
                {{ date }}
              </span>
            </div>

            <template v-if="events.length">
              <div class="overflow-hidden flex-1">
                <div
                  :id="`event-items-wrap-${index}`"
                  class="event-items-wrap"
                >
                  <template v-for="(event, eventIndex) in events">
                    <div
                      ref="eventRef"
                      :id="`event-item-${index}-${eventIndex}`"
                      :class="[
                        event.type === EVENT_TYPES.EVENT ? 'bg-info-100' : 'bg-warning-100',
                        eventIndex + 1 !== events.length ? 'mb-1' : ''
                      ]"
                      class="rounded-[6px] cursor-pointer px-2 py-1"
                      @click.stop="eventClick(event, index, eventIndex, date, month, year, event.type)"
                    >
                      <span class="block text-[13px] font-semibold text-primary-900 leading-[1]">{{ event.title }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </template>

            <template v-if="events.length > 2">
              <button
                @click.stop="collapseEventList(index)"
                class="flex items-center justify-center absolute bottom-0 right-[50%] translate-x-1/2 translate-y-[16px] z-[1] w-8 h-8 rounded-full bg-primary-500 opacity-0 transition group-hover:opacity-100"
              >
                <base-iconify
                  icon="solar:double-alt-arrow-down-outline"
                  class="text-white"
                  :class="{ 'rotate-180' : !(toggleCount & 1) }"
                />
              </button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </template>

	<!-- Menu -->
	<Teleport to="body">
		<div
			class="event-menu flex flex-col absolute top-0 left-0 w-0 h-0"
		>
			<Transition>
				<template v-if="menuVisible">
					<div class="event-menu-wrapper fixed top-0 bottom-0 w-full pointer-events-none z-[1000]">
						<div ref="menuContainerRef" class="event-menu-container flex flex-col absolute top-0 left-0 right-0 bottom-0 transition-all">
							<div
								ref="menuTopRef"
								class="event-menu-wrapper-top flex-grow min-h-[32px] transition-all"
							></div>

							<div class="event-menu-wrapper-content">
								<div
									ref="menuContentRef"
									class="max-w-[460px] w-full bg-white shadow-calendar-menu rounded-2xl overflow-hidden pointer-events-auto"
								>
                  <div class="flex flex-col w-full max-h-[625px]">
                    <div class="flex items-center justify-between gap-3 border-b border-greyscale-200 py-3 pl-5 pr-3">
                      <div class="flex-1">
                        <template v-if="!calendarStore.isEventClicked">
                          <div class="flex gap-2">
                            <div
                              class="flex items-center gap-2 py-1.5 px-3 rounded cursor-pointer"
                              :class="{ 'bg-greyscale-100': calendarStore.actionTypesMenuSelected.name === 'EventForm' }"
                              @click="calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.EVENT"
                            >
                              <div class="w-3 h-3 rounded-full bg-info-200"></div>
                              <span class="text-sm font-semibold text-primary-900">Мероприятия</span>
                            </div>

                            <div
                              class="flex items-center gap-2 py-1.5 px-3 rounded cursor-pointer"
                              :class="{ 'bg-greyscale-100': calendarStore.actionTypesMenuSelected.name === 'TaskForm' }"
                              @click="calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.TASK"
                            >
                              <div class="w-3 h-3 rounded-full bg-success-200"></div>
                              <span class="text-sm font-semibold text-primary-900">Моя задача</span>
                            </div>
                          </div>
                        </template>

                        <template v-else>
                          <h1 class="text-base font-semibold text-primary-900">
                            {{ calendarStore.actionTypesMenuSelected.name === ACTION_FORM_TYPES.EVENT ? 'Мероприятия' : 'Моя задача' }}
                          </h1>
                        </template>
                      </div>

                      <div class="flex items-center gap-1">
                        <base-button
                          size="small"
                          only-icon
                          rounded
                          text
                          icon-left="solar:maximize-outline"
                          icon-width="!w-4"
                          class="text-greyscale-400"
                          @click="maximizeEvent"
                        />

                        <template v-if="calendarStore.isEventClicked">
                          <base-button
                            size="small"
                            only-icon
                            rounded
                            text
                            icon-left="solar:trash-bin-trash-outline"
                            class="text-critic-500"
                            @click="deleteEvent(
                              calendarStore.actionTypesMenuSelected.name === ACTION_FORM_TYPES.EVENT
                              ? EVENT_TYPES.EVENT
                              : EVENT_TYPES.TASK
                            )"
                          />
                        </template>
                      </div>
                    </div>

                    <div class="flex flex-1 overflow-hidden p-1">
                      <div class="overflow-y-auto py-2 px-4">
                        <component
                          ref="formRef"
                          :is="formComponent"
                          :model="calendarStore.isEventClicked
                            ? calendarStore.updateEventModel
                            : calendarStore.eventModel
                          "
                        />
                      </div>
                    </div>

                    <div class="flex justify-end gap-3 bg-greyscale-50 border-t border-greyscale-200 py-3 px-5">
                      <base-button
                        :label="t('close')"
                        size="normal"
                        border-color="border-transparent"
                        outlined
                        rounded
                        shadow
                        @click="closeEvent"
                      />

                      <template v-if="calendarStore.isEventClicked">
                        <base-button
                          :label="t('update')"
                          size="normal"
                          rounded
                          @click="changeEvent(
                          calendarStore.actionTypesMenuSelected.name === ACTION_FORM_TYPES.EVENT
                            ? EVENT_TYPES.EVENT
                            : EVENT_TYPES.TASK
                          )"
                        />
                      </template>

                      <template v-else>
                        <base-button
                          :label="t('create')"
                          size="normal"
                          rounded
                          @click="createEvent(
                          calendarStore.actionTypesMenuSelected.name === ACTION_FORM_TYPES.EVENT
                            ? EVENT_TYPES.EVENT
                            : EVENT_TYPES.TASK
                          )"
                        />
                      </template>
                    </div>
                  </div>
								</div>
							</div>

							<div
								ref="menuBottomRef"
								class="event-menu-wrapper-bottom flex-grow min-h-[32px] max-h-[32px] transition-all"
							></div>
						</div>
					</div>
				</template>
			</Transition>
		</div>
	</Teleport>
	<!-- /Menu -->
</template>

<style scoped>

</style>
