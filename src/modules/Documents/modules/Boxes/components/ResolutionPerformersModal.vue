<script setup>
// Core
import {onMounted, ref} from "vue"
// Components
import { CheckCircleIcon } from '@/components/Icons'
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
// Validators
import { helpers, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
// Routes
import { useRoute } from "vue-router"
// Store
import { useUsersStore } from "@/stores/users.store";

const dialog = ref(false)
const buttonLoading = ref(false)
const route = useRoute()

const props = defineProps({
  performers: {
    type: Array,
    default: () => []
  },
  resolutionText: {
    type: String,
    default: ""
  }
})

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
const emit = defineEmits(['emit:onSign']);

// Methods
const onSign = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  buttonLoading.value = true

  console.log('before', model.value.__performers)

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

  console.log('body', body)

  emit('emit:onSign', body)
}

// Hooks
onMounted(() => {
  console.log('props.performers.length', props.performers.length)
  console.log('props.resolutionText', props.resolutionText)
  if (props.performers.length && props.resolutionText) {
    props.performers.forEach(item => {
      let user = useUsersStore().usersList.find(user => user.id === item.id)
      model.value.__performers.push(user)
    })
    model.value.resolution_text = props.resolutionText
  }
})

defineExpose({ buttonLoading, dialog })
</script>

<template>
  <base-button
    border-color="border-transparent"
    label="sign"
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
    label="sign-resolution"
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
        label="sign"
        :loading="buttonLoading"
        rounded
        shadow
        type="button"
        @click="onSign"
      />
    </template>
  </base-dialog>

</template>

<style scoped>

</style>
