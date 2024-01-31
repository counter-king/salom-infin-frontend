<script setup>
// Core
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Services
import { fetchSendOtp } from '@/modules/Auth/services'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const router = useRouter()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: "Потвердеть пароль"
  }
})
// Reactive
const loading = ref(false)
const formModel = ref({
  phone_number: null
})
const rules = {
  phone_number: {
    required: helpers.withMessage(`Требуется номер телефона`, required),
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
    await fetchSendOtp({ phone_number: formModel.value.phone_number?.replace(/\D/g, '') })
    dispatchNotify('Код подтверждения отправлен', null, COLOR_TYPES.SUCCESS)
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
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">{{ props.title }}</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Введите номер, чтобы получить подтверждающее сообщение</p>

    <form @submit.prevent="submit">
      <base-col col-class="w-1/1">
        <base-input
          v-model="v.phone_number.$model"
          :error="v.phone_number"
          mask-rule="+### ## ### ## ##"
          label="Телефона"
          placeholder="Введите номер телефона"
        />
      </base-col>

      <base-col col-class="w-1/1">
        <base-button
          :loading="loading"
          rounded
          shadow
          size="large"
          type="submit"
          label="Отправить номер"
          class="w-full"
        ></base-button>
      </base-col>

<!--      <router-link  :to="{ name: 'VerifyNumber' }">-->

<!--      </router-link>-->
    </form>

    <router-link type="primary" :to="{ name: 'Login' }" class="flex items-center justify-center text-sm mt-4 text-indigo-700">
      <base-icon
        name="AltArrowLeftIcon"
        class="w-3.5 duration-[400ms] inline "/>
      Вернуться к входу
    </router-link>
  </div>
</template>
