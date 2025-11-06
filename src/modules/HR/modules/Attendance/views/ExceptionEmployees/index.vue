<script setup>
// Core
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
// Enums
import { HR_EXCEPTION_EMPLOYEES_COLUMNS } from "@/modules/HR/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { formatDate } from "@/utils/formatDate"
import { dispatchNotify } from "@/utils/notify"
// Store
import { useExceptionEmployeesStore } from "@/modules/HR/modules/Attendance/stores/exceptionEmployees.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import { AddPlusIcon, CheckCircleBoldIcon } from "@/components/Icons"
import { DeleteModal } from "@/modules/HR/modules/BusinessTrip/views/Settings/components/TripPrupose"
import FormDialog from "@/modules/HR/modules/Attendance/views/ExceptionEmployees/FormDialog.vue"

// Composable
const route = useRoute()
const store = useExceptionEmployeesStore()
const { t } = useI18n()

// Methods
const onSort = (event) => {

}
const openForm = () => {
  store.dialog = true
}
const onDeactivateClick = () => {
  store.deleteDialog = true
}
const manage = async () => {
  if (!store.deactivation_comment) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }
  await store.actionDeactivate(t, route)
}
</script>

<template>
  <div>
    <action-toolbar
      :action-buttons="[]"
      title="exception-employees"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_EXCEPTION_EMPLOYEES_COLUMNS"
      search-field
      :action-list="store.actionGetExceptionEmployees"
      @emit:reset-headers="store.resetHeaders"
    >
      <template #end>
        <base-button
          color="bg-primary-0 hover:bg-greyscale-100 text-critic-500"
          border-color="border-transparent"
          label="deactivate"
          icon-color="#F3335C"
          :icon-left="AddPlusIcon"
          rounded
          shadow
          type="button"
          :disabled="!(store.selectedItems && store.selectedItems.length)"
          @click="onDeactivateClick"
        />

        <base-button
          label="add"
          rounded
          type="button"
          @click="openForm"
        />
      </template>
    </action-toolbar>

    <BaseDataTableV2
      v-model:selection="store.selectedItems"
      :action-list="store.actionGetExceptionEmployees"
      :headers="store.headers"
      :value="store.list"
      scroll-height="calc(100vh - 295px)"
      class="flex flex-col h-full"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :storage-columns-name="HR_EXCEPTION_EMPLOYEES_COLUMNS"
      :pageSize="15"
      selective
      @emit:onSort="onSort"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:on-page-change="store.selectedItems = null"
    >
      <template #user="{ data }">
        <div class="flex items-center gap-3">
          <base-avatar
            :label="data.user?.full_name"
            :image="null"
            :color="data.user?.color"
            detail-dialog
            :meta="data.user"
            avatarClasses="w-7 h-7"
          >
            <span class="text-xs font-semibold text-white">{{ data.user?.full_name[0] }}</span>
          </base-avatar>
          <div class="text-sm font-medium text-greyscale-900">{{ data.user?.full_name }}</div>
        </div>
      </template>

      <template #company="{ data }">
        {{ data?.user?.company?.name }}
      </template>

      <template #department="{ data }">
        {{ data?.user?.top_level_department?.name }}
      </template>

      <template #position="{ data }">
        {{ data?.user?.position?.name }}
      </template>

      <template #valid_from="{ data }">
        {{ formatDate(data.valid_from) }}
      </template>

      <template #valid_to="{ data }">
        {{ formatDate(data.valid_to) }}
      </template>

      <template #is_active="{ data }">
        <div
          class="border flex items-center px-3 py-1 gap-x-[6px] rounded-[80px] w-fit "
          :class="data.is_active ? 'bg-success-50 border-success-100 text-success-500' : 'bg-greyscale-50 border-greyscale-100 text-greyscale-500'"
        >
          <base-iconify :icon="CheckCircleBoldIcon" class="!w-4 !h-4 "/>
          <span class="font-semibold">{{ data.is_active ? t('active') : t('non-active') }}</span>
        </div>
      </template>
    </BaseDataTableV2>

    <!-- FORM DIALOG -->
    <form-dialog />
    <!-- /FORM DIALOG -->

    <!-- DEACTIVATE CONFIRM MODAL -->
    <DeleteModal
      v-model="store.deleteDialog"
      label="deactivate"
      :loading="store.deleteLoading"
      :max-width="'max-w-[480px]'"
      confirm-button-label="deactivate"
      :content="{
        title: 'really-want-deactivate'
      }"
      :icon-visible="false"
      @click:delete="manage"
    >
      <template #additional-content>
        <base-textarea
          v-model="store.deactivation_comment"
          label="basis"
          placeholder="enter-basis"
          required
          class="mt-8"
        />
      </template>
    </DeleteModal>
    <!-- /DEACTIVATE CONFIRM MODAL -->

  </div>
</template>

<style scoped>

</style>
