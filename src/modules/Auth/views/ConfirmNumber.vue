<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Components
import BaseButton from "@/components/UI/BaseButton.vue"
const loading = ref(false)
const props = defineProps({
  title: {
    type: String,
    default: "Confirm number"
  }
})

const formModel = ref({
  phone_number: null
})
const rules = {
  phone_number: {
    required: helpers.withMessage(`Phone number is required`, required),
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
      <div class="w-full mb-3">
        <label class="w-full" for="login">Текст</label>
        <InputText class="w-full mb-3" id="login"
          v-model="v.phone_number.$model"
          placeholder="Введите номер телефона"
          :class="{ 'p-invalid':  v.phone_number.$error}"
          :error="v.phone_number.$errors"
        />
        <small
          class="p-error"
          v-for="element of v.phone_number.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </div>


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
          class="w-3.5 duration-[400ms]
          inline "  /> Back to Sign In
      </router-link>
  </div>
</template>

<style>

</style>
