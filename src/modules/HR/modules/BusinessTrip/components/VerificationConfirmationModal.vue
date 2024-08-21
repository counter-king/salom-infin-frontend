<script setup>
// Core
import {ref, useModel} from "vue"
import {useI18n} from "vue-i18n"
// Components
import {InfoCircleBoldIcon} from "@/components/Icons"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()

// Reactive
const buttonLoading = ref(false)

// Methods
const onConfirm = () => {
  buttonLoading.value = true
  emit('emit:onConfirm')
}

const modelValue = useModel(props, 'modelValue')
const emit = defineEmits(['update:modelValue', 'emit:onConfirm'])
defineExpose({ buttonLoading })
</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[472px]"
    label="confirmation"
    :draggable="false"
  >
    <template #content>
      <div class="flex flex-col justify-center items-center py-8 px-4">
        <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-warning-50">
          <base-iconify :icon="InfoCircleBoldIcon" class="!w-10 !h-10" />
        </div>

        <div class="flex justify-center text-lg font-medium text-greyscale-900 text-center mt-6">
          {{ t('perform-action') }}
        </div>
      </div>
    </template>

    <template #footer>
      <base-button
        color="bg-white hover:bg-greyscale-100 text-primary-dark"
        border-color="border-transparent"
        label="cancel"
        rounded
        shadow
        type="button"
        @click="modelValue = false"
      />
      <base-button
        label="confirm"
        :loading="buttonLoading"
        rounded
        shadow
        type="button"
        @click="onConfirm"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
