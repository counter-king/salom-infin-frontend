<script setup>
// Core
import {ref, unref, nextTick, watch, onMounted} from 'vue'
import { vMaska } from 'maska'
import { onClickOutside } from '@vueuse/core'
// Components
import {
  UserRoundedBoldIcon,
  UserSpeakBoldIcon,
  CityBoldIcon,
  CallMedicineRoundedBoldIcon,
  BuildingsBoldIcon,
  HashtagCircleBoldIcon,
  UsersGroupTwoRoundedBoldIcon,
  BriefCase20SolidIcon,
  UserHandsBoldIcon,
  LetterBoldIcon,
  MapPointBoldIcon,
  GarageBoldIcon,
  PenIcon,
  UnreadLinearIcon
} from '@/components/Icons'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { replaceWithNumbers } from '@/utils/regex'
// Enums
import { COLOR_TYPES } from '@/enums'
import BaseSwitch from "@/components/UI/BaseSwitch.vue";
// Composable
const authStore = useAuthStore()
// Reactive
const inputRef = ref(null)
const ignoreRef = ref(null)
const editIndex = ref(null)
const editValue = ref(null)
const changeValue = ref(false)
const changeLoading = ref(false)
const loadingSave = ref(false)
const items = ref([
  {
    title: 'ФИО Сотрудника',
    description: authStore.currentUser?.full_name ?? '-',
    icon: UserRoundedBoldIcon,
    editable: false
  },
  {
    title: 'Табельный номер',
    description: authStore.currentUser?.table_number ?? '-',
    icon: HashtagCircleBoldIcon,
    editable: false
  },
  {
    title: 'Филиал',
    description: authStore.currentUser?.company?.name ?? '-',
    icon: CityBoldIcon,
    editable: false
  },
  {
    key: 'work_address',
    title: 'Местонахождение',
    description: authStore.currentUser?.work_address ?? '-',
    icon: MapPointBoldIcon,
    editable: true
  },
  {
    title: 'Департамент',
    description: authStore.currentUser?.top_level_department?.name ?? '-',
    icon: BuildingsBoldIcon,
    editable: false
  },
  {
    key: 'floor',
    title: 'Этаж',
    description: authStore.currentUser?.floor ?? '-',
    icon: GarageBoldIcon,
    editable: true
  },
  {
    title: 'Отдел',
    description: authStore.currentUser.department?.name ?? '-',
    icon: UsersGroupTwoRoundedBoldIcon,
    editable: false
  },
  {
    key: 'room_number',
    title: 'Номер комнаты',
    description: authStore.currentUser.room_number ?? '-',
    icon: HashtagCircleBoldIcon,
    editable: true
  },
  {
    title: 'Управления',
    description: authStore.currentUser.parent_dept_name?.name ?? '-',
    icon: UserHandsBoldIcon,
    editable: false
  },
  {
    key: 'cisco',
    title: 'IP-телефона',
    description: authStore.currentUser?.cisco ?? '-',
    icon: CallMedicineRoundedBoldIcon,
    editable: true
  },
  {
    title: 'Должность',
    description: authStore.currentUser?.position?.name ?? '-',
    icon: UserSpeakBoldIcon,
    editable: false
  },
  {
    key: 'show_mobile_number',
    title: 'Личный номер',
    description: authStore.currentUser?.phone ?? '-',
    icon: CallMedicineRoundedBoldIcon,
    editable: false
  },
  {
    key: 'empty',
    title: null,
    description: null,
    icon: null,
    editable: false
  },
  // {
  //   title: 'Опыт работы',
  //   description: authStore.currentUser.begin_work_date ?? '-',
  //   icon: BriefCase20SolidIcon
  // },
  {
    key: 'email',
    title: 'Корп. почта',
    description: authStore.currentUser.email ?? '-',
    icon: LetterBoldIcon,
    editable: true
  },
])
// Watch
// watch(
//   () => editValue.value,
//   (__value) => {
//     if(editIndex.value === 11) {
//       const atIndex = __value.indexOf('@')
//
//       if (atIndex !== -1) {
//         const localPart = __value.slice(0, atIndex).replace(/[^a-zA-Z0-9._%+-]/g, '')
//         const domainPart = __value
//         .slice(atIndex + 1)
//         .replace(/[^sqbuz.]/g, '')
//         .replace(/(s+|q+|b+|u+|z+|\.{2,})/g, match => match[0])
//
//         const validDomain = "sqb.uz".slice(0, domainPart.length)
//
//         editValue.value = `${localPart}@${validDomain}`
//       } else {
//         editValue.value = __value.replace(/[^a-zA-Z0-9._%+-]/g, '')
//       }
//     }
//   }
// )
// onClickOutside(
//   inputRef,
//   () => editIndex.value = null,
//   { ignore: [ignoreRef] }
// )
// Methods
const handleEdit = async (index, value) => {
  editIndex.value = index
  await nextTick()
  const input = unref(inputRef)
  input[0].focus()
  editValue.value = value
}
const handleSave = async (key) => {
  if(key === 'cisco') {
    if(editValue.value.length < 5) {
      dispatchNotify(null, 'Номер должен быть не менее 4 символа', COLOR_TYPES.ERROR)
      return
    }
  }

  if(key === 'email') {
    if(!editValue.value.includes('@sqb.uz')) {
      dispatchNotify(null, 'В почте должен содержать @sqb.uz', COLOR_TYPES.ERROR)
      return
    }
  }

  try {
    let model = {
      [key]: editValue.value
    }

    if(key === 'cisco') {
      Object.assign(model, { normalized_cisco: replaceWithNumbers(editValue.value) })
    }

    loadingSave.value = true

    await authStore.actionCurrentUserUpdate(model)
    setNewItem(key, editValue.value)
    dispatchNotify(null, 'Успешно изменен', COLOR_TYPES.SUCCESS)
    editIndex.value = null
  }
  catch (error) {

  }
  finally {
    setTimeout(() => {
      loadingSave.value = false
    }, 500)
  }
}
const setNewItem = (key, value) => {
  let item = items.value.find((item) => item['key'] === key)
  item.description = value
}
const handleChange = async () => {
  try {
    changeLoading.value = true
    await authStore.actionCurrentUserUpdate({ show_mobile_number: changeValue.value })
    dispatchNotify(null, 'Успешно изменен', COLOR_TYPES.SUCCESS)
  }
  catch (error) {
  }
  finally {
    setTimeout(() => {
      changeLoading.value = false
    }, 500)
  }
}
// Hooks
onMounted(() => {
  changeValue.value = authStore.currentUser.show_mobile_number
})
</script>
<template>
  <div class="worker-view px-4">
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <template v-for="(item, index) in items">
        <div
          class="group col-span-1 flex transition-colors hover:bg-primary-10 h-20 relative rounded-xl p-4 after:hover:bg-transparent after:content after:transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-greyscale-70"
          :class="{ 'opacity-0': item.key === 'empty' }"
        >
          <div class="w-9 h-9">
            <base-iconify :icon="item.icon" class="!w-6 !h-6 transition-colors text-greyscale-400 group-hover:text-primary-500" />
          </div>
          <div class="flex-1 relative">
            <div class="relative z-[2] mr-14">
              <h1 class="text-sm font-medium text-greyscale-500 mb-1">{{ item.title }}</h1>

              <template v-if="editIndex === index">
                <input
                  ref="inputRef"
                  v-model="editValue"
                  v-maska
                  :data-maska="item.key === 'cisco' ? '##-##' : undefined"
                  type="text"
                  class="w-full border-b-[2px] border-b-primary-500 bg-transparent outline-none"
                />
              </template>

              <template v-else>
                <template v-if="item.key === 'show_mobile_number'">
                  <input
                    :value="item.description"
                    v-maska
                    data-maska="+### ## ### ## ##"
                    type="text"
                    readonly
                    class="w-full border-transparent bg-transparent outline-none"
                  />
                </template>

                <template v-else>
                  <p class="font-semibold text-greyscale-900">{{ item.description }}</p>
                </template>
              </template>
            </div>

            <template v-if="item.editable">
              <template v-if="editIndex === index">
                <button
                  type="button"
                  class="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full absolute right-0 top-2 z-[2] cursor-pointer"
                  @click="handleSave(item.key)"
                >
                  <base-spinner
                    v-if="loadingSave"
                    app-classes="bg-white rounded-full"
                    root-classes="!w-5 !h-5"
                  />

                  <base-iconify
                    v-else
                    :icon="UnreadLinearIcon"
                    class="!w-6 !h-6 text-white"
                  />
                </button>
              </template>

              <template v-else>
                <div
                  class="edit-group flex items-center justify-center w-8 h-8 bg-greyscale-50 border border-greyscale-100 rounded-full absolute right-0 top-2 cursor-pointer"
                  @click="handleEdit(index, item.description)"
                >
                  <base-iconify :icon="PenIcon" class="!w-4 !h-4 text-primary-500" />
                </div>
              </template>
            </template>

            <template v-if="item.key === 'show_mobile_number'">
              <div
                v-tooltip.top="{
                  value: `<h4 class='text-xs text-white text-center -my-1'>${changeValue ? 'Скрыть личный номер в справочнике' : 'Показать личный номер в справочнике'}</h4>`,
                  escape: true
                }"
                class="flex items-center justify-center absolute right-0 top-2 cursor-pointer"
              >
                <template v-if="changeLoading">
                  <base-spinner
                    app-classes="bg-white rounded-full"
                    root-classes="!w-5 !h-5"
                  />
                </template>

                <template v-else>
                  <base-switch
                    v-model="changeValue"
                    @emit:change="handleChange"
                    class-switch-root="mr-0"
                  />
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.edit-group:hover {
  @apply bg-primary-500
}

.edit-group:hover svg {
  color: #fff;
}
</style>
