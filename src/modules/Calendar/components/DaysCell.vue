<script setup>
// Core
import { ref, inject, unref } from 'vue'
// Enums
import { EVENT_TYPES } from '../enums'
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
// Reactive
const menuContainerRef = ref(null)
const menuTopRef = ref(null)
const menuBottomRef = ref(null)
const menuVisible = ref(false)
const toggleCount = ref(1)
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
const eventClick = (cellIndex, eventIndex) => {
	const _menuContainerRef = unref(menuContainerRef)
	const _menuTopRef = unref(menuTopRef)
	const _menuBottomRef = unref(menuBottomRef)
	const _eventItemRef = document.querySelector(`#event-item-${cellIndex}-${eventIndex}`)
	const directions = _eventItemRef.getBoundingClientRect()

	menuVisible.value = true
	// Right direction
	if(directions.left) {
		_menuContainerRef.style.marginLeft = `${directions.left + directions.width}px`
		_menuTopRef.style.maxHeight = `${directions.top}px`
	}

	console.log(directions)
	console.log(_menuContainerRef)
}
</script>

<template>
	<div
		class="grid grid-cols-7 grid-rows-5 flex-1"
		:class="{ 'grid-rows-6' : daysList.length > 35 }"
	>
		<template v-for="({ date, status, events }, index) in props.interval">
			<div
				class="group bg-greyscale-50 relative transition-all [&:not(:nth-child(7n))]:border-r border-t border-greyscale-200 p-2"
				:class="{ 'bg-white': status === 'now' }"
			>
				<div
					:id="`events-list-${index}`"
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
										:id="`event-item-${index}-${eventIndex}`"
										:class="[
		                  event.type === EVENT_TYPES.EVENT ? 'bg-info-100' : 'bg-warning-100',
		                  eventIndex + 1 !== events.length ? 'mb-1' : ''
		                ]"
										class="rounded-[6px] cursor-pointer px-2 py-1"
										@click="eventClick(index, eventIndex)"
									>
										<span class="block text-[13px] font-semibold text-primary-900 leading-[1]">{{ event.title }}</span>
									</div>
								</template>
							</div>
						</div>
					</template>

					<template v-if="events.length > 2">
						<button
							@click="collapseEventList(index)"
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
		<div class="event-menu flex flex-col absolute top-0 left-0 w-0 h-0">
			<Transition name="fade">
				<template v-if="menuVisible">
					<div class="event-menu-wrapper fixed top-0 bottom-0 w-full pointer-events-none z-[1005] opacity-100">
						<div ref="menuContainerRef" class="event-menu-container flex flex-col absolute top-0 left-0 right-0 bottom-0">
							<div
								ref="menuTopRef"
								class="event-menu-wrapper-top min-h-[32px] flex-1"
							></div>

							<div class="event-menu-wrapper-content">
								123456
							</div>

							<div
								ref="menuBottomRef"
								class="event-menu-wrapper-bottom min-h-[32px] flex-1"
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
