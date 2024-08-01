<script setup>
// Core
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { helpers, sameAs,  minLength, required } from '@vuelidate/validators'
// Services
import { fetchSetPassword } from '@/modules/Auth/services'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
// Reactive
const loading = ref(false)
const formModel = reactive({
  phone_number: route.query.phone?.replace(/\D/g, ''),
  new_password: null,
  reenteredPassword: null
})
const rules = reactive({
  new_password: {
    required: helpers.withMessage(`Необходим пароль`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
  reenteredPassword: {
    required: helpers.withMessage(`Необходим пароль`, required),
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
    dispatchNotify(null, 'Учетные данные установлены', COLOR_TYPES.SUCCESS)
    await router.push({ name: 'Login' })
  }
  finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Установить учетные данные</h1>
    <p class="text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p>

    <form @submit.prevent="setCredentials">
      <base-col col-class="w-1/1 pb-4">
        <base-input
          v-model="route.query.phone"
          mask-rule="+### ## ### ## ##"
          disabled
          label="Логин"
          placeholder="Введите логин"
        />
      </base-col>

      <base-col col-class="w-1/1 pb-4">
        <base-password
          v-model="v.new_password.$model"
          label="Пароль"
          :error="v.new_password"
          placeholder="Введите пароль"
        />
      </base-col>

      <base-col col-class="w-1/1 pb-4">
        <base-password
          v-model="v.reenteredPassword.$model"
          label="Подтвердить пароль"
          :error="v.reenteredPassword"
          placeholder="Подтвердить пароль"
        />
      </base-col>

      <base-button
        :loading="loading"
        icon-left="LockKeyholeUnlockedIcon"
        label="Установить учетные данные"
        size="large"
        type="submit"
        shadow
        rounded
        class="w-full mt-2"
      ></base-button>
    </form>
  </div>
</template>
