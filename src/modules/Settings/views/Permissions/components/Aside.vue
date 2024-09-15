<script setup>
// Core
import { useRouter } from 'vue-router'
// Components
import PermissionCreate from './Create.vue'
import PermissionItems from './Items.vue'
import PermissionItem from './Item.vue'
// Stores
import { usePermissionStore } from '../../../stores/permissions.store'
// Composable
const router = useRouter()
const permissionStore = usePermissionStore()
// Methods
const afterCreated = async (value) => {
  await router.push({
    name: 'PermissionContent',
    params: {
      id: value.id
    }
  })
}
</script>

<template>
  <div class="w-[320px] border-r border-greyscale-200 p-5">
    <div class="space-y-1">
      <template v-if="permissionStore.list.length">
        <permission-items :items="permissionStore.list">
          <template #item="{ item, index, items }">
            <router-link :to="{ name: 'PermissionContent', params: { id: item.id } }">
              <permission-item
                :item="item"
                :index="index"
                :items="items"
                @emit:deleted="() => router.push({ name: 'PermissionsIndex' })"
              />
            </router-link>
          </template>
        </permission-items>
      </template>

      <permission-create :list="permissionStore.list" @emit:created="afterCreated" />
    </div>
  </div>
</template>

<style scoped>
.router-link-active > div {
  @apply bg-greyscale-50
}
</style>
