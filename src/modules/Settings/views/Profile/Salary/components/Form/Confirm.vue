<script setup>
// Core
import { onMounted } from 'vue'
// Components
import { LetterLinearIcon } from '@/components/Icons'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
import { useSalaryStore } from '../../../../../stores/profile/salary.store'
// Services
import { fetchSendOtp } from '@/modules/Auth/services'
// Utils
import { maskNumbers } from '@/utils'
// Composable
const authStore = useAuthStore()
const salaryStore = useSalaryStore()
// Hooks
onMounted(async () => {
  await fetchSendOtp({ phone_number: authStore.currentUser.phone })
})
</script>

<template>
  <div class="confirm-password-view mb-5">
    <div class="max-w-[270px] w-full text-center mx-auto mb-5">
      <div class="flex justify-center items-center w-12 h-12 bg-primary-100 rounded-full mx-auto">
        <base-iconify :icon="LetterLinearIcon" class="text-primary-500" />
      </div>

      <h1 class="text-sm font-medium text-greyscale-500 mt-3 mb-1">Введите код, отправленный на номер</h1>

      <p class="text-base font-semibold text-greyscale-900">+{{ maskNumbers(authStore.currentUser.phone) }}</p>
    </div>

    <base-input
      v-model="salaryStore.verifyNumberModel.otp_code"
      label="СМС - Код"
      placeholder="Введите код"
    />
  </div>
</template>
