<script setup>
// Core
import { computed, ref } from "vue"
import { helpers, required } from "@vuelidate/validators"
// Components
import { TelegramIcon } from "@/components/Icons"
import { useVuelidate } from "@vuelidate/core";
import UserSelect from "@/components/Select/UserSelect.vue";

// Reactive
const dialog = ref(false)
const buttonLoading = ref(false)
const model = ref({
  approval: null
})
const rules = computed(() => ({
  approval: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}))

const $v = useVuelidate(rules, model)

// Methods
const onSendForApproval = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  buttonLoading.value = true

  setTimeout(() => {
    buttonLoading.value = false
  }, 2000)
}

const emit = defineEmits(['emit:onSendForApproval'])
</script>

<template>
  <div class="send-for-approval-component">
    <base-button
      border-color="border-transparent"
      label="send-for-approval"
      :icon-left="TelegramIcon"
      icon-height="!w-4"
      icon-width="!h-4"
      rounded
      shadow
      type="button"
      @click="dialog = true"
    />

    <base-dialog
      v-model="dialog"
      max-width="max-w-[572px]"
      label="send-for-approval"
      :draggable="false"
    >
      <template #content>
        <user-select
          v-model="$v.approval.$model"
          :error="$v.approval"
          api-url="users"
          label="whom"
          required
          placeholder="select-employee"
        />
      </template>

      <template #footer>
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="dialog = false"
        />
        <base-button
          label="send-for-approval"
          :loading="buttonLoading"
          rounded
          shadow
          type="button"
          @click="onSendForApproval"
        />
      </template>
    </base-dialog>
  </div>
</template>

<style scoped>

</style>
