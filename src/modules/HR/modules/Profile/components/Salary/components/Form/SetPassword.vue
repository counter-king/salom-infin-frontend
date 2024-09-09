<script setup>
// Core
import { onBeforeUnmount } from 'vue'
// Stores
import { useSalaryStore } from '../../../../stores/salary.store'
// Composable
const salaryStore = useSalaryStore()
// Hooks
onBeforeUnmount(() => {
  salaryStore.setPasscodeModel.passcode = null
})
</script>

<template>
  <div class="set-password-view space-y-6 mb-10">
    <base-password
      v-model="salaryStore.setPasscodeModel.passcode"
      label="Пароль"
      placeholder="Введите пароль"
    />
  </div>
</template>
