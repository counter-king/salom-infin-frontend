<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon, Pen2Icon } from '@/components/Icons'
import RoleAssignmentDialog from './components/Dialog.vue'
import { useAssignmentRolesStore } from '../../stores/assignment-roles.store'
import { formatDateHour } from '@/utils/formatDate'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'

const route = useRoute()
const assignmentRolesStore = useAssignmentRolesStore()
const { t } = useI18n()

const modal = ref(false)
const modalType = ref(FORM_TYPE_CREATE)

const edit = (data, id, type = FORM_TYPE_CREATE) => {
  assignmentRolesStore.setRole({ id, ... data })
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
    <action-toolbar title="role-assignment">
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
      :action-list="assignmentRolesStore.getAssignmentRoleList"
      :api-params="route.query"
      :headers="assignmentRolesStore.headers"
      :value="assignmentRolesStore.list"
      :total-count="assignmentRolesStore.totalCount"
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
            value: `<h4 class='text-xs text-white -my-1'>${ t('update') }</h4>`
          }"
          @click="edit(data, data.id, FORM_TYPE_UPDATE)"
        >
        </base-button>
      </template>
    </base-data-table>

    <role-assignment-dialog v-model="modal" :type="modalType" />
  </div>
</template>
