<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DangerCircleBoldIcon } from '@/components/Icons'
import { useAuthStore } from '@/modules/Auth/stores'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const dialog = ref(true)

const login = async () => {
  await router.push({ name: 'Login' })
  authStore.actionSessionEnd(false)
  window.location.reload()
}
const clearDocument = () => {
  login()
}
</script>

<template>
  <base-dialog
    v-model="dialog"
    label="create-resolutions"
    max-width="max-w-[472px]"
    header-classes="!hidden"
    content-classes="!p-6 rounded-3xl"
    footer-classes="!hidden"
    @emit:after-hide="clearDocument"
  >
    <template #content>
      <div class="text-center pt-8">
        <div class="flex items-center justify-center bg-critic-50 w-20 h-20 rounded-full mx-auto">
          <base-iconify
            :icon="DangerCircleBoldIcon"
            class="w-8 h-8 text-critic-500"
          />
        </div>

        <h1 class="text-lg text-greyscale-900 font-semibold mt-6 mb-1 px-10">{{ t('auth-session-end-title') }}</h1>

        <span class="block font-medium text-sm text-greyscale-400 px-10 mb-16">{{ t('auth-session-end-description') }}</span>

        <base-button
          size="large"
          label="sign-in"
          rounded
          type="button"
          block
          class="w-full"
          @click="login"
        />
      </div>
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
