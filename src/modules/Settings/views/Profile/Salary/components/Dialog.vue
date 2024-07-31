<script setup>
// Core
import { ref, shallowRef, computed, watch, defineAsyncComponent, provide } from 'vue'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Enums
const STEP_NAMES = {
  CONFIRM: 'Confirm',
  FORGET_PASSWORD: 'ForgetPassword',
  LOGIN: 'Login',
  SET_NEW_PASSWORD: 'SetNewPassword',
  SET_PASSWORD: 'SetPassword'
}
// Reactive
const dialog = ref(true)
const component = shallowRef(null)
const step = ref(STEP_NAMES.SET_PASSWORD)
// Computed
const componentLabel = computed(() => {
  switch(step.value) {
    case STEP_NAMES.CONFIRM:
      return 'Подтверждение'
    case STEP_NAMES.FORGET_PASSWORD:
      return 'Восстановить парол'
    case STEP_NAMES.LOGIN:
      return 'Войти в зарплату'
    case STEP_NAMES.SET_NEW_PASSWORD:
      return 'Установить новый Парол'
    default:
      return 'Установить Парол'
  }
})
// Watch
watch(
  () => step.value,
  (value) => {
    component.value = defineAsyncComponent({
      loader: () => import(`./Form/${value}.vue`),
      loadingComponent: BaseSpinner,
      delay: 200
    })
  },
  { immediate: true }
)
// Methods
/**
* @param { string } cur текущая страница
* @param { string } next следующая Страница
 */
const next = async (cur, next) => {
  step.value = next
}
const login = async () => {
  // пользователь заного вводить пароль
  // чтобы войти на страницу зарплаты
  step.value = STEP_NAMES.LOGIN
}
// Provide
provide('step-names', STEP_NAMES)
provide('next-step', next)
</script>

<template>
  <base-dialog
    v-model="dialog"
    :label="componentLabel"
    max-width="max-w-[545px]"
    blur
  >
    <template #content>
      <component :is="component" />
    </template>

    <template #footer>
      <base-button
        label="back"
        size="large"
        border-color="border-transparent"
        outlined
        rounded
        shadow
        class="min-w-[105px]"
      />

      <template v-if="step === STEP_NAMES.SET_PASSWORD">
        <base-button
          label="Установить"
          size="large"
          rounded
          @click="next(STEP_NAMES.SET_PASSWORD, STEP_NAMES.LOGIN)"
        />
      </template>

      <template v-if="step === STEP_NAMES.LOGIN">
        <base-button
          label="Войти"
          size="large"
          rounded
          class="min-w-[105px]"
          @click="login"
        />
      </template>

      <template v-if="step === STEP_NAMES.FORGET_PASSWORD">
        <base-button
          label="Продолжить"
          size="large"
          rounded
          @click="next(STEP_NAMES.FORGET_PASSWORD, STEP_NAMES.CONFIRM)"
        />
      </template>

      <template v-if="step === STEP_NAMES.CONFIRM">
        <base-button
          label="Подтверждить"
          size="large"
          rounded
          @click="next(STEP_NAMES.CONFIRM, STEP_NAMES.SET_PASSWORD)"
        />
        <!-- Страница Установить новый Парол равен => Установить Парол -->
      </template>
    </template>
  </base-dialog>
</template>
