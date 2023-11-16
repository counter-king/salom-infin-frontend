<script setup>
// Core
import { ref } from 'vue'
// Components
import BaseMultiSelect from "@/components/UI/BaseMultiSelect.vue"
// Reactive
const select = ref([])
</script>

<template>
  <div class="flex gap-10 p-10">
    <base-multi-select
      v-model="select"
      api-url="users"
      display="chip"
      :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
      class="w-1/4"
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

      <template #removetokenicon="{ item }">
        <base-icon name="XIcon" width="16" height="16" class="ml-[6px] hover:text-critic-500" />
      </template>

      <template #hint="{ value }">
        <div class="flex items-center gap-2 bg-white shadow-md cursor-pointer rounded-2xl border-t border-r border-l border-greyscale-100 py-[0.375rem] px-[0.75rem]">
          <base-avatar
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            shape="circle"
            avatar-classes="w-5 h-5"
          />

          <h1 class="text-xs font-semibold text-primary-900">{{ value.full_name }}</h1>
        </div>
      </template>
    </base-multi-select>
  </div>
</template>

<style scoped>

</style>
