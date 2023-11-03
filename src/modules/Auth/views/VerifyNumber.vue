<script setup>
import { ref } from 'vue'
// Components
import Button from 'primevue/button';
import OTPCode from "../components/otpcode.vue";
import BaseButton from "@/components/UI/BaseButton.vue"
const otpValue = ref('')
</script>
<template>
  <div class="sign-in-view">
    <div class="flex justify-center items-center w-20 h-20 rounded-full text-center text-indigo-700 bg-indigo-100 m-auto mb-4">
      <base-icon
        name="LetterIcon"
        class="w-20  inline "/>
    </div>
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center text-indigo-700"> Шаг проверки </h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">
      Мы отправили код подтверждения на ваш телефон. Введите код из письма в поле ниже.
    </p>

    <div class="w-[390px] m-auto">
      <OTPCode
        :digit-count="4"
        class="mb-8"
        @emit:up="(value) => otpValue = value"
      />
      <router-link type="primary" :to="{ name: 'SetCredensials' }" class="text-indigo-700">
        <base-button
          class="w-full text-indigo-700"
          color="bg-indigo-100"
          border-color="border-indigo-100"
          label="Подтвердить номер"
          size="large"
          shadow
          type="submit"
          rounded
        ></base-button>
      </router-link>

      <div class="text-center mt-4 text-xs">
        Не получили код ?
        <Button  class="text-xs p-0 font-thin text-indigo-700" text type="submit" severity="success" label=" Отправить повторно" />
      </div>
    </div>
  </div>
</template>
