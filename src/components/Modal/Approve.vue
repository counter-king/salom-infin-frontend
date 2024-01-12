<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
// Service
import { fetchApproveDocument } from "@/modules/Documents/modules/Boxes/services/approval.service";

const dialog = ref(false);
const route = useRoute();
const { t } = useI18n();
const buttonLoading = ref(false);

const emit = defineEmits(['emit:onApprove']);

// Methods
const onApprove = async () => {
  buttonLoading.value = true;
  const response = await fetchApproveDocument(route.params.id);
  if (response.status === 200) {
    emit('emit:onApprove');
    buttonLoading.value = false;
    dialog.value = false;
  }
}
</script>

<template>
  <base-button
    border-color="border-transparent"
    label="agree"
    icon-left="CheckCircleIcon"
    icon-height="16"
    icon-width="16"
    rounded
    shadow
    type="button"
    @click="dialog = true"
  />

  <base-dialog
    v-model="dialog"
    max-width="max-w-[472px]"
    label="Согласень документ"
    :draggable="false"
  >
    <template #content>
      <div class="flex flex-col justify-center items-center py-8 px-4">
        <div class="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-warning-50">
          <base-icon
            name="InfoCircleFilledIcon"
            width="40"
            height="40"
            color="#FFC352"
            :stroke="false"
          />
        </div>

        <div class="flex justify-center text-lg font-medium text-greyscale-900 text-center mt-6">
          {{ t('do-you-agree') }}
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
        @click="dialog = false"
      />
      <base-button
        label="agree"
        :loading="buttonLoading"
        rounded
        shadow
        type="button"
        @click="onApprove"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
