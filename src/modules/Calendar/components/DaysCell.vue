<script setup>
// Core
import { ref, inject, unref, nextTick, shallowRef, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import ActionTypesMenu from './ActionTypesMenu.vue'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { clearModel } from '@/utils'
// Enums
import { EVENT_TYPES, ACTION_FORM_TYPES } from '../enums'
// Macros
const props = defineProps({
	interval: {
		type: Array,
		default: () => []
	},
	events: {
		type: Array,
		default: () => []
	}
})
// Inject
const { daysList } = inject('calendar')
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const calendarStore = useCalendarStore()
// Reactive
const menuContainerRef = ref(null)
const menuTopRef = ref(null)
const menuContentRef = ref(null)
const menuBottomRef = ref(null)
const eventRef = ref(null)
const formRef = ref(null)
const formComponent = shallowRef(null)
const menuVisible = ref(false)
const toggleCount = ref(1)
const isEventClicked = ref(false)
// Methods
const collapseEventList = (index) => {
	const _eventsListRef = document.querySelector(`#events-list-${index}`)
	const _eventItemsWrapRef = document.querySelector(`#event-items-wrap-${index}`)

	if(toggleCount.value & 1) {
		_eventsListRef.classList.add('shadow-calendar-cell')
		_eventsListRef.style.height = `${_eventItemsWrapRef.clientHeight + 70}px`
		_eventsListRef.style.zIndex = 3
	}
	else {
		_eventsListRef.classList.remove('shadow-calendar-cell')
		_eventsListRef.style.height = null
		_eventsListRef.style.zIndex = null
	}

	toggleCount.value = toggleCount.value + 1
}
const cellClick = async (cellIndex, date, month, year) => {
  clearModel(calendarStore.updateEventModel, ['type'])
  menuVisible.value = true
  calendarStore.actionToggleEventClick(false)
  await nextTick()
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: year,
      m: month,
      d: date
    }
  })

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
}
const eventClick = async (event, cellIndex, eventIndex, date, month, year, update) => {
  if(update) {
    calendarStore.actionToggleEventClick(true)
  }

	calendarStore.actionSetEventModel(event)
	menuVisible.value = true
	await nextTick()
  await router.replace({
    name: 'CalendarDate',
    params: {
      ...route.params,
      y: year,
      m: month,
      d: date
    }
  })

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
	<div
		class="grid grid-cols-7 grid-rows-5 flex-1"
		:class="{ 'grid-rows-6' : daysList.length > 35 }"
	>
		<template v-for="({ date, month, year, status, events, format }, index) in props.interval">
			<div
				class="group relative transition-all [&:not(:nth-child(7n))]:border-r border-t border-greyscale-200 p-2"
				@click="cellClick(index, date, month, year)"
			>
				<div
					:id="`events-list-${index}`"
          :class="{ '!bg-greyscale-50': status !== 'now' }"
          class="events-list flex flex-col bg-white absolute top-0 left-0 w-full h-full border-[2px] border-transparent transition-all rounded-lg p-2 group-hover:border-primary-500"
				>
					<div class="h-7">
		        <span
			        class="relative text-base font-medium text-gray-2 block text-center"
			        :class="{ 'text-primary-900': status === 'now' }"
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
										@click.stop="eventClick(event, index, eventIndex, date, month, year, true)"
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
							<base-icon
								name="DoubleAltArrowDownIcon"
								class="text-white"
								:class="{ 'rotate-180' : !(toggleCount & 1) }"
							/>
						</button>
					</template>
				</div>
			</div>
		</template>
	</div>

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
                          <action-types-menu>
                            <template #text="{ text }">
                              <h1 class="text-base font-semibold text-primary-900">{{ text }}</h1>
                            </template>
                          </action-types-menu>
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
                          icon-left="MaximizeIcon"
                          icon-width="16"
                          class="text-greyscale-400"
                          @click="maximizeEvent"
                        />

                        <template v-if="calendarStore.isEventClicked">
                          <base-button
                            size="small"
                            only-icon
                            rounded
                            text
                            icon-left="TrashIcon"
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
