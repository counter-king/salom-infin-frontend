<script setup>
// Core
import {computed, ref, unref} from 'vue'
import { useI18n } from "vue-i18n"
// Components
import {
  Plus20SolidIcon,
  AltArrowDownLinearIcon,
  ArchiveUpBoldDuotoneIcon,
  StarBoldDuotoneIcon,
  CalendarBoldDuotoneIcon,
  Dialog2BoldDuotoneIcon,
  AltArrowRightIcon
} from '@/components/Icons'
import { SendDocumentMenu, Favourites, Calendar, Chat } from "@/components/Toolbar/components"
// Store

// Composable
const { t } = useI18n()
// Reactive
const opRef = ref(null)
const items = ref([
  {
    id: 1,
    label: 'sending-documents',
    text: 'send-documents-on-case',
    icon: ArchiveUpBoldDuotoneIcon,
    active: true
  },
  {
    id: 2,
    label: 'favourites',
    text: 'selected-actions',
    icon: StarBoldDuotoneIcon,
    active: false
  },
  {
    id: 3,
    label: 'calendar',
    text: 'set-tasks-according-date',
    icon: CalendarBoldDuotoneIcon,
    active: false
  },
  {
    id: 4,
    label: 'chat',
    text: 'chat-with-colleagues',
    icon: Dialog2BoldDuotoneIcon,
    active: false
  }
])

const itemValues = {
  1: SendDocumentMenu,
  2: Favourites,
  3: Calendar,
  4: Chat
}

const selectedComponent = computed(() => {
  return itemValues[items.value.find(i => i.active).id] || SendDocumentMenu
})

// Methods
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
const onHover = (item) => {
  items.value.forEach(i => i.active = i.id === item.id)
}
</script>

<template>
  <base-button
    label="create"
    :icon-left="Plus20SolidIcon"
    :icon-right="AltArrowDownLinearIcon"
    rounded
    type="button"
    aria-haspopup="true"
    aria-controls="overlay_menu"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[941px]"
    menu-class="bg-white mt-6 custom h-[352px]"
    has-overlay
  >
    <div class="bg-greyscale-50 rounded-[20px] p-3">
      <div class="flex">
        <div class="flex flex-col w-1/3 p-1">
          <span class="text-sm text-greyscale-400">{{ t('category') }}</span>

          <div class="flex flex-col gap-y-3 mt-1">
            <div
              v-for="item in items"
              :key="item.label"
              class="flex justify-between items-center w-full rounded-xl group hover:bg-white hover:shadow cursor-pointer transition-all duration-[200ms] py-4 px-3"
              :class="{ 'bg-white shadow' : item.active}"
              @mouseenter="onHover(item)"
            >
              <div class="flex">
                <div
                  class="flex justify-center items-center rounded-full transition-all duration-[200ms] group-hover:bg-primary-30 w-10 h-10"
                  :class="item.active ? 'shadow-none bg-primary-30' : 'bg-white shadow'"
                >
                  <base-iconify
                    :icon="item.icon"
                    class="text-primary-500"
                  />
                </div>

                <div class="flex flex-col justify-center gap-y-1 ml-3">
                  <span class="text-sm text-greyscale-900 font-semibold">{{ t(item.label) }}</span>
                  <span class="text-xs text-greyscale-500">{{ t(item.text) }}</span>
                </div>
              </div>

              <base-iconify
                :icon="AltArrowRightIcon"
                class="group-hover:text-primary-500 transition-all duration-[200ms]"
                :class="item.active ? 'text-primary-500' : 'text-greyscale-400'"
              />
            </div>
          </div>
        </div>

        <div class="flex py-3 px-4 bg-white rounded-xl shadow flex-1 ml-1 pr-0">
          <component
            :is="selectedComponent"
            @emit:select="toggle"
          />
        </div>

      </div>
    </div>
  </base-overlay-panel>

</template>

<style>
.custom:before {
  margin-left: 40px!important;
}
</style>
