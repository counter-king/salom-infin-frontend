<script setup>
// Core
import { ref } from "vue"
// Components
import { CheckCircleIcon } from '@/components/Icons'
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
// Validators
import { helpers, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
// Services
import { fetchSendToSigning } from "@/modules/Documents/modules/Boxes/services/approval.service"
// Routes
import { useRoute } from "vue-router"

const dialog = ref(false)
const buttonLoading = ref(false)
const route = useRoute()

const model = ref({
  __performers: [],
  resolution_text: null
})
const rules = {
  __performers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  resolution_text: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const $v = useVuelidate(rules, model)
const emit = defineEmits(['emit:onSendToSigning'])

// Methods
const onSendToSigning = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  buttonLoading.value = true
  const body = {
    performers: model.value.__performers.map(item => ({
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      father_name: item.father_name,
      full_name: item.full_name
    })),
    resolution_text: model.value.resolution_text
  }

  const response = await fetchSendToSigning(route.params.id, body)
  if (response.status === 200) {
    emit('emit:onSendToSigning')
    buttonLoading.value = false
    dialog.value = false
  }
}
</script>

<template>
  <base-button
    border-color="border-transparent"
    label="send-to-signing"
    :icon-left="CheckCircleIcon"
    icon-height="!w-4"
    icon-width="!h-4"
    rounded
    shadow
    type="button"
    @click="dialog = true"
  />

  <base-dialog
    v-model="dialog"
    max-width="max-w-[672px]"
    label="send-to-signing"
    :draggable="false"
  >
    <template #content>
      <user-multi-select
        v-model="$v.__performers.$model"
        :error="$v.__performers"
        label="performers"
        placeholder="choose-performers"
        required
      />

      <base-textarea
        v-model="$v.resolution_text.$model"
        :error="$v.resolution_text"
        label="enter-content"
        required
        class="mt-4"
      />

<!--      <pre>{{ model }}</pre>-->
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
        label="send-to-signing"
        :loading="buttonLoading"
        rounded
        shadow
        type="button"
        @click="onSendToSigning"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
