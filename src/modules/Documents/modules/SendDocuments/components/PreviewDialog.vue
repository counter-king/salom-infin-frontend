<script setup>
// Core
import {useModel} from "vue";
import {useI18n} from "vue-i18n";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  sendButtonLoading: {
    type: Boolean,
    default: false
  }
});
const modelValue = useModel(props, 'modelValue');
const { t } = useI18n();

const emit = defineEmits(['update:modelValue', 'emit:send']);
</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[608px]"
    :draggable="false"
    content-classes="p-6"
  >
    <template #header>
      <span class="font-semibold text-xl">{{ t('preview') }}</span>
    </template>

    <template #content>
      <slot name="content" />
    </template>

    <template #footer>
      <base-button
        label="save-as-draft"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      />

      <base-button
        label="send"
        rounded
        shadow
        border-color="border-transparent"
        class="ml-2"
        :loading="sendButtonLoading"
        @click="emit('emit:send')"
      />
    </template>

  </base-dialog>
</template>

<style scoped>

</style>
