<script setup>
// Components
import { StatusChip } from '@/components/Chips'
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
</script>

<template>
  <div class="w-full">
    <div class="table-header flex border-b-[1.5px] border-primary-300">
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
        <span class="text-xs text-greyscale-500 mr-1">Filial:</span>

        <span class="text-sm text-primary-500">Головной офис</span>
      </div>

      <div class="max-w-[225px] w-full py-[10px] px-4"></div>
    </div>

    <template v-if="!props.item.users.length">
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
          <div class="flex flex-1 py-3 px-4">
            <div class="flex items-center gap-3">
              <base-avatar
                :label="user.full_name"
                color="#635AFF"
                shape="circle"
                avatar-classes="w-6 h-6"
              />

              <span class="text-sm font-medium text-greyscale-900">{{ user.full_name }}</span>
            </div>
          </div>

          <div class="flex-1 py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.position }}</span>
          </div>

          <div class="max-w-[150px] w-full py-3 px-4">
            <!-- TODO: испавить потом -->
            <template v-if="user.status === 'V rabote'">
              <status-chip :status="{ id: 13 }">
                {{ user.status }}
              </status-chip>
            </template>
          </div>

          <div class="max-w-[225px] w-full py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.cisco ?? '-' }}</span>
          </div>

          <div class="max-w-[225px] w-full py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.email ?? '-' }}</span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
