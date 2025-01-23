<script setup>
// Core
import { ref } from 'vue'
// Components
import { StatusChip } from '@/components/Chips'
import { VerticalCard, VerticalCardItem } from '@/components/Card/Vertical'
// Enum
import { CONDITION } from '../enums';
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      name: '',
      users: []
    })
  }
})
// Reactive
const modal = ref(false)
const select = ref({
  full_name: null,
  username: null,
  cisco: null,
  email: null,
  status: {
    name: null,
    code: null
  },
  position: null
})
</script>

<template>
  <div class="w-full">
    <div class="table-header flex border-b-[1.5px] border-greyscale-200">
      <div class="flex items-center flex-1 font-semibold truncate py-[10px] px-4">
        <span class="text-xs text-greyscale-500 mr-1">Департамент:</span>

        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="top-level" :value="props.item.name">
            {{ props.item.name }}
          </slot>
        </span>
      </div>

      <div class="flex items-center flex-1 font-semibold truncate py-[10px] px-4">
        <span class="text-xs text-greyscale-500 mr-1">Отдел:</span>

        <span class="max-w-[425px] text-sm text-primary-500 truncate">
          <slot name="department" :value="props.item.name">
            {{ props.item.name }}
          </slot>
        </span>
      </div>

      <div class="max-w-[150px] w-full py-[10px] px-4"></div>

      <div class="max-w-[225px] w-full flex items-center font-semibold py-[10px] px-4">
        <!-- <span class="text-xs text-greyscale-500 mr-1">Filial:</span>

        <span class="text-sm text-primary-500">Головной офис</span> -->
      </div>

      <div class="max-w-[225px] w-full py-[10px] px-4"></div>
    </div>

    <template v-if="props.item.users.length > 0 && props.item.condition !== CONDITION.A">
      <h1 class="text-sm font-medium text-greyscale-900 text-center pt-3 pb-2">Здесь пока нет сотрудников</h1>
    </template>

    <template v-else>
      <template v-for="(user, index) in props.item.users">
        <div
          class="flex border-b-[1.5px] border-greyscale-100"
          :class="{
            'bg-primary-10' : index % 2 === 0,
            'mb-2': props.item.users.length - 1 === index
          }"
        >
          <div class="flex flex-1 py-3 px-4 cursor-pointer" @click="modal = true; select = user">
            <div class="flex items-center gap-3">
              <base-avatar
                :label="user.full_name"
                :color="user.color ?? '#635AFF'"
                :image="user?.avatar?.url"
                :meta="user"
                shape="circle"
                detail-dialog
                avatar-classes="w-6 h-6"
              />

              <span class="text-sm font-medium text-greyscale-900">{{ user.full_name }}</span>
            </div>
          </div>

          <div class="flex-1 py-3 px-4 cursor-pointer" @click="modal = true; select = user">
            <span class="text-sm font-medium text-greyscale-900">{{ user.position?.name ?? '-' }}</span>
          </div>

          <div class="max-w-[150px] w-full py-3 px-4 cursor-pointer" @click="modal = true; select = user">
            <!-- TODO: исправить потом -->
            <status-chip type="handbook" :status="user.status">
              {{ user.status.name }}
            </status-chip>
          </div>

          <div class="max-w-[225px] w-full py-3 px-4 cursor-pointer" @click="modal = true; select = user">
            <span class="text-sm font-medium text-greyscale-900">{{ user.cisco ?? '-' }}</span>
          </div>

          <div class="max-w-[225px] w-full py-3 px-4 cursor-pointer" @click="modal = true; select = user">
            <span class="text-sm font-medium text-greyscale-900">{{ user.email ?? '-' }}</span>
          </div>
        </div>
      </template>
    </template>
  </div>

  <!-- Dialog -->
  <base-dialog
    v-model="modal"
    max-width="max-w-[540px]"
    header-classes="relative border-none rounded-tl-[20px] rounded-tr-[20px]"
    content-classes="overflow-visible pt-0 pb-6"
  >
    <template #header>
      <span></span>
      <div class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-4px)] bg-primary-30 rounded-tl-2xl rounded-tr-2xl"></div>
    </template>

    <template #content>
      <div>
        <div class="relative -mt-10 pl-4">
          <div class="flex justify-center items-center w-[90px] h-[90px] rounded-full bg-white">
            <base-avatar
              :label="select.full_name"
              :color="select.color ?? '#635AFF'"
              avatarClasses="w-20 h-20"
              :image="select?.avatar?.url"
            >
              <span class="text-3xl font-semibold text-white">{{ select.full_name[0] }}</span>
            </base-avatar>
          </div>

          <div class="mt-1">
            <div>
              <h1 class="text-greyscale-900 font-bold text-base mb-1">{{ select.full_name }}</h1>
              <span class="block text-xs font-medium text-greyscale-500">{{ select.position?.name }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <vertical-card>
            <vertical-card-item title="branch" :description="select?.company?.name" />

            <vertical-card-item title="department" :description="select?.top_level_department?.name" />

            <vertical-card-item title="division" :description="select?.department?.name" />

            <vertical-card-item title="corp-mail" :description="select.email" />

            <vertical-card-item title="ip-phone" :description="select.cisco" />
          </vertical-card>
        </div>
      </div>
    </template>
  </base-dialog>
  <!-- /Dialog -->
</template>
