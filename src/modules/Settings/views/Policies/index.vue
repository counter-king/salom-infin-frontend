<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ActionToolbar } from '@/components/Actions'
import { Plus20SolidIcon, Pen2Icon, TrashBinTrashIcon } from '@/components/Icons'
import RoleDialog from './components/Dialog.vue'
import { usePoliciesStore } from '../../stores/policies.store'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

const route = useRoute()
const policiesStore = usePoliciesStore()
const { t } = useI18n()

const modal = ref(false)
const modalType = ref(FORM_TYPE_CREATE)

watch(
  () => modal.value,
  (value) => {
    if(!value) {
      policiesStore.actionResetModel()
      modalType.value = FORM_TYPE_CREATE
    }
  }
)

const edit = (data, id, type = FORM_TYPE_CREATE) => {
  policiesStore.actionSetRole({ id, ...data })
  modalType.value = type
  modal.value = true
}
const deleteRole = async (id) => {
  if(!confirm(t('really-want-delete'))) {
    return
  }

  try {
    await policiesStore.actionDeletePolicies(id)
    dispatchNotify(null, t('role-deleted'), COLOR_TYPES.SUCCESS)
    await policiesStore.actionListPolicies()
  }
  catch(error) {

  }
}
</script>

<template>
  <div class="access-rights-view h-full">
    <action-toolbar title="access-rights">
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
      :action-list="policiesStore.actionListPolicies"
      :api-params="route.query"
      :headers="policiesStore.headers"
      :value="policiesStore.list"
      :total-count="policiesStore.totalCount"
      scroll-height="calc(100vh - 295px)"
    >
      <template #role="{ data }">
        <span class="text-greyscale-900 font-medium">{{ data.role?.name }}</span>
      </template>

      <template #resource="{ data }">
        <span class="text-greyscale-900 font-medium">{{ data.resource?.display_name }}</span>
      </template>

      <template #action="{ data }">
        <span class="text-greyscale-900 font-medium">{{ t(data.action?.key) }}</span>
      </template>

      <template #effect="{ data }">
        <span class="text-greyscale-900 font-medium">{{ t(data.effect) }}</span>
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

    <template v-if="modal">
      <role-dialog v-model="modal" :type="modalType" />
    </template>
  </div>
</template>
