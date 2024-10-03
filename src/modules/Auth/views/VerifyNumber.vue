<script setup>
// Core
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Services
import { fetchVerifyNumber, fetchSendOtp } from '@/modules/Auth/services'
// Components
import { ActionBackButton } from '@/components/Actions'
import { LetterIcon } from '@/components/Icons'
import OTPCode from '../components/otpcode.vue'
// Utils
import { maskNumbers } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
// Reactive
const loading = ref(false)
const otpValue = ref('')
// Methods
const verifyNumber = async () => {
  try {
    loading.value = true
    await fetchVerifyNumber({
      phone_number: route.query.phone,
      otp_code: otpValue.value
    })
    dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
    await router.push({
      name: 'SetCredentials',
      query: {
        phone: route.query.phone
      }
    })
  }
  catch (error) {

  }
  finally {
    loading.value = false
  }
}
const resendOtpCode = async () => {
  try {
    await fetchSendOtp({ phone_number: route.query.phone })
    dispatchNotify(null, t('confirm-code-send'), COLOR_TYPES.SUCCESS)
  }
  catch (error) {
    dispatchNotify(null, t('error-confirm-code-send'), COLOR_TYPES.ERROR)
  }
}
</script>
<template>
  <div class="sign-in-view">
    <action-back-button class="!border !bg-greyscale-50 !rounded-lg !shadow-none" />

    <div class="flex justify-center items-center w-20 h-20 rounded-full text-center text-indigo-700 bg-indigo-100 m-auto mb-4">
      <base-iconify
        :icon="LetterIcon"
        class="!w-9 !h-9"
      />
    </div>

    <h1  class="text-xl text-primary-900 font-bold text-center mb-1">{{ t('confirmation') }}</h1>

    <p class="text-sm font-medium text-greyscale-500 text-center mb-1">
      {{ t('enter-code-send-to-number') }}
    </p>

    <p class="text-base font-semibold text-greyscale-900 text-center mb-8">
      +{{ maskNumbers(route.query.phone) }}
    </p>

    <div class="m-auto">
      <OTPCode
        :digit-count="6"
        class="mb-8"
        @emit:up="(value) => otpValue = value"
      />

      <base-button
        :loading="loading"
        :disabled="otpValue.length !== 6"
        shadow
        rounded
        size="large"
        label="Подтвердить номер"
        class="w-full"
        @click="verifyNumber"
      ></base-button>

      <div class="text-sm font-medium text-center mt-4">
        {{ t('not-receive-code') }}

        <button
          type="submit"
          class="text-primary-500 ml-1"
          @click="resendOtpCode"
        >
          {{ t('resend-code') }}
        </button>
      </div>
    </div>
  </div>
</template>
