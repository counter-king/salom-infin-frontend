<script setup>
// Core
import { computed, ref, reactive, useModel, onMounted, watch, nextTick} from "vue"
import { useI18n } from "vue-i18n"
import useVuelidate from "@vuelidate/core"
import { helpers, required } from "@vuelidate/validators"
// Utils
import { dispatchNotify } from "@/utils/notify"
// Enums
import { COLOR_TYPES } from "@/enums"
// Store
import { useAttendanceReasonStore } from "@/modules/HR/modules/Attendance/stores/attendanceReason.store"
import { useAttendanceExpectionsStore } from "@/modules/HR/modules/MyActivities/store/attendanceExceptions.store"

// Components
import { UserWithRadio } from "@/components/Users"
import BaseTextarea from "@/components/UI/BaseTextarea.vue"
import AttendanceViolationAlert from "@/modules/Dashboard/components/Attendance/AttendanceViolationAlert.vue"

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  reasonList: {
    type: Array,
  },
  apiCallAfterSubmit: {
    type: Function,
    default: () => void 0
  }
})

// composables
const {t, locale } = useI18n()
const modelValue = useModel(props, 'modelValue')
const reasonList = useModel(props, 'reasonList')
const attendanceReasonStore = useAttendanceReasonStore()
const reasonStore = useAttendanceExpectionsStore()

const formModelList = ref([])

const sendButtonLoading = ref(false)

const formModelListRules = {
  $each: helpers.forEach({
    reason: {
      required: helpers.withMessage(`Поле не должен быть пустым`, required)
    }
  })
}

const $vList = useVuelidate(formModelListRules, formModelList, { $lazy: true, })

// Methods
const send = async () => {
  await sendSeparateReasoneForEach()
}

const sendSeparateReasoneForEach = async () => {
  const validList = await $vList.value.$validate()
  if (!validList) {
    dispatchNotify(null, t('fill-in-all-required-fields'), COLOR_TYPES.ERROR)
    return
  }
  try {
    sendButtonLoading.value = true
    const body = formModelList.value.map(item => {
      return ({ attendance: item.attendance, kind: item.kind, reason: item.reason, note: item.note, attachments: item.__attachments.map(item => ({ id: item.id }))})
    })
    console.log("body", body)
    await reasonStore.createAttendanceReason(body)
    props.apiCallAfterSubmit && props.apiCallAfterSubmit()
    formModelList.length > 1 && dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
    modelValue.value = false
    $vList.value.$reset()
  } catch (e) {
    console.log("error", e)
  }
  finally {
    sendButtonLoading.value = false
  }
}

onMounted(async () => {
  attendanceReasonStore.actionGetAttendanceReasonList()
  formModelList.value = reasonList.value?.map(item => ({
    attendance: item.attendance,
    kind: item.kind,
    reason: "",
    note: "",
    date: item.date,
    first_check_in: item.first_check_in,
    last_check_out: item.last_check_out,
    late_minutes: item.late_minutes,
    early_leave_minutes: item.early_leave_minutes,
    __attachments: []
  }))
})

</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[631px]"
    :draggable="false"
    content-classes="p-6"
  >
    <template #header>
      <span class="font-semibold text-xl">{{ t('enter-reason') }}</span>
    </template>

    <template #content>
      <template v-for="(item, index) in formModelList" :key="item.id">
        <div 
          class="rounded-2xl bg-white p-2 mb-4" 
          :class="props.reasonList?.length > 1 ? 'shadow border border-greyscale-100 p-4' : ''"
        >
          <div class="flex flex-col gap-y-6">
            <AttendanceViolationAlert :data="item" />
            <base-dropdown
              v-model="item.reason"
              v-model:options="attendanceReasonStore.attendanceReasonList"
              :error="$vList.$each.$response?.$data[index]?.reason"
              required
              label="late-came-reason"
              placeholder="select-reason"
              :option-label="locale === 'uz' ? 'name_uz' : 'name_ru'"
              option-value="id"
            >
              <template #option="{ option }">
                <user-with-radio
                  :title="locale === 'uz' ? option.name_uz : option.name_ru"
                  :text-truncate="false"  
                >
                </user-with-radio>
              </template>
            </base-dropdown>

            <base-file-upload
              :files="item.__attachments"
              label="attach-file"
              @emit:file-upload="(files) => item.__attachments = files"
            />
            <base-textarea
              v-model="item.note"
              :label="t('note')"
              :placeholder="t('enter-note')"
            />
          </div>
        </div>
      </template>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <base-button
          label="cancel"
          rounded
          shadow
          border-color="border-transparent"
          outlined
          class="mr-3"
          :loading="sendButtonLoading"
          @click="modelValue = false"
        />
        <base-button
          label="send"
          rounded
          shadow
          border-color="border-transparent"
          :loading="sendButtonLoading"
          @click="send"
        />
      </div>
    </template>

  </base-dialog>
</template>

<style scoped>
:deep(.tab-active){
  border-radius: 8px !important;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 4px 6px 0 rgba(53, 61, 73, 0.05)
}
</style>
