<script setup>
// Core
import { ref, unref, shallowRef, watch, defineAsyncComponent } from 'vue'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import ActionTypesMenu from './ActionTypesMenu.vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCalendarStore } from '../stores/calendar.store'
// Utils
import { clearModel } from '@/utils'
import { EVENT_TYPES, ACTION_FORM_TYPES } from '../enums'
// Composable
const commonStore = useCommonStore()
const calendarStore = useCalendarStore()
// Reactive
const sidebarRef = ref(null)
const actionTypesMenuRef = ref(null)
const actionTypesMenuComponent = shallowRef(null)
// Methods
const createEvent = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _actionTypesMenuRef = unref(actionTypesMenuRef)
  const valid = await _actionTypesMenuRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    await calendarStore.actionCreateEvent(
      calendarStore.actionTypesMenuSelected.name === ACTION_FORM_TYPES.EVENT
        ? EVENT_TYPES.EVENT
        : EVENT_TYPES.TASK
    )
    _sidebarRef.successButtonLoading = false
    calendarStore.eventSidebar = false
  }
  catch (error) {

  }
  finally {
    _sidebarRef.successButtonLoading = false
  }
}
const emitCancelButton = (value) => {
	calendarStore.eventSidebar = value
	clearModel(calendarStore.eventModel)
}
// Watch
watch(() => calendarStore.actionTypesMenuSelected.name, (value) => {
  actionTypesMenuComponent.value = defineAsyncComponent({
    loader: () => import(`./${value}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
</script>

<template>
  <base-sidebar
    ref="sidebarRef"
    v-model="calendarStore.eventSidebar"
    success-text="create"
    @emit:cancel-button="(value) => emitCancelButton(value)"
    @emit:success-button="createEvent"
  >
    <template #title>
      <action-types-menu />
    </template>

    <template #content>
      <component
        ref="actionTypesMenuRef"
        :is="actionTypesMenuComponent"
      />
    </template>
  </base-sidebar>
</template>

<style scoped>

</style>
