<script setup>
// Methods
const submit = async () => {

}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="forget-password-view space-y-6 mb-16"
  >
    <base-input
      label="Телефон номер"
      mask-rule="+998 ## ### ## ##"
      disabled
    />
  </form>
</template>
