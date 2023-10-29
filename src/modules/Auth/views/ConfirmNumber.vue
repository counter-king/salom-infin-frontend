<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
// Components
import BaseButton from "@/components/UI/BaseButton.vue"

const props = defineProps({
  title: {
    type: String,
    default: "Confirm number"
  }
})

const formRef = ref(null)
const model = ref({
  phone_number: null
})
// const rules = {
//   phone_number: [
//     {
//       required: true,
//       trigger: ["input", "blur"],
//       message: "Phone number is required"
//     }
//   ]
// }
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">{{ props.title }}</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Введите номер, чтобы получить подтверждающее сообщение</p>

    <form @submit="onSubmit"  ref="formRef" :model="model">
      <div class="w-full mb-3">
        <label class="w-full" for="login">Текст</label>
        <InputText class="w-full"  id="login"  v-model="model.phone_number"  placeholder="Введите логин" />
        <small class="p-error" id="text-username">Username is required</small>
      </div>

      <router-link type="primary" :to="{ name: 'VerifyNumber' }">
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
