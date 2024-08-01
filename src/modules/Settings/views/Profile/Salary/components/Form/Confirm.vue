<script setup>
// Methods
const submit = async () => {

}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="confirm-password-view mb-5"
  >
    <div class="max-w-[270px] w-full text-center mx-auto mb-5">
      <div class="flex justify-center items-center w-12 h-12 bg-primary-100 rounded-full mx-auto">
        <base-iconify icon="solar:letter-linear" class="text-primary-500" />
      </div>

      <h1 class="text-sm font-medium text-greyscale-500 mt-3 mb-1">Введите код, отпраленный на номер</h1>

      <p class="text-base font-semibold text-greyscale-900">+998 93 *** ** 78</p>
    </div>

    <base-input
      label="СМС - Код"
      placeholder="Введите код"
    />
  </form>
</template>
