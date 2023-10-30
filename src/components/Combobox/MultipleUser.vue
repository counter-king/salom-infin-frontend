<script setup>
// State
import { useUsersStore } from "@/stores/users.store"
// Composable
const userStore = useUsersStore()
// Macros
const props = defineProps({
  border: {
    type: Boolean
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'create'
  },
  borderColor: {
    type: String
  },
  display: {
    type: String,
    default: 'comma',
    validator(value) {
      return ['comma', 'chip'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" />

    <base-multi-select
      v-bind="props"
      api-url="users"
      :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
    >
      <template #chip="{ value }">
        <div class="flex items-center gap-2">
          <base-avatar
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            avatar-classes="w-5 h-5"
          />

          <h1 class="text-xs font-semibold text-primary-900">{{ value.full_name }}</h1>
        </div>
      </template>

      <template #option="{ value }">
        <div class="flex items-center gap-2">
          <base-avatar
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            avatar-classes="w-6 h-6"
          />

          <h1 class="text-sm font-medium text-primary-900">{{ value.full_name }}</h1>
        </div>
      </template>

      <template #removetokenicon="{ click }">
        <base-icon name="XIcon" width="16" height="16" class="ml-[6px] hover:text-critic-500" />
      </template>
    </base-multi-select>
  </div>
</template>

<style scoped>
</style>
