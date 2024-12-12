<script setup>
// Core
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// Components
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon, Pen2Icon } from '@/components/Icons'
import RoleDialog from './components/Dialog.vue'
// Stores
import { useRolesStore } from '../../stores/roles.store'
// Utils
import { formatDateHour } from '@/utils/formatDate'
// Const
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const route = useRoute()
const rolesStore = useRolesStore()
// Reactive
const modal = ref(false)
const modalType = ref(FORM_TYPE_CREATE)
// Methods
const edit = (data, id, type = FORM_TYPE_CREATE) => {
  rolesStore.setRole({ id, ... data })
  modalType.value = type
  modal.value = true
}
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
      :api-params="route.query"
      :headers="rolesStore.headers"
      :value="rolesStore.list"
      :total-count="rolesStore.totalCount"
      scroll-height="calc(100vh - 295px)"
    >
      <template #name="{ data }">
        <linkable-cell :to="link(data)">
          <span class="text-greyscale-900 font-medium">{{ data.name }}</span>
        </linkable-cell>
      </template>

      <template #created_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDateHour(data.created_date) }}
        </linkable-cell>
      </template>

      <template #actions="{ data }">
        <base-button
          :icon-left="Pen2Icon"
          only-icon
          severity="secondary"
          text
          class="shadow-none py-[7px] px-2 text-xs bg-greyscale-50 mr-2 rounded-[8px]"
          v-tooltip.top="{
            autoHide: false,
            escape: true,
            value: `<h4 class='text-xs text-white -my-1'>Изменить</h4>`,
          }"
          @click="edit(data, data.id, FORM_TYPE_UPDATE)"
        >
        </base-button>
      </template>
    </base-data-table>

    <role-dialog v-model="modal" :type="modalType" />
  </div>
</template>
