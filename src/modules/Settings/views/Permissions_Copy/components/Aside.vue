<script setup>
// Core
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// Components
import PermissionCreate from './Create.vue'
import PermissionItems from './Items.vue'
import PermissionItem from './Item.vue'
// Stores
import { usePermissionStore } from '../../../stores/permissions_copy.store'
// Composable
const router = useRouter()
const permissionStore = usePermissionStore()
// Computed
const notAdditional = computed(() => permissionStore.list.filter(item => !(item.doc_sub_type || item.doc_type || item.journal)))
const additional = computed(() => permissionStore.list.filter(item => item.doc_sub_type || item.doc_type || item.journal))
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
  <div class="w-[320px] overflow-y-auto border-r border-greyscale-200 p-5">
    <div class="space-y-1">
      <template v-if="permissionStore.list.length">
        <permission-items :items="notAdditional">
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

        <div class="border-t-[1.5px] border-t-greyscale-200 my-1"></div>

        <permission-items :items="additional">
          <template #item="{ item, index, items }">
            <router-link :to="{ name: 'PermissionContent', params: { id: item.id } }">
              <permission-item
                :item="item"
                :index="index"
                :items="items"
                parent
                @emit:deleted="() => router.push({ name: 'PermissionsIndex' })"
              />
            </router-link>
          </template>
        </permission-items>
      </template>

      <permission-create :list="permissionStore.list" parent @emit:created="afterCreated" />
    </div>
  </div>
</template>

<style scoped>
.router-link-active > div {
  @apply bg-greyscale-50
}
</style>
