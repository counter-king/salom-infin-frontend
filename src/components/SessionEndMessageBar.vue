<script setup>
// Core
import { useRouter } from 'vue-router'
import Message from 'primevue/message'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Composable
const router = useRouter()
const authStore = useAuthStore()
// Methods
const login = async () => {
  await router.push({ name: 'Login' })
  authStore.actionSessionEnd(false)
  window.location.reload()
}
</script>

<template>
  <Transition>
    <template v-if="authStore.sessionEnd">
      <div class="fixed max-w-[600px] w-full z-[1110] bottom-[20px] right-[50%] translate-x-[50%]">
        <Message
          :closable="false"
          severity="error"
          :pt="{
            root: {
              class: [
                'm-0'
              ]
            },
            wrapper: {
              class: [
                'py-2 px-3'
              ]
            },
            text: {
              class: ['w-full']
            }
          }"
        >
          <template #messageicon>
            <span></span>
          </template>

          <div class="flex items-center gap-3">
            <p class="flex-1 text-sm font-medium">
              Сервер WorkZone испытывает проблему с соединением
            </p>

            <base-button
              severity="danger"
              label="Авторизоваться"
              text
              @click="login"
            />
          </div>
        </Message>
      </div>
    </template>
  </Transition>
</template>

<style scoped>

</style>
