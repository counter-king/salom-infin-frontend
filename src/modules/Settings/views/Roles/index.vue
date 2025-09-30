<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon, Pen2Icon, TrashBinTrashIcon } from '@/components/Icons'
import RoleDialog from './components/Dialog.vue'
import { useRolesStore } from '../../stores/roles.store'
import { formatDateHour } from '@/utils/formatDate'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

const route = useRoute()
const rolesStore = useRolesStore()
const { t } = useI18n()

const modal = ref(false)
const modalType = ref(FORM_TYPE_CREATE)

const edit = (data, id, type = FORM_TYPE_CREATE) => {
  rolesStore.setRole({ id, ...data })
  modalType.value = type
  modal.value = true
}
const deleteRole = async (id) => {
  if(!confirm(t('really-want-delete'))) {
    return
  }

  try {
    await rolesStore.deleteRole(id)
    dispatchNotify(null, t('role-deleted'), COLOR_TYPES.SUCCESS)
    await rolesStore.getRoleList()
  }
  catch(error) {

  }
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
    <action-toolbar title="roles">
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
      :action-list="rolesStore.getRoleList"
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
            value: `<h4 class='text-xs text-white -my-1'>${ t('update') }</h4>`
          }"
          @click="edit(data, data.id, FORM_TYPE_UPDATE)"
        >
        </base-button>

        <base-button
          :icon-left="TrashBinTrashIcon"
          only-icon
          severity="danger"
          text
          class="shadow-none py-[7px] px-2 text-xs bg-greyscale-50 mr-2 rounded-[8px]"
          v-tooltip.top="{
            autoHide: false,
            escape: true,
            value: `<h4 class='text-xs text-white -my-1'>${ t('delete') }</h4>`
          }"
          @click="deleteRole(data.id)"
        >
        </base-button>
      </template>
    </base-data-table>

    <role-dialog v-model="modal" :type="modalType" />
  </div>
</template>
