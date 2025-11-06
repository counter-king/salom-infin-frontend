<script setup>
// Core
import { useVuelidate } from "@vuelidate/core"
import { useI18n } from "vue-i18n"
// Enums
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
// Store
import { useExceptionEmployeesStore } from "@/modules/HR/modules/Attendance/stores/exceptionEmployees.store"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"

// Composable
const store = useExceptionEmployeesStore()
const $v = useVuelidate(store.rules, store.model)
const { t } = useI18n()

// Methods
const manage = async () => {
  const valid = await $v.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  await store.actionCreateExceptionEmployee(t)
}
const resetFormModel = () => {
  store.actionResetModel()
  $v.value.$reset()
}
</script>

<template>
  <base-dialog
    v-model="store.dialog"
    max-width="max-w-[672px]"
    label="add"
    :draggable="false"
    @emit:after-hide="resetFormModel"
  >
    <template #content>
      <user-multi-select
        v-model="$v.__users.$model"
        :error="$v.__users"
        label="employees"
        placeholder="select-employees"
        required
        allSelectable
      />

      <base-textarea
        v-model="$v.__comment.$model"
        :error="$v.__comment"
        label="basis"
        placeholder="enter-basis"
        required
        class="mt-8"
      />
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
          @click="store.dialog = false"
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
</template>

<style scoped>

</style>
