<script setup>
// Core
import { ref, unref, onMounted } from 'vue'
import Listbox from 'primevue/listbox'
// Components
import WidgetWrapper from '../WidgetWrapper.vue'
import { DocFlowNewCount, DocFlowInProgressCount, DocFlowAllCount } from '../Docflow'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { getStorageItem, removeStorageItem, saveStorageItem } from '@/utils/storage'
// Enums
import { COLOR_TYPES } from '@/enums'
import { DASHBOARD_DOC_FLOW_SETTINGS } from '../../enums'
// Reactive
const overlayPanelRef = ref(null)
const activeTabMenuIndex = ref(0)
const tabMenuItems = ref([
  {
    label: 'Новые',
    name: 'Preview',
  },
  {
    label: 'В процессе',
    name: 'History',
  },
  {
    label: 'Все',
    name: 'Comments',
  }
])
const settingOptions = ref([
  {
    name: 'На рассмотрение',
    icon: 'BoldGreenClockCircleIcon',
    avatarColor: 'bg-success-50',
    status: true,
    key: 'for_review',
    count: 0,
    order: 1
  },
  {
    name: 'Поручения',
    icon: 'BoldPrimaryRoundArrowRightDownIcon',
    avatarColor: 'bg-primary-50',
    status: true,
    key: 'assignments',
    count: 0,
    order: 2
  },
  {
    name: 'На подпись',
    icon: 'BoldInfoMessageCoverIcon',
    avatarColor: 'bg-info-50',
    status: true,
    key: 'for_signature',
    count: 0,
    order: 3
  },
  {
    name: 'На согласование',
    icon: 'BoldPrimaryFileCheckIcon',
    avatarColor: 'bg-primary-50',
    status: true,
    key: 'for_approval',
    count: 0,
    order: 4
  },
  {
    name: 'На обзоре',
    icon: 'BoldWarningCursorIcon',
    avatarColor: 'bg-warning-50',
    status: true,
    key: null,
    count: 0,
    order: 5
  },
  {
    name: 'Не выполнено',
    icon: 'BoldCriticCloseCircleIcon',
    avatarColor: 'bg-critic-50',
    status: true,
    key: null,
    count: 0,
    order: 6
  },
  {
    name: 'Просроченный',
    icon: 'BoldGreyCalendarIcon',
    avatarColor: 'bg-greyscale-50',
    status: true,
    key: null,
    count: 0,
    order: 7
  },
  {
    name: 'Для подтверждения',
    icon: 'BoldGreenFolderFavIcon',
    avatarColor: 'bg-success-50',
    status: true,
    key: null,
    count: 0,
    order: 8
  },
])
const selectedSetting = ref(settingOptions.value)
const activeSettings = ref(settingOptions.value)
// Methods
const handleSettings = ({ value }) => {
  activeSettings.value = settingOptions.value.map(setting => ({
    ...setting,
    status: value.find(column => column.name === setting.name)?.status
  }))
}
const activeStatus = (list, name) => {
  return list.find(item => item.name === name)?.status
}
const toggle = (event) => {
  const _overlayPanelRef = unref(overlayPanelRef)
  _overlayPanelRef.opRef.toggle(event)
}
const saveSettings = (event) => {
  saveStorageItem(DASHBOARD_DOC_FLOW_SETTINGS, JSON.stringify(activeSettings.value))
  dispatchNotify('Фильтр сохранен', null, COLOR_TYPES.SUCCESS)
  toggle(event)
}
const resetSettings = (event) => {
  removeStorageItem(DASHBOARD_DOC_FLOW_SETTINGS)
  activeSettings.value = settingOptions.value
  dispatchNotify('Фильтр сброшен', null, COLOR_TYPES.SUCCESS)
  toggle(event)
}
// Hooks
onMounted(() => {
  const settingStorage = JSON.parse(getStorageItem(DASHBOARD_DOC_FLOW_SETTINGS))

  if(settingStorage && settingStorage.length > 0) {
    activeSettings.value = JSON.parse(getStorageItem(DASHBOARD_DOC_FLOW_SETTINGS))
  }
})
</script>

<template>
  <widget-wrapper title="incoming">
    <template #header-after>
      <div class="flex items-center">
        <base-tab-menu
          v-model="activeTabMenuIndex"
          :tab-items="tabMenuItems"
          bricks
        />

        <div class="bg-greyscale-200 w-[1px] h-4 ml-2 mx-2"></div>

        <base-button
          :rounded="false"
          rounded
          shadow
          size="small"
          label="Настроить"
          icon-left="SettingsMinimalisticIcon"
          icon-width="16"
          icon-height="16"
          button-class="bg-transparent text-greyscale-500 !text-sm border-none shadow-none !rounded-[6px] !py-1 !px-2 hover:bg-greyscale-50"
          @click="toggle"
        />

        <base-overlay-panel
          ref="overlayPanelRef"
          width="w-60"
          menu-class="bg-white mt-1 overflow-hidden"
        >
          <div class="p-2">
            <Listbox
              v-model="selectedSetting"
              :options="settingOptions"
              multiple
              optionLabel="name"
              @change="handleSettings"
              :pt="{
                root: [
                  'border-none shadow-none'
                ],
                list: [
                  'p-0'
                ],
                item: [
                  'bg-transparent text-sm font-medium p-0 rounded-lg mb-1 hover:!bg-greyscale-50'
                ]
              }"
            >
              <template #option="{ option }">
                <div class="flex items-center gap-2 py-[10px] px-3 rounded-xl">
                  <div class="w-5 h-5">
                    <template v-if="activeStatus(activeSettings, option?.name)">
                      <base-icon
                        name="CheckCircleBgIcon"
                        width="20"
                        height="20"
                        type="primary"
                        class="fill-primary-500"
                      />
                    </template>

                    <template v-else>
                      <div class="w-5 h-5 border border-greyscale-200 rounded-full"></div>
                    </template>
                  </div>

                  <span class="flex-1 text-greyscale-900 font-medium">{{ option?.name }}</span>
                </div>
              </template>
            </Listbox>
          </div>

          <template #actions>
            <div class="flex justify-center gap-2 p-1">
              <base-button
                label="reset"
                :rounded="true"
                shadow
                type="button"
                size="small"
                border-color="border-transparent"
                button-class="w-[100px] bg-white text-primary-900 hover:bg-greyscale-100"
                @click="resetSettings($event)"
              />

              <base-button
                label="save"
                :rounded="true"
                shadow
                type="button"
                size="small"
                border-color="border-transparent"
                button-class="w-[100px]"
                @click="saveSettings($event)"
              />
            </div>
          </template>
        </base-overlay-panel>
      </div>
    </template>

    <template #content>
      <div class="bg-greyscale-50 h-full p-3 pr-[6px] rounded-xl">
        <div class="h-full pr-2 overflow-y-auto">
          <div class="grid grid-rows-2 grid-cols-4 gap-2 relative h-full">
            <template v-if="activeTabMenuIndex === 0">
              <doc-flow-new-count :list="activeSettings" />
            </template>

            <template v-if="activeTabMenuIndex === 1">
              <doc-flow-in-progress-count :list="activeSettings" />
            </template>

            <template v-if="activeTabMenuIndex === 2">
              <doc-flow-all-count :list="activeSettings" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </widget-wrapper>
</template>

<style>

</style>
