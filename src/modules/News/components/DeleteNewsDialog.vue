<script setup>
// core
import { useModel } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';

const { t } = useI18n()
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false 
    },
    onClose: {
        type: Function,
        default: () => {}
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    onDeleteNews: {
        type: Function,
        default: () => {}
    }
})

const modelValue = useModel(props, 'modelValue');

</script>
<template>
    <base-dialog
      :label="t('delete')"
       maxWidth="!w-[450px]"
       v-model="modelValue"
      >
        <template #content>
          <div class="text-xl font-semibold text-critic-500">
            {{ t("delete-news-dialog-content") }}
          </div>
        </template>
        <template #footer>
          <base-button
            label="cancel"
            rounded
            color="text-primary-900"
            border-color="border-transparent"
            outlined
            @click="props.onClose"
          />
          <base-button
            :loading="props.isLoading"
            label="delete"
            rounded
            color="border-critic-500 bg-critic-500 text-white"
            @click="props.onDeleteNews"
      />
    </template>
    </base-dialog>
</template>