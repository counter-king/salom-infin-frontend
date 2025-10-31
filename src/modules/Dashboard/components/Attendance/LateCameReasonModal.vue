<script setup>
// Core
import { computed, ref, reactive, useModel, onMounted, watch, nextTick} from "vue"
import { useI18n } from "vue-i18n"
import useVuelidate from "@vuelidate/core"
import { helpers, required } from "@vuelidate/validators"
// Utils
import { formatDate } from "@/utils/formatDate"
import { returnLateTime } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
// Enums
import { COLOR_TYPES } from "@/enums"
// Store
import { useNotificationStore } from "@/modules/Dashboard/stores/notification.store"
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

// Reactive
const formModel = reactive({
  reason: "",
  note: "",
  __attachments: []
})

const formModelList = ref([])

const activeTabIndex = ref(0)

const sendButtonLoading = ref(false)

const rules = {
  reason: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const formModelListRules = {
  $each: helpers.forEach({
    reason: {
      required: helpers.withMessage(`Поле не должен быть пустым`, required)
    }
  })
}

const $v = useVuelidate(rules, formModel)
const $vList = useVuelidate(formModelListRules, formModelList, { $lazy: true, })

const isShowMoreReasoneTabPanel = computed(() => {
  return reasonList.value?.length > 1 
})

// Methods
const send = async () => {
  if(isShowMoreReasoneTabPanel.value) {
    await sendTabPanel()
  } else {
    await sendReason()
  }
}

const sendTabPanel = async () => {
  if(activeTabIndex.value === 1) {
    await sendSeparateReasoneForEach()
  } else {
    await sendOneReasonForAll()
  }
}

const sendReason = async () => {

  const valid = await $v.value.$validate()
  if (!valid) return
  try {

   sendButtonLoading.value = true
   const body = { ...formModel, kind: reasonList.value[0]?.kind, attendance: reasonList.value[0].attendance, attachments: formModel.__attachments.map(item => ({ id: item.id })) }

   reasonStore.createAttendanceReason(body)
   props.apiCallAfterSubmit && props.apiCallAfterSubmit()
   dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
   modelValue.value = false
   $v.value.$reset()
 } catch (e) {

 }
  finally {
    sendButtonLoading.value = false
  }
}

const sendOneReasonForAll = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
  try {
    sendButtonLoading.value = true
    const body = reasonList.value.map(item => {
      return { attendance: item.attendance, kind: item.kind, reason: formModel.reason, note: formModel.note, attachments: formModel.__attachments.map(item => ({ id: item.id })) }
    })
    await reasonStore.createAttendanceReason(body)
    props.apiCallAfterSubmit && props.apiCallAfterSubmit()
    dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
    modelValue.value = false
    $v.value.$reset()
  }
  catch (e) {
    console.log("error", e)
  }
  finally {
    sendButtonLoading.value = false
  }
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

    await reasonStore.createAttendanceReason(body)
    props.apiCallAfterSubmit && props.apiCallAfterSubmit()
    dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
    modelValue.value = false
    $vList.value.$reset()
  } catch (e) {
    console.log("error", e)
  }
  finally {
    sendButtonLoading.value = false
  }
}

const tabPanelList = [
  {
    title: 'one-reason-for-all',
    slot: 'oneReasonForAll',
  },
  {
    title: 'separate-reason-for-each',
    slot: 'separateReasonForEach',
  }
];
// Emits
const onTabChange = (value) => {
  activeTabIndex.value = value.index
}

onMounted(async () => {
  attendanceReasonStore.actionGetAttendanceReasonList()
  if(reasonList.value?.length > 0) {
    setTimeout(() => {
      formModelList.value = reasonList.value.map(item => ({
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
    }, 300)
  }
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
      <!-- if there are more then one reasons, show tab panel -->
      <div v-if="isShowMoreReasoneTabPanel" class="">
        <base-brick-tab
          :active-index="activeTabIndex"
          :tab-panel-list="tabPanelList"
          panel-container-class="px-0"
          header-classes="h-[28px] w-full"
          nav-classes="w-full !p-1 !rounded-[8px]"
          nav-container-classes="mx-0"
          :on-tab-change="onTabChange"
        >
          <template #oneReasonForAll>
            <div class="flex flex-col gap-y-6">
              <div class="flex flex-col gap-2">
                <template v-for="item in reasonList" :key="item" >
                  <AttendanceViolationAlert :data="item" />
                </template>
              </div>
              <base-dropdown
                v-model="$v.reason.$model"
                :error="$v.reason"
                v-model:options="attendanceReasonStore.attendanceReasonList"
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
                :files="formModel.__attachments"
                label="attach-file"
                @emit:file-upload="(files) => formModel.__attachments = files"
              />
              <base-textarea
                v-model="formModel.note"
                :label="t('note')"
                :placeholder="t('enter-note')"
              />
            </div>
          </template>
          <template #separateReasonForEach>
            <template v-for="(item, index) in formModelList" :key="item.id">
              <div class="shadow border border-greyscale-100 rounded-2xl bg-white p-4 mb-4">
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
        </base-brick-tab>
      </div>
      <!-- if there are only one reason, show this -->
      <div v-else class="flex flex-col gap-y-6">
        <AttendanceViolationAlert :data="reasonList[0]" />

        <base-dropdown
          v-model="$v.reason.$model"
          :error="$v.reason"
          v-model:options="attendanceReasonStore.attendanceReasonList"
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
          :files="formModel.__attachments"
          label="attach-file"
          @emit:file-upload="(files) => formModel.__attachments = files"
        />

        <base-textarea
          v-model="formModel.note"
          :label="t('note')"
          :placeholder="t('enter-note')"
        />
      </div>  
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
