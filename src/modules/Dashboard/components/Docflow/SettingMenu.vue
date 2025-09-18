<script setup>
// Core
import { ref, toRaw, unref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Listbox from 'primevue/listbox'
// Components
import {
	CalendarDateBoldIcon, CheckCircleBoldIcon,
	ClockCircleBoldIcon,
	CloseCircleBoldIcon,
	CursorSquareBoldIcon,
	FileCheckBoldIcon,
	FolderFavouriteStarBoldIcon,
	PenNewRoundBoldIcon,
	RoundArrowRightDownBoldIcon, SettingsMinimalisticIcon
} from '@/components/Icons'
// Utils
import { getStorageItem, removeStorageItem, saveStorageItem } from '@/utils/storage'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
import { DASHBOARD_DOC_FLOW_SETTINGS } from '../../enums'
// Composable
const { t, locale } = useI18n()
// Macros
const emit = defineEmits(['emit:change'])
// Reactive
const menuRef = ref(null)
const options = ref([])
const selected = ref([])
const active = ref([])
// Watch
watch(
  () => locale.value,
  () => {
    options.value = [
      {
        name: 'reviewers',
        icon: ClockCircleBoldIcon,
        avatarColor: 'bg-success-50',
        iconColor: 'text-success-500',
        status: true,
        key: 'for_review',
        route: {
          name: 'ReviewIndex',
          new: {
            query: {
              is_read: 'False'
            }
          },
          inProgress: {
            query: {
              status_type: 'in_progress'
            }
          }
        },
        order: 1
      },
      {
        name: 'assignment',
        icon: RoundArrowRightDownBoldIcon,
        avatarColor: 'bg-primary-50',
        iconColor: 'text-primary-500',
        status: true,
        key: 'assignments',
        route: {
          name: 'AssignmentIndex',
          new: {
            query: {
              is_read: 'False'
            }
          },
          inProgress: {
            query: {
              status_type: 'in_progress'
            }
          }
        },
        order: 2
      },
      {
        name: 'for_signing',
        icon: PenNewRoundBoldIcon,
        avatarColor: 'bg-info-50',
        iconColor: 'text-info-500',
        status: true,
        key: 'for_signature',
        route: {
          name: 'SignIndex',
          new: {
            query: {
              approved: 'none'
            }
          },
          inProgress: {
            query: {
              is_read: false
            }
          }
        },
        order: 3
      },
      {
        name: 'for-approval',
        icon: FileCheckBoldIcon,
        avatarColor: 'bg-primary-50',
        iconColor: 'text-primary-500',
        status: true,
        key: 'for_approval',
        route: {
          name: 'ApprovalIndex',
          new: {
            query: {
              signed: 'none'
            }
          },
          inProgress: {
            query: {
              signed: false
            }
          }
        },
        order: 4
      },
      {
        name: 'on-review',
        icon: CursorSquareBoldIcon,
        avatarColor: 'bg-warning-50',
        iconColor: 'text-warning-500',
        status: true,
        key: null,
        route: {
          name: 'ReviewIndex',
          new: {
            query: {
              signed: 'none'
            }
          },
          inProgress: {
            query: {
              signed: false
            }
          }
        },
        order: 5
      },
      // {
      //   name: 'not-fulfilled',
      //   icon: CloseCircleBoldIcon,
      //   avatarColor: 'bg-critic-50',
      //   iconColor: 'text-critic-500',
      //   status: true,
      //   key: null,
      //   route: {
      //     name: 'AssignmentIndex',
      //     new: {
      //       query: {
      //         signed: 'none'
      //       }
      //     },
      //     inProgress: {
      //       query: {
      //         signed: false
      //       }
      //     }
      //   },
      //   order: 6
      // },
      {
        name: 'expired',
        icon: CalendarDateBoldIcon,
        avatarColor: 'bg-greyscale-50',
        iconColor: 'text-greyscale-500',
        status: true,
        key: null,
        route: {
          name: 'AssignmentIndex',
          new: {
            query: {
              signed: 'none'
            }
          },
          inProgress: {
            query: {
              signed: false
            }
          }
        },
        order: 7
      },
      // {
      //   name: 'to-confirm',
      //   icon: FolderFavouriteStarBoldIcon,
      //   avatarColor: 'bg-success-50',
      //   iconColor: 'text-success-500',
      //   status: true,
      //   key: null,
      //   route: {
      //     name: 'AssignmentIndex',
      //     new: {
      //       query: {
      //         signed: 'none'
      //       }
      //     },
      //     inProgress: {
      //       query: {
      //         signed: false
      //       }
      //     }
      //   },
      //   order: 8
      // },
    ]
  },
  {
    immediate: true
  }
)
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
    null,
    state === 'save' ? t('filter-saved') : t('filter-reset'),
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
    label="tune"
    :icon-left="SettingsMinimalisticIcon"
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
              <base-iconify
                :icon="CheckCircleBoldIcon"
                type="primary"
                class="checked-icon"
              />

              <div class="unchecked-icon w-5 h-5 border border-greyscale-200 rounded-full"></div>
            </div>

            <span class="flex-1 text-greyscale-900 font-medium">{{ t(option?.name) }}</span>
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
