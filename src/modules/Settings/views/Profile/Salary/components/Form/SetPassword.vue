<script setup>
// Methods
const submit = async () => {

}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="set-password-view space-y-6 mb-10"
  >
    <base-password
      label="Парол"
      placeholder="Введите пароль"
    />

    <base-password
      label="Повторите парол"
      placeholder="Повторите парол"
    />
  </form>
</template>
