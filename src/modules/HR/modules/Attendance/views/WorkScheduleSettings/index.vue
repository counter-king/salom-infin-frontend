<script setup>
// Core
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
// Const
import { HR_WORK_SCHEDULE_COLUMNS } from "@/modules/HR/constants"
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { formatTime } from "@/utils/formatDate"
import { dispatchNotify } from "@/utils/notify"
import { adjustStringTimeToInput } from "@/utils"
import { helpers, required } from "@vuelidate/validators"
// Store
import { useWorkScheduleSettingStore } from "@/modules/HR/modules/Attendance/stores/workSchedule.store"
// Components
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import BaseTimePicker from "@/components/UI/BaseTimePicker.vue"
import { ActionToolbar } from "@/components/Actions"
import { CheckCircleBoldIcon, PenIcon, Plus20SolidIcon, TrashBinTrashIcon } from "@/components/Icons"
import { DeleteModal } from "@/modules/HR/modules/BusinessTrip/views/Settings/components/TripPrupose"

// Composable
const store = useWorkScheduleSettingStore()
const { t } = useI18n()

// Reactive
const dialog = ref(false)
const formType = ref(FORM_TYPE_CREATE)
const deleteDialogVisible = ref(false)
const model = ref({
  name_uz: null,
  name_ru: null,
  start_time: null,
  end_time: null,
  __start_time: {hours: 0, minutes: 0, seconds: 0},
  __end_time: {hours: 0, minutes: 0, seconds: 0},
  is_default: false,
})
const rules = {
  name_uz: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  name_ru: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __start_time: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __end_time: {
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
    await store.actionDeleteWorkSchedule()
    dispatchNotify(null, t('successfully-deleted'), COLOR_TYPES.SUCCESS)
    deleteDialogVisible.value = false
    await store.actionGetWorkScheduleList()
  } catch (error) {}
}
const openForm = (val, data) => {
  formType.value = val
  if (val === FORM_TYPE_UPDATE) {
    store.updatingId = data.id
    model.value.name_uz = data.name_uz
    model.value.name_ru = data.name_ru
    model.value.__start_time = {...adjustStringTimeToInput(data.start_time)}
    model.value.__end_time = {...adjustStringTimeToInput(data.end_time)}
    model.value.is_default = data.is_default
  }
  dialog.value = true
}

const create = async (tempModel) => {
  try {
    await store.actionCreateWorkSchedule(tempModel)
    dispatchNotify(null, t('successfully-added'), COLOR_TYPES.SUCCESS)
    dialog.value = false
    await store.actionGetWorkScheduleList({})
  } catch (error) {}
}
const update = async (tempModel) => {
  try {
    await store.actionUpdateWorkSchedule(tempModel)
    dispatchNotify(null, t('successfully-saved'), COLOR_TYPES.SUCCESS)
    dialog.value = false
    await store.actionGetWorkScheduleList({})
  } catch (error) {}
}
const resetStoreModel = () => {
  model.value.name_uz = null
  model.value.name_ru = null
  model.value.start_time = null
  model.value.end_time = null
  model.value.__start_time = {hours: 0, minutes: 0, seconds: 0}
  model.value.__end_time = {hours: 0, minutes: 0, seconds: 0}
  model.value.is_default = false
  $v.value.$reset()
}
const manage = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
  const { __start_time, __end_time } = model.value
  const tempModel = {
    name: model.value.name_uz,
    name_uz: model.value.name_uz,
    name_ru: model.value.name_ru,
    start_time: `${__start_time.hours}:${__start_time.minutes}:00`,
    end_time: `${__end_time.hours}:${__end_time.minutes}:00`,
    is_default: model.value.is_default,
  }
  formType.value === FORM_TYPE_CREATE ? create(tempModel) : update({ id: store.updatingId, body: tempModel })
}

</script>

<template>
  <div class="work-schedule-settings">
    <action-toolbar
      title="schedule-settings"
      :action-list="store.actionGetWorkScheduleList"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_WORK_SCHEDULE_COLUMNS"
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
      :action-list="store.actionGetWorkScheduleList"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.workScheduleList"
      :headers="store.headers"
      :storage-columns-name="HR_WORK_SCHEDULE_COLUMNS"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #name="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ data.name }}</div>
      </template>

      <template #start_time="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ formatTime(data.start_time) }}</div>
      </template>

      <template #end_time="{ data }">
        <div class="text-sm text-greyscale-900 font-medium">{{ formatTime(data.end_time) }}</div>
      </template>

      <template #is_default="{ data }">
        <div
          v-if="data.is_default"
          class="bg-success-50 border border-success-100 flex items-center px-3 py-1 gap-x-[6px] rounded-[80px] w-fit text-success-500"
        >
          <base-iconify :icon="CheckCircleBoldIcon" class="!w-4 !h-4 "/>
          <span class="font-semibold">{{ t('default') }}</span>
        </div>
        <div v-else></div>
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
    :label="formType === FORM_TYPE_CREATE ? 'create-schedule' : 'update-schedule'"
    :draggable="false"
    @emit:after-hide="resetStoreModel"
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

        <base-time-picker
          v-model="$v.__start_time.$model"
          :error="$v.__start_time"
          label="start-time"
          required
        />

        <base-time-picker
          v-model="$v.__end_time.$model"
          :error="$v.__end_time"
          label="end-time"
          required
        />

        <div class="flex items-center justify-between my-4">
          <base-label label="make-schedule-default" />
          <base-switch
            v-model="model.is_default"
            :label="model.is_default ? 'active' : 'non-active'"
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
