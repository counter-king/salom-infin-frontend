<script setup>
// Core
import { ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
// Const
import { HR_ATTENDANCE_REASONS_COLUMNS } from "@/modules/HR/constants"
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
import { helpers, required } from "@vuelidate/validators"
import { resetModel } from "@/utils"
// Store
import { useAttendanceReasonStore } from "@/modules/HR/modules/Attendance/stores/attendanceReason.store"
// Components
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import { ActionToolbar } from "@/components/Actions"
import { CheckCircleBoldIcon, PenIcon, Plus20SolidIcon, TrashBinTrashIcon } from "@/components/Icons"
import { DeleteModal } from "@/modules/HR/modules/BusinessTrip/views/Settings/components/TripPrupose"

// Composable
const { t } = useI18n()
const store = useAttendanceReasonStore()

// Reactive
const dialog = ref(false)
const formType = ref(FORM_TYPE_CREATE)
const deleteDialogVisible = ref(false)
const model = ref({
  code: null,
  name_uz: null,
  name_ru: null,
  description_uz: null,
  description_ru: null,
  is_active: true,
})
const rules = {
  code: {
    required: helpers.withMessage('Поле не должен быть пустым', required),
    twoLetters: helpers.withMessage(
      'Код должен состоять из 2 заглавных латинских букв. (e.g. HR)',
      value => /^[A-Z]{2}$/.test(value || '')
    )
  },
  name_uz: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  name_ru: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description_uz: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description_ru: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const $v = useVuelidate(rules, model)

// Methods
const onRowClick = (row) => {

}
const openDeleteDialog = (data) => {
  store.deletingId = data.id
  deleteDialogVisible.value = true
}
const onDelete = async () => {
  try {
    await store.actionDeleteAttendanceReason()
    dispatchNotify(null, t('successfully-deleted'), COLOR_TYPES.SUCCESS)
    deleteDialogVisible.value = false
    await store.actionGetAttendanceReasonList()
  } catch (error) {
  }
}
const openForm = (val, data) => {
  formType.value = val
  if (val === FORM_TYPE_UPDATE) {
    store.updatingId = data.id
    model.value = JSON.parse(JSON.stringify(data))
  }
  dialog.value = true
}
const create = async (tempModel) => {
  try {
    await store.actionCreateAttendanceReason(tempModel)
    dispatchNotify(null, t('successfully-added'), COLOR_TYPES.SUCCESS)
    dialog.value = false
    await store.actionGetAttendanceReasonList({})
  } catch (error) {
  }
}
const update = async (tempModel) => {
  try {
    await store.actionUpdateAttendanceReason(tempModel)
    dispatchNotify(null, t('successfully-saved'), COLOR_TYPES.SUCCESS)
    dialog.value = false
    await store.actionGetAttendanceReasonList({})
  } catch (error) {
  }
}
const manage = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  const { id, ...rest } = model.value

  const tempModel = {
    ...rest,
    name: rest.name_uz
  }

  if (formType.value === FORM_TYPE_CREATE) {
    await create(tempModel)
  } else {
    await update({ id: store.updatingId, body: tempModel })
  }
}
const sanitizeCode = (val) => {
  return (val || '')
    .replace(/[^A-Za-z]/g, '')  // remove all except Latin letters
    .toUpperCase()              // uppercase
    .slice(0, 2)                // limit to 2 characters
}
const resetFormModel = () => {
  resetModel(model.value)
  $v.value.$reset()
}
</script>

<template>
  <div class="attendance-reasons">
    <action-toolbar
      title="reasons-reference"
      :action-list="store.actionGetAttendanceReasonList"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_ATTENDANCE_REASONS_COLUMNS"
      :action-buttons="[]"
      search-field
    >
      <template #end>
        <base-button
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="openForm(FORM_TYPE_CREATE, null)"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :action-list="store.actionGetAttendanceReasonList"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.attendanceReasonList"
      :headers="store.headers"
      :storage-columns-name="HR_ATTENDANCE_REASONS_COLUMNS"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #name_uz="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ data.name_uz }}</div>
      </template>

      <template #name_ru="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ data.name_ru }}</div>
      </template>

      <template #description="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ data.description }}</div>
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

      <template #action="{ data }">
        <div class="flex items-center gap-x-2">
          <div
            class="flex justify-center items-center w-8 h-8 rounded-lg bg-greyscale-50"
            @click.prevent="openForm(FORM_TYPE_UPDATE, data)"
          >
            <base-iconify
              :icon="PenIcon"
              class="text-greyscale-500"
            />
          </div>

          <div
            class="flex justify-center items-center w-8 h-8 rounded-lg bg-greyscale-50"
            @click.prevent="openDeleteDialog(data)"
          >
            <base-iconify
              :icon="TrashBinTrashIcon"
              class="text-critic-500"
            />
          </div>
        </div>
      </template>
    </base-data-table>
  </div>

  <!-- DIALOG FORM -->
  <base-dialog
    v-model="dialog"
    max-width="max-w-[672px]"
    :label="formType === FORM_TYPE_CREATE ? 'create-reason' : 'update-reason'"
    :draggable="false"
    @emit:after-hide="resetFormModel"
  >
    <template #content>
      <div class="flex flex-col gap-y-4">
        <base-input
          v-model="$v.name_uz.$model"
          :error="$v.name_uz"
          required
          label="name-uz"
          placeholder="name-uz"
        />

        <base-input
          v-model="$v.name_ru.$model"
          :error="$v.name_ru"
          required
          label="name-ru"
          placeholder="name-ru"
        />

        <base-textarea
          v-model="$v.description_uz.$model"
          :error="$v.description_uz"
          :max-length="455"
          label="description"
          label-end="(UZ)"
          required
          placeholder="enter-short-description"
        />

        <base-textarea
          v-model="$v.description_ru.$model"
          :error="$v.description_ru"
          :max-length="455"
          label="description"
          label-end="(RU)"
          required
          placeholder="enter-short-description"
        />

        <base-input
          v-model="$v.code.$model"
          :error="$v.code"
          required
          label="attendance-code"
          placeholder="enter-code"
          @update:model-value="val => $v.code.$model = sanitizeCode(val)"
        />

        <div class="flex items-center justify-between my-4">
          <base-label label="status"/>
          <base-switch
            v-model="model.is_active"
            :label="model.is_active ? 'active' : 'non-active'"
            class-body="!flex !items-center gap-2"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-end w-full">
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="dialog = false"
        />

        <base-button
          label="send"
          :loading="store.buttonLoading"
          rounded
          shadow
          type="button"
          @click="manage"
        />
      </div>
    </template>
  </base-dialog>

  <!-- /DIALOG FORM -->

  <!-- DELETE CONFIRM MODAL -->
  <DeleteModal
    v-model="deleteDialogVisible"
    label="delete"
    :loading="store.deleteButtonLoading"
    :max-width="'max-w-[480px]'"
    :content="{
        title: 'really-want-delete'
      }"
    @click:delete="onDelete"
  />
  <!-- /DELETE CONFIRM MODAL -->
</template>

<style scoped>

</style>
