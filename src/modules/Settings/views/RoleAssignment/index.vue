<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { UserWithLabel } from '@/components/Users'
import { Plus20SolidIcon, Pen2Icon, TrashBinTrashIcon } from '@/components/Icons'
import RoleAssignmentDialog from './components/Dialog.vue'
import { useAssignmentRolesStore } from '../../stores/assignment-roles.store'
import { adjustUserObjectToArray, clearModel } from '@/utils'
import { formatDateCalendar, formatDateHour } from '@/utils/formatDate'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

const route = useRoute()
const assignmentRolesStore = useAssignmentRolesStore()
const { t } = useI18n()

const modal = ref(false)
const modalType = ref(FORM_TYPE_CREATE)

watch(
  () => modal.value,
  (value) => {
    if(!value) {
      clearModel(assignmentRolesStore.createModel, ['enabled', 'org_key'])
      modalType.value = FORM_TYPE_CREATE
    }
  }
)

const edit = async (data, id, type = FORM_TYPE_CREATE) => {
  assignmentRolesStore.setRole({
    id,
    ...data,
    valid_from: formatDateCalendar(data.valid_from),
    valid_until: formatDateCalendar(data.valid_until),
    __role: data.role,
    __user: await adjustUserObjectToArray([], data.user.id, false)
  })
  modalType.value = type
  modal.value = true
}
const deleteAssignmentRole = async (id) => {
  if(!confirm(t('really-want-delete'))) {
    return
  }

  try {
    await assignmentRolesStore.deleteAssignmentRole(id)
    dispatchNotify(null, t('deleted-role-assignment'), COLOR_TYPES.SUCCESS)
    await assignmentRolesStore.getAssignmentRoleList()
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
      <template #user="{ data }">
        <linkable-cell :to="link(data)">
          <user-with-label
            :label="data.user?.first_name"
            :color="data.user?.color"
            :image="data.user?.avatar?.url"
            :title="`${data.user?.last_name} ${data.user?.first_name}`"
          />
        </linkable-cell>
      </template>

      <template #role="{ data }">
        <linkable-cell :to="link(data)">
          {{ data.role?.name }}
        </linkable-cell>
      </template>

      <template #valid_from="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDateCalendar(data.valid_from) }}
        </linkable-cell>
      </template>

      <template #valid_until="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDateCalendar(data.valid_until) }}
        </linkable-cell>
      </template>

      <template #modified_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDateHour(data.modified_date) }}
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
          @click="deleteAssignmentRole(data.id)"
        >
        </base-button>
      </template>
    </base-data-table>

    <template v-if="modal">
      <role-assignment-dialog v-model="modal" :type="modalType" />
    </template>
  </div>
</template>
