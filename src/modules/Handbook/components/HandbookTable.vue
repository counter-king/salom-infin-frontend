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
  <table class="w-full !bg-white">
    <thead>
      <tr>
        <th width="500" class="font-semibold py-[10px]">
          <div class="flex items-center px-4 truncate">
            <span class="text-xs text-greyscale-500 mr-1">Департамент:</span>

            <span class="max-w-[425px] text-sm text-primary-500 truncate">
              <slot name="top-level" :value="props.item.name">
                {{ props.item.name }}
              </slot>
            </span>
          </div>
        </th>

        <th width="500" class="font-semibold py-[10px]">
          <div class="flex items-center px-4 truncate">
            <span class="text-xs text-greyscale-500 mr-1">Отдел:</span>

            <span class="max-w-[425px] text-sm text-primary-500 truncate">
              <slot name="department" :value="props.item.name">
                {{ props.item.name }}
              </slot>
            </span>
          </div>
        </th>

        <th width="225" class="font-semibold py-[10px]">
          <div class="px-4"></div>
        </th>

        <th width="225" class="font-semibold py-[10px]">
          <div class="px-4">
            <span class="text-xs text-greyscale-500 mr-1">Filial:</span>

            <span class="text-sm text-primary-500">Головной офис</span>
          </div>
        </th>

        <th width="225" class="font-semibold py-[10px]">
          <div class="px-4"></div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="!props.item.users.length">
        <td colspan="5">
          <h1 class="text-sm font-medium text-greyscale-900 text-center">Здесь пока нет сотрудников</h1>
        </td>
      </tr>

      <template v-else>
        <tr v-for="user in props.item.users">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <base-avatar
                :label="user.full_name"
                color="#635AFF"
                shape="circle"
                avatar-classes="w-6 h-6"
              />

              <span class="text-sm font-medium text-greyscale-900">{{ user.full_name }}</span>
            </div>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.position }}</span>
          </td>

          <td class="py-3 px-4">
            <!-- TODO: испавить потом -->
            <template v-if="user.status === 'V rabote'">
              <status-chip :status="{ id: 13 }">
                {{ user.status }}
              </status-chip>
            </template>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.cisco ?? '-' }}</span>
          </td>

          <td class="py-3 px-4">
            <span class="text-sm font-medium text-greyscale-900">{{ user.email ?? '-' }}</span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
