<script setup>
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Components
import BaseButton from "@/components/UI/BaseButton.vue"
const loading = ref(false)
const props = defineProps({
  title: {
    type: String,
    default: "Забыть пароль"
  }
})

const formModel = ref({
  phone_number: null
})
const rules = {
  phone_number: {
    required: helpers.withMessage(`Требуется номер телефона`, required),
    minLength: helpers.withMessage(`Минимальная длина: 8 символа`, minLength(8))
  },
}
const v = useVuelidate(rules, formModel)
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">{{ props.title }}</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Введите номер, чтобы получить подтверждающее сообщение</p>

    <form @submit="onSubmit">
      <base-col col-class="w-1/1 pb-5">
        <base-input
          v-model="v.phone_number.$model"
          label="Телефона"
          :errorClass="v.phone_number.$error"
          placeholder="Введите номер телефона"
        />
        <small
          class="p-error"
          v-for="element of v.phone_number.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </base-col>

      <router-link  :to="{ name: 'VerifyNumber' }">
        <base-button
          class="w-full text-indigo-700"
          color="bg-indigo-100"
          border-color="border-indigo-100"
          label="Отправить номер"
          size="large"
          shadow
          type="submit"
          rounded
          :loading="loading"
        ></base-button>
      </router-link>
    </form>

    <router-link type="primary" :to="{ name: 'Login' }" class="flex items-center justify-center text-sm mt-4 text-indigo-700">
      <base-icon
        name="AltArrowLeftIcon"
        class="w-3.5 duration-[400ms] inline "/>
      Вернуться к входу
    </router-link>
  </div>
</template>
