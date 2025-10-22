<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Components
import Empty from '@/components/Empty.vue'
import PermissionItems from './Items.vue'
// Stores
import { usePermissionStore } from '../../../stores/permissions_copy.store'
// Composable
const route = useRoute()
const permissionStore = usePermissionStore()
// Reactive
const contentLoading = ref(false)
const items = ref([])
// Hooks
onMounted(() => {
  contentLoading.value = true
  items.value = permissionStore.getContentPermission(Number(route.params.id))
  setTimeout(() => {
    contentLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="relative h-full py-5 px-6">
    <template v-if="contentLoading">
      <base-spinner absolute />
    </template>

    <template v-else>
      <template v-if="items.children?.length">
        <permission-items :items="items.children" />
      </template>

      <template v-else>
        <empty title="text-permission" class="!h-full !shadow-none" />
      </template>
    </template>
  </div>
</template>
