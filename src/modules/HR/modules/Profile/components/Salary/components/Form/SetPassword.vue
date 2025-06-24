<script setup>
// Core
import { reactive, computed, onBeforeUnmount, watch } from 'vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
// Components
import { CheckCircleBoldIcon } from '@/components/Icons'
// Stores
import { useSalaryStore } from '../../../../stores/salary.store'

// Composable
const salaryStore = useSalaryStore()
const { t } = useI18n()

// Custom validators
const hasUppercase = (value) => /[A-Z]/.test(value)
const hasLowercase = (value) => /[a-z]/.test(value)
const hasNumber = (value) => /\d/.test(value)
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value)

const formModel = reactive({
  passcode: salaryStore.setPasscodeModel.passcode,
  reenteredPassword: salaryStore.setPasscodeModel.passcode,
})

const rules = {
  passcode: {
    required: helpers.withMessage('', required),
    minLength: helpers.withMessage('', minLength(8)),
    hasUppercase: helpers.withMessage('', hasUppercase),
    hasLowercase: helpers.withMessage('', hasLowercase),
    hasNumber: helpers.withMessage('', hasNumber),
    hasSpecialChar: helpers.withMessage('', hasSpecialChar)
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
        return value === formModel.passcode
      }
    )
  )
  }
}

const v = useVuelidate(rules, formModel)

const passwordRequirements = computed(() => [
  {
    text: t('atLeast-8-characters'),
    met: formModel.passcode && formModel.passcode.length >= 8
  },
  {
    text: t('atLeast-1-capital-letter'),
    met: formModel.passcode && hasUppercase(formModel.passcode)
  },
  {
    text: t('atLeast-1-small-letter'),
    met: formModel.passcode && hasLowercase(formModel.passcode)
  },
  {
    text: t('atLeast-1-number'),
    met: formModel.passcode && hasNumber(formModel.passcode)
  },
  {
    text: t('atLeast-1-special-character'),
    met: formModel.passcode && hasSpecialChar(formModel.passcode)
  }
])

const submit = async () => {
  const valid = await v.value.$validate()
  if (!valid) {
    salaryStore.setPasscodeModel.passcode = null
  } else { 
    salaryStore.setPasscodeModel.passcode = formModel.passcode
  }
}
watch(
  () => [formModel.passcode, formModel.reenteredPassword],
  async (val) => {
    if (val) {
      submit()
    }
  }
)

onBeforeUnmount(() => {
  salaryStore.setPasscodeModel.passcode = null
})

</script>

<template>
  <base-col class="w-1/1">
    <base-password
      v-model="formModel.passcode"
      label="Пароль"
      placeholder="Введите пароль"
      :error="v.passcode"
    />
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
        <span :class="!formModel.passcode ? 'text-greyscale-400' : (requirement.met ? 'text-green-600' : 'text-red-500')" class="text-sm">
          {{ requirement.text }}
        </span>
      </div>
    </div>
  </base-col>
  <base-col col-class="w-1/1 mt-3 mb-4">
    <base-password
      v-model="formModel.reenteredPassword"
      :label="t('confirm-password')"
      :error="v.reenteredPassword"
      :placeholder="t('confirm-password')"
    />
  </base-col>
</template>
