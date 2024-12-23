<script setup>
// Core
import { useRoute } from 'vue-router'
// Components
import { ActionToolbar } from '@/components/Actions'
import Empty from '@/components/Empty.vue'
import PermissionAside from './components/Aside.vue'
// Stores
import { usePermissionStore } from '../../stores/permissions.store'
// Composable
const route = useRoute()
const permissionStore = usePermissionStore()
</script>

<template>
  <div class="permissions-view h-full">
    <action-toolbar title="access-rights">
      <template #filters>
        <span></span>
      </template>
    </action-toolbar>

    <div class="flex shadow-button rounded-xl bg-white h-[calc(100vh-185px)]">
      <permission-aside />

      <template v-if="route.params.id && permissionStore.list.length">
        <router-view :key="route.fullPath" />
      </template>

      <template v-else>
        <div class="flex-1">
          <empty title="choose-access-right-from-list" class="!h-full !shadow-none"  />
        </div>
      </template>
    </div>
  </div>
</template>
