<script setup>
// Core
import { ref } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon } from '@/components/Icons'
import RoleDialog from './components/Dialog.vue'
// Stores
import { useRolesStore } from '../../stores/roles.store'
// Const
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const rolesStore = useRolesStore()
// Reactive
const modal = ref(false)
const type = ref(FORM_TYPE_CREATE)
// Methods
const link = (data) => {
  return {
    name: 'RolesID',
    params: {
      id: data.id
    }
  }
}
</script>

<template>
  <div class="roles-view h-full">
    <action-toolbar title="Роли">
      <template #filters>
        <base-button
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="modal = !modal"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :action-list="rolesStore.actionGetList"
      :headers="rolesStore.headers"
      :value="rolesStore.list"
      :total-count="rolesStore.totalCount"
    >
      <template #name="{ data }">
        <linkable-cell :to="link(data)">
          123
        </linkable-cell>
      </template>
    </base-data-table>

    <role-dialog v-model="modal" :type="type" />
  </div>
</template>
