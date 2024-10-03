<script setup>
// Core
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { helpers, sameAs,  minLength, required } from '@vuelidate/validators'
// Components
import { LockKeyholeUnlockedIcon } from '@/components/Icons'
// Services
import { fetchSetPassword } from '@/modules/Auth/services'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
// Reactive
const loading = ref(false)
const formModel = reactive({
  phone_number: route.query.phone?.replace(/\D/g, ''),
  new_password: null,
  reenteredPassword: null
})
const rules = reactive({
  new_password: {
    required: helpers.withMessage(t('password-required'), required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
  reenteredPassword: {
    required: helpers.withMessage(t('password-required'), required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6)),
    // sameAsPassword: helpers.withMessage(`Пароли не совпадают`, sameAs('123'))
  },
})
// Methods
const v = useVuelidate(rules, formModel)
const setCredentials = async () => {
  const valid = await v.value.$validate()

  if (!valid) {
    return
  }

  try {
    loading.value = true
    await fetchSetPassword(formModel)
    dispatchNotify(null, t('credentials-set'), COLOR_TYPES.SUCCESS)
    await router.push({ name: 'Login' })
  }
  finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-7 text-center">{{ t('set-credentials') }}</h1>
    <!-- <p class="text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p> -->

    <form @submit.prevent="setCredentials">
      <base-col col-class="w-1/1 pb-4">
        <base-input
          v-model="route.query.phone"
          mask-rule="+### ## ### ## ##"
          disabled
          :label="t('login')"
          :placeholder="t('enter-login')"
        />
      </base-col>

      <base-col col-class="w-1/1 pb-4">
        <base-password
          v-model="v.new_password.$model"
          :label="t('password')"
          :error="v.new_password"
          :placeholder="t('enter-password')"
        />
      </base-col>

      <base-col col-class="w-1/1 pb-4">
        <base-password
          v-model="v.reenteredPassword.$model"
          :label="t('confirm-password')"
          :error="v.reenteredPassword"
          :placeholder="t('confirm-password')"
        />
      </base-col>

      <base-button
        :loading="loading"
        :icon-left="LockKeyholeUnlockedIcon"
        :label="t('set-credentials')"
        size="large"
        type="submit"
        shadow
        rounded
        class="w-full mt-2"
      ></base-button>
    </form>
  </div>
</template>
