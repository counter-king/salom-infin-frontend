<script setup>
// Stores
import { useRolesStore } from '../../../stores/roles.store'
// Composable
const rolesStore = useRolesStore()
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
// Methods
const handleCheckbox = (event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
}
</script>

<template>
  <div class="role-item-view flex items-center gap-3 h-11 transition-colors hover:bg-greyscale-50 rounded-xl px-3">
    <Checkbox
      v-model="rolesStore.createModel.permissions"
      :value="item.id"
      :pt="{
        root: {
          class: 'flex items-center'
        },
        input:{
          class: 'w-[18px] h-[18px] rounded'
        }
      }"
      @click="handleCheckbox($event)"
    />

    <span class="text-[15px] font-semibold text-greyscale-900">{{ item.name }}</span>
  </div>
</template>
