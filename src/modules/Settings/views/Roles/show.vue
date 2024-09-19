<script setup>
// Core
import { ref } from 'vue'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import RoleAside from './components/Aside.vue'
import RoleContent from './components/Content.vue'
// Reactive
const loading = ref(true)
</script>

<template>
  <div class="role-show-view h-full">
    <template v-if="!loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs title="Администратор">
        <template #header-end>
          <base-button
            label="save"
            rounded
            type="button"
          />
        </template>

        <template #content>
          <div class="flex h-full">
            <role-aside />

            <role-content />
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
