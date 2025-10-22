<script setup>
// Core
import { computed, ref, reactive, useModel } from "vue"
import { useI18n } from "vue-i18n"
import useVuelidate from "@vuelidate/core"
import { helpers, required } from "@vuelidate/validators"
// Utils
import { formatDate } from "@/utils/formatDate"
import { returnLateTime } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
// Services
import { fetchUpdateDashboardAttendance } from "@/modules/Dashboard/services/index.service"
// Enums
import { COLOR_TYPES } from "@/enums"
// Store
import { useNotificationStore } from "@/modules/Dashboard/stores/notification.store"
import { useAttendanceStore } from "@/modules/Dashboard/stores/attendance.store"
// Components
import { UserWithRadio } from "@/components/Users"
import BaseTextarea from "@/components/UI/BaseTextarea.vue"

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Reactive
const testModel = ref({
  reason: "",
  comment: "",
  __files: []
})
const formModelList = reactive([{
  reason: "",
  comment: "",
  __files: []
},{
  reason: "",
  comment: "",
  __files: []
}
])
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

// Composable
const modelValue = useModel(props, 'modelValue')
const {t, locale } = useI18n()
const store = useNotificationStore()
const dashboardAttendanceStore = useAttendanceStore()
const $v = useVuelidate(rules, testModel)
const $vList = useVuelidate(formModelListRules, formModelList, { $lazy: true, })

// Computed
const lateTime = computed(() => {
  const { first_check_in, last_check_out } = store.attendanceModel

  return returnLateTime(first_check_in, last_check_out, locale.value, 'entry')
})

const isShowMoreReasoneTabPanel = computed(() => {
  return false
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
    console.log("sendSeparateReasoneForEach", activeTabIndex.value)
    await sendSeparateReasoneForEach()
  } else {
    console.log("sendOneReasonForAll")
    await sendOneReasonForAll()
  }
}

const sendReason = async () => {
  console.log("sendReason")
  const valid = await $v.value.$validate()
  if (!valid) return
  try {
   sendButtonLoading.value = true
   await fetchUpdateDashboardAttendance(store.attendanceModel.id, {
     has_reason: true,
   })
   dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
   await dashboardAttendanceStore.actionDashboardNotificationAttendanceList({status: 'lateness', has_reason: false})
   modelValue.value = false
   testModel.value.reason = null
   testModel.value.comment = null
   testModel.value__files = null
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
  console.log("valid", testModel.value)
  try {
    sendButtonLoading.value = true
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
                <template v-for="item in [1, 2, 3]" :key="item" >
                  <div class="flex gap-x-4 items-center px-4 py-2 rounded-xl bg-warning-30 border border-warning-100">
                    <img src="/images/dashboard/alarm-clock.svg" alt="alarm clock">
                    <div class="text-sm text-greyscale-500 font-medium">
                      <span class="text-primary-900">{{ formatDate(store.attendanceModel?.date) }}</span> sanasida
                      <span class="text-critic-500">{{ lateTime }}</span> kech qolgansiz
                    </div>
                  </div>
                </template>
              </div>
              <base-dropdown
                v-model="$v.reason.$model"
                :error="$v.reason"
                v-model:options="store.reasonList"
                required
                label="late-came-reason"
                placeholder="select-reason"
                :option-label="locale === 'uz' ? 'name_uz' : 'name_ru'"
                option-value="value"
              >
                <template #option="{ option }">
                  <user-with-radio
                    :title="t(option.title)"
                    :text-truncate="false"
                  >
                  </user-with-radio>
                </template>
              </base-dropdown>

              <base-file-upload
                :files="testModel.__files"
                label="attach-file"
                @emit:file-upload="(files) => testModel.__files = files"
              />
              <base-textarea
                v-model="testModel.comment"
                :label="t('comment')"
                :placeholder="t('enter-comment')"
              />
            </div>
          </template>
          <template #separateReasonForEach>
            <template v-for="(item, index) in formModelList" :key="item.id">
              <div class="shadow border border-greyscale-100 rounded-2xl bg-white p-4 mb-4">
                <div class="flex flex-col gap-y-6">
                  <div class="flex gap-x-4 items-center px-4 py-2 rounded-xl bg-warning-30 border border-warning-100">
                    <img src="/images/dashboard/alarm-clock.svg" alt="alarm clock">

                    <div class="text-sm text-greyscale-500 font-medium">
                      <span class="text-primary-900">{{ formatDate(store.attendanceModel?.date) }}</span> sanasida
                      <span class="text-critic-500">{{ lateTime }}</span> kech qolgansiz
                    </div>
                  </div>
                  <base-dropdown
                    v-model="item.reason"
                    v-model:options="store.reasonList"
                    :error="$vList.$each.$response?.$data[index]?.reason"
                    required
                    label="late-came-reason"
                    placeholder="select-reason"
                    :option-label="locale === 'uz' ? 'name_uz' : 'name_ru'"
                    option-value="value"
                  >
                    <template #option="{ option }">
                      <user-with-radio
                        :title="t(option.title)"
                        :text-truncate="false"
                      >
                      </user-with-radio>
                    </template>
                  </base-dropdown>

                  <base-file-upload
                    :files="item.__files"
                    label="attach-file"
                    @emit:file-upload="(files) => item.__files = files"
                  />
                  <base-textarea
                    v-model="item.comment"
                    :label="t('comment')"
                    :placeholder="t('enter-comment')"
                  />
                </div>
              </div>
            </template>
          </template>
        </base-brick-tab>
      </div>
      <!-- if there are only one reason, show this -->
      <div v-else class="flex flex-col gap-y-6">
        <div class="flex gap-x-4 items-center px-4 py-2 rounded-xl bg-warning-30 border border-warning-100">
          <img src="/images/dashboard/alarm-clock.svg" alt="alarm clock">

          <div class="text-sm text-greyscale-500 font-medium">
            <span class="text-primary-900">{{ formatDate(store.attendanceModel?.date) }}</span> sanasida
            <span class="text-critic-500">{{ lateTime }}</span> kech qolgansiz
          </div>
        </div>

        <base-dropdown
          v-model="$v.reason.$model"
          :error="$v.reason"
          v-model:options="store.reasonList"
          required
          label="late-came-reason"
          placeholder="select-reason"
          :option-label="locale === 'uz' ? 'name_uz' : 'name_ru'"
          option-value="value"
        >
          <template #option="{ option }">
            <user-with-radio
              :title="t(option.title)"
              :text-truncate="false"
            >
            </user-with-radio>
          </template>
        </base-dropdown>

        <base-file-upload
          :files="testModel.__files"
          label="attach-file"
          @emit:file-upload="(files) => testModel.__files = files"
        />

        <base-textarea
          v-model="testModel.comment"
          :label="t('comment')"
          :placeholder="t('enter-comment')"
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
