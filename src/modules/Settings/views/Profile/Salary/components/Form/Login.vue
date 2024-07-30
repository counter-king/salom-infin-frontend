<script setup>
// Core
import { inject } from 'vue'
// Inject
const STEP_NAMES = inject('step-names')
const next = inject('next-step')
// Methdos
const submit = async () => {

}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="salary-login-view mb-6"
  >
    <base-password
      label="Парол"
      placeholder="Введите пароль"
    />

    <div
      @click="next(STEP_NAMES.LOGIN, STEP_NAMES.FORGET_PASSWORD)"
      class="flex justify-end text-primary-500 text-sm font-semibold cursor-pointer mt-4 hover:underline"
    >
      Забыли пароль?
    </div>
  </form>
</template>
