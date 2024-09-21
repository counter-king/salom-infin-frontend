<script setup>
// Core
import { useRoute } from 'vue-router'
// Components
import RoleItem from './Item.vue'
// Stores
import { usePermissionStore } from '../../../stores/permissions.store'
// Composable
const route = useRoute()
const permissionStore = usePermissionStore()
</script>

<template>
  <div class="role-aside-view max-w-[306px] w-full border-r border-r-greyscale-200">
    <div class="h-full overflow-y-auto p-5">
      <template v-for="permission in permissionStore.list">
        <router-link
          :to="{
            name: 'RolesPermissionId',
            params: {
              id: route.params.id,
              permissionId: permission.id
            }
          }"
        >
          <role-item :item="permission" />
        </router-link>
      </template>
    </div>
  </div>
</template>
