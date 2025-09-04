<script setup>
// Core
import { onMounted, ref, useModel } from "vue";
import {useI18n} from "vue-i18n";
// Components
import Eimzo from "@/components/EIMZO/Eimzo.vue"
import { useAuthStore } from "@/modules/Auth/stores";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  sendButtonLoading: {
    type: Boolean,
    default: false
  },
  sendButtonLabel: {
    type: String,
    default: 'send'
  },
  withSign: {
    type: Boolean,
    default: false
  }
})
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()

const isHostVercel = ref(null)

const emit = defineEmits(['update:modelValue', 'emit:send'])

onMounted(() => {
  isHostVercel.value = window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' || window.location.host.startsWith('localhost')
})
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
<!--      <base-button-->
<!--        label="save-as-draft"-->
<!--        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"-->
<!--        rounded-->
<!--        shadow-->
<!--        border-color="border-transparent"-->
<!--      />-->

      <div
        v-if="withSign"
        class="flex justify-end"
      >
        <base-button
          v-if="isHostVercel || useAuthStore().currentUser.id === 1"
          label="sign"
          :loading="sendButtonLoading"
          rounded
          shadow
          type="button"
          @click="emit('emit:send', 'test')"
        />

        <eimzo
          v-else
          type="sign"
          data="resolution-performer"
          input-classes="bg-white !rounded-3xl !w-[330px]"
          sign-button-label="sign-and-send"
          :button-loading="sendButtonLoading"
          @emit:onGetPkcs7="(pkcs7) => emit('emit:send', pkcs7)"
        />
      </div>

      <base-button
        v-else
        :label="sendButtonLabel"
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
