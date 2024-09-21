<script setup>
// Components
import { TrashBinTrashIcon } from '@/components/Icons'
import PermissionCreate from './Create.vue'
// Stores
import { usePermissionStore } from '../../../stores/permissions.store'
// Constants
import { FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const permissionStore = usePermissionStore()
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number
  },
  items: {
    type: Array,
    default: () => []
  },
  parent: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:deleted'])
// Methods
const deletePermission = async (event, id, index, list) => {
  event.preventDefault()
  event.stopImmediatePropagation()

  if(!confirm(`Действительно хотите удалить ?`)) {
    return
  }

  try {
    await permissionStore.deletePermission({ id, index, list, emit: emit('emit:deleted') })
  }
  finally {

  }
}
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-tooltip.top="{
        value: `<h4 class='text-xs text-white -my-1'>Удалить</h4>`,
        escape: true,
        autoHide: false
      }"
      @click="deletePermission($event, item.id, index, props.items)"
    >
      <base-iconify :icon="TrashBinTrashIcon" class="text-critic-500" />
    </button>

    <permission-create
      v-tooltip.top="{
        value: `<h4 class='text-xs text-white -my-1'>Изменить</h4>`,
        escape: true,
        autoHide: false
      }"
      :type="FORM_TYPE_UPDATE"
      :list="props.items"
      :item="item"
      :index="index"
      :parent="props.parent"
      only-icon
      compact
    />

    <permission-create
      v-tooltip.top="{
        value: `<h4 class='text-xs text-white -my-1'>Создать</h4>`,
        escape: true,
        autoHide: false
      }"
      :item="item"
      :list="item.children"
      only-icon
      compact
    />
  </div>
</template>
