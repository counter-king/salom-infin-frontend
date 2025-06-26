<script setup>
// Core
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import { helpers, sameAs,  minLength, required } from '@vuelidate/validators'
// Components
import { LockKeyholeUnlockedIcon, CheckCircleBoldIcon } from '@/components/Icons'
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

// Custom validators
const hasUppercase = (value) => /[A-Z]/.test(value)
const hasLowercase = (value) => /[a-z]/.test(value)
const hasNumber = (value) => /\d/.test(value)
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value)

// Reactive
const loading = ref(false)
const formModel = reactive({
  phone_number: route.query.phone?.replace(/\D/g, ''),
  new_password: null,
  reenteredPassword: null
})
const rules = reactive({
  new_password: {
    required: helpers.withMessage(t(''), required),
    minLength: helpers.withMessage(``, minLength(8)),
    hasUppercase: helpers.withMessage(``, hasUppercase),
    hasLowercase: helpers.withMessage(``, hasLowercase),
    hasNumber: helpers.withMessage(``, hasNumber),
    hasSpecialChar: helpers.withMessage(``, hasSpecialChar)
  },
  reenteredPassword: {
    required: helpers.withMessage(t('password-required'), required),
    minLength: helpers.withMessage(`Минимальная длина: 8 символа`, minLength(8)),
    sameAsPassword: helpers.withMessage(
      t('password-not-match'),
      helpers.withParams(
        { type: 'sameAsPassword' },
      (value) => {
        // Avval 8 belgi shartini tekshiradi
        if (!value || value.length < 8) return true 
        return value === formModel.new_password
      }
    )
  )}
})

// Password requirements
const passwordRequirements = computed(() => [
  {
    text: t('atLeast-8-characters'),
    met: formModel.new_password && formModel.new_password.length >= 8
  },
  {
    text: t('atLeast-1-capital-letter'),
    met: formModel.new_password && hasUppercase(formModel.new_password)
  },
  {
    text: t('atLeast-1-small-letter'),
    met: formModel.new_password && hasLowercase(formModel.new_password)
  },
  {
    text: t('atLeast-1-number'),
    met: formModel.new_password && hasNumber(formModel.new_password)
  },
  {
    text: t('atLeast-1-special-character', { characters: '!@#$%^&*' }),
    met: formModel.new_password && hasSpecialChar(formModel.new_password)
  }
])

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
        <!-- Password Requirements - Always Visible -->
        <div class="flex flex-col mt-3 gap-2">
          <div 
            v-for="(requirement, index) in passwordRequirements" 
            :key="index"
            class="flex items-center gap-[6px]"
          >
            <base-iconify 
              :icon="CheckCircleBoldIcon" 
              class="w-4 h-4"
              :class="[{ 'text-green-500': requirement.met, 'text-greyscale-300': !requirement.met}]"
            />  
            <span 
              :class="!formModel.new_password ? 'text-greyscale-400' : (requirement.met ? 'text-green-600' : 'text-red-500')" 
              class="text-sm"
            >
              {{ requirement.text }}
            </span>
          </div>
        </div>
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
