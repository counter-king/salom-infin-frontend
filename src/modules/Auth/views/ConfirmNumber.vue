<script setup>
// Core
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Components
import { AltArrowLeftIcon } from '@/components/Icons'
// Services
import { fetchSendOtp } from '@/modules/Auth/services'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const router = useRouter()
const { t } = useI18n()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: "register"
  },
  type: {
    type: String,
    default: 'for_registration',
  }
})
// Reactive
const loading = ref(false)
const formModel = ref({
  phone_number: '+998'
})
const rules = {
  phone_number: {
    required: helpers.withMessage(t('phone-number-required'), required),
    minLength: helpers.withMessage(`Минимальная длина: 8 символа`, minLength(8))
  },
}
// Composable
const v = useVuelidate(rules, formModel)
// Methods
const submit = async () => {
  const valid = await v.value.$validate()

  if (!valid) {
    return
  }

  try {
    loading.value = true
    await fetchSendOtp({
      phone_number: formModel.value.phone_number?.replace(/\D/g, ''),
      otp_type: props.type,
    })
    dispatchNotify(null, t('confirm-code-send'), COLOR_TYPES.SUCCESS)
    await router.push({
      name: 'VerifyNumber',
      query: {
        phone: formModel.value.phone_number?.replace(/\D/g, '')
      }
    })
  }
  finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">{{ t(props.title) }}</h1>
    <p class="text-sm text-color-3 text-center mb-7">{{ t('confirm-text') }}</p>

    <form @submit.prevent="submit">
      <base-col col-class="w-1/1">
        <base-input
          v-model="v.phone_number.$model"
          :error="v.phone_number"
          mask-rule="+998 ## ### ## ##"
          :label="t('mobile-phone')"
          placeholder="+998 XX XXX XX XX"
        />
      </base-col>

      <base-col col-class="w-1/1">
        <base-button
          :loading="loading"
          rounded
          shadow
          size="large"
          type="submit"
          :label="t('send-number')"
          class="w-full"
        ></base-button>
      </base-col>
    </form>

    <router-link
      :to="{ name: 'Login' }"
      class="flex items-center justify-center text-sm mt-4 text-indigo-700"
    >
      <base-iconify
        :icon="AltArrowLeftIcon"
        class="w-3.5 duration-[400ms] inline"
      />

      {{ t('back-in-enter') }}
    </router-link>
  </div>
</template>
