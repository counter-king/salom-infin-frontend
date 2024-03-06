<script setup>
// Core
import { ref, toRaw, unref, onMounted } from 'vue'
import Listbox from 'primevue/listbox'
// Utils
import { getStorageItem, removeStorageItem, saveStorageItem } from '@/utils/storage'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
import { DASHBOARD_DOC_FLOW_SETTINGS } from '../../enums'
// Macros
const emit = defineEmits(['emit:change'])
// Reactive
const menuRef = ref(null)
const options = ref([
  {
    name: 'На рассмотрение',
    icon: 'BoldGreenClockCircleIcon',
    avatarColor: 'bg-success-50',
    status: true,
    key: 'for_review',
    route: 'ReviewIndex',
    order: 1
  },
  {
    name: 'Поручения',
    icon: 'BoldPrimaryRoundArrowRightDownIcon',
    avatarColor: 'bg-primary-50',
    status: true,
    key: 'assignments',
    route: 'AssignmentIndex',
    order: 2
  },
  {
    name: 'На подпись',
    icon: 'BoldInfoMessageCoverIcon',
    avatarColor: 'bg-info-50',
    status: true,
    key: 'for_signature',
    route: 'SignIndex',
    order: 3
  },
  {
    name: 'На согласование',
    icon: 'BoldPrimaryFileCheckIcon',
    avatarColor: 'bg-primary-50',
    status: true,
    key: 'for_approval',
    route: 'ApprovalIndex',
    order: 4
  },
  // {
  //   name: 'На обзоре',
  //   icon: 'BoldWarningCursorIcon',
  //   avatarColor: 'bg-warning-50',
  //   status: true,
  //   key: null,
  //   route: 'ReviewIndex',
  //   order: 5
  // },
  // {
  //   name: 'Не выполнено',
  //   icon: 'BoldCriticCloseCircleIcon',
  //   avatarColor: 'bg-critic-50',
  //   status: true,
  //   key: null,
  //   route: 'AssignmentIndex',
  //   order: 6
  // },
  // {
  //   name: 'Просроченный',
  //   icon: 'BoldGreyCalendarIcon',
  //   avatarColor: 'bg-greyscale-50',
  //   status: true,
  //   key: null,
  //   route: 'AssignmentIndex',
  //   order: 7
  // },
  // {
  //   name: 'Для подтверждения',
  //   icon: 'BoldGreenFolderFavIcon',
  //   avatarColor: 'bg-success-50',
  //   status: true,
  //   key: null,
  //   route: 'AssignmentIndex',
  //   order: 8
  // },
])
const selected = ref([])
const active = ref([])
// Methods
const handleSettings = ({ value }) => {
  active.value = options.value.map(setting => ({
    ...setting,
    status: toRaw(value.find(column => column.name === setting.name))?.status ?? false
  }))

  emit('emit:change', active.value)
}
const save = (event) => {
  callback('save', event)
}
const reset = (event) => {
  active.value = options.value
  selected.value = active.value

  callback('reset', event)
}
const callback = (state, event) => {
  switch (state) {
    case 'save':
      saveStorageItem(DASHBOARD_DOC_FLOW_SETTINGS, JSON.stringify(active.value))
      break;
    default: // reset
      removeStorageItem(DASHBOARD_DOC_FLOW_SETTINGS)
  }

  dispatchNotify(
    state === 'save' ? 'Фильтр сохранен' : 'Фильтр сброшен',
    null,
    COLOR_TYPES.SUCCESS
  )
  toggle(event)
  emit('emit:change', active.value)
}
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.opRef.toggle(event)
}
// Hooks
onMounted(() => {
  const settingStorage = JSON.parse(getStorageItem(DASHBOARD_DOC_FLOW_SETTINGS))

  if(settingStorage && settingStorage.length > 0) {
    active.value = settingStorage
    selected.value = settingStorage.filter(setting => setting.status)
  }
  else {
    active.value = selected.value = options.value
  }

  emit('emit:change', active.value)
})
</script>

<template>
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
    ref="menuRef"
    width="w-60"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <div class="p-2">
      <Listbox
        v-model="selected"
        :options="options"
        multiple
        option-label="name"
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
              <base-icon
                name="CheckCircleBgIcon"
                width="20"
                height="20"
                type="primary"
                class="checked-icon fill-primary-500"
              />

              <div class="unchecked-icon w-5 h-5 border border-greyscale-200 rounded-full"></div>
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
          @click="reset($event)"
        />

        <base-button
          label="save"
          :rounded="true"
          shadow
          type="button"
          size="small"
          border-color="border-transparent"
          button-class="w-[100px]"
          @click="save($event)"
        />
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>
.checked-icon,
.p-highlight .unchecked-icon {
  display: none;
}

.p-highlight .checked-icon {
  display: block;
}
</style>
