<script setup>
// Core
import { inject, onBeforeUnmount } from 'vue'
// Stores
import { useSalaryStore } from '../../../../../stores/profile/salary.store'
// Composable
const salaryStore = useSalaryStore()
// Inject
const STEP_NAMES = inject('step-names')
const nextRoute = inject('next-step')
// Hooks
onBeforeUnmount(() => {
  salaryStore.checkPasscodeModel.passcode = null
})
</script>

<template>
  <form class="salary-login-view mb-6">
    <base-password
      v-model="salaryStore.checkPasscodeModel.passcode"
      label="Пароль"
      placeholder="Введите пароль"
    />

    <div
      @click="nextRoute(STEP_NAMES.LOGIN, STEP_NAMES.FORGET_PASSWORD)"
      class="flex justify-end text-primary-500 text-sm font-semibold cursor-pointer mt-4 hover:underline"
    >
      Забыли пароль?
    </div>
  </form>
</template>
