<script setup>
// Core
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Services
import { fetchVerifyNumber, fetchSendOtp } from '@/modules/Auth/services'
// Components
import OTPCode from '../components/otpcode.vue'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
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
    dispatchNotify(null, 'Успешно отправлен', COLOR_TYPES.SUCCESS)
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
    dispatchNotify(null, 'Код подтверждения отправлен', COLOR_TYPES.SUCCESS)
  }
  catch (error) {
    dispatchNotify(null, 'Ошибка при отправки код подтверждения', COLOR_TYPES.ERROR)
  }
}
</script>
<template>
  <div class="sign-in-view">
    <div class="flex justify-center items-center w-20 h-20 rounded-full text-center text-indigo-700 bg-indigo-100 m-auto mb-4">
      <base-icon
        name="LetterIcon"
        width="35"
        height="35"
      />
    </div>

    <h1  class="text-2xl decoration-zinc-950 font-bold mb-2 text-center text-indigo-700"> Шаг проверки </h1>

    <p class="font-medium text-sm text-color-3 text-center mb-7">
      Мы отправили код подтверждения на ваш телефон. Введите код из письма в поле ниже.
    </p>

    <div class=" m-auto">
      <OTPCode
        :digit-count="6"
        class="mb-8"
        @emit:up="(value) => otpValue = value"
      />

<!--      <router-link :to="{ name: 'SetCredentials' }">-->
      <base-button
        :loading="loading"
        shadow
        rounded
        size="large"
        label="Подтвердить номер"
        class="w-full"
        @click="verifyNumber"
      ></base-button>
<!--      </router-link>-->

      <div class="text-sm font-medium text-center mt-4">
        Не получили код ?

        <button
          type="submit"
          class="text-primary-500 ml-1"
          @click="resendOtpCode"
        >
          Отправить повторно
        </button>
      </div>
    </div>
  </div>
</template>
