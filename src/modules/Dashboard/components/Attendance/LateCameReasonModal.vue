<script setup>
// Core
import { computed, ref, useModel } from "vue"
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
const sendButtonLoading = ref(false)
const rules = {
  reason: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const modelValue = useModel(props, 'modelValue')
const {t, locale} = useI18n()
const store = useNotificationStore()
const dashboardAttendanceStore = useAttendanceStore()
const $v = useVuelidate(rules, testModel)

// Computed
const lateTime = computed(() => {
  const { first_check_in, last_check_out } = store.attendanceModel

  return returnLateTime(first_check_in, last_check_out, locale.value, 'entry')
})

// Methods
const send = async () => {
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
 } catch (e) {}
  finally {
   sendButtonLoading.value = false
 }
}

// Emits
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
      <div class="flex flex-col gap-y-6">
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
          label="send"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          :loading="sendButtonLoading"
          @click="send"
        />
      </div>
    </template>

  </base-dialog>
</template>

<style scoped>

</style>
