<script setup>
// Core
import { ref, shallowRef, computed, watch, defineAsyncComponent, provide } from 'vue'
import { useRouter } from 'vue-router'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
import { useSalaryStore } from '../../../../stores/profile/salary.store'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
const STEP_NAMES = {
  CONFIRM: 'Confirm',
  FORGET_PASSWORD: 'ForgetPassword',
  LOGIN: 'Login',
  SET_NEW_PASSWORD: 'SetNewPassword',
  SET_PASSWORD: 'SetPassword'
}
// Composable
const router = useRouter()
const authStore = useAuthStore()
const salaryStore = useSalaryStore()
// Reactive
const dialog = ref(true)
const component = shallowRef(null)
const step = ref(authStore.currentUser?.is_passcode_set
  ? STEP_NAMES.LOGIN
  : STEP_NAMES.SET_PASSWORD
)
const loading = ref(false)
// Computed
const componentLabel = computed(() => {
  switch(step.value) {
    case STEP_NAMES.CONFIRM:
      return 'Подтверждение'
    case STEP_NAMES.FORGET_PASSWORD:
      return 'Восстановить пароль'
    case STEP_NAMES.LOGIN:
      return 'Войти в зарплату'
    case STEP_NAMES.SET_NEW_PASSWORD:
      return 'Установить новый пароль'
    default:
      return 'Установить пароль'
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
const nextRoute = (cur, next) => {
  step.value = next
}
const setPasscode = async (cur, next) => {
  try {
    loading.value = true
    await salaryStore.setPasscode()
    dispatchNotify(null, 'Пароль успешно установлен!', COLOR_TYPES.SUCCESS)
    nextRoute(cur, next)
  }
  finally {
    loading.value = false
  }
}
const checkPasscode = async () => {
  try {
    loading.value = true
    await salaryStore.checkPasscode()
    dialog.value = false
    // пользователь заново вводить пароль,
    // чтобы войти на страницу зарплаты
    step.value = STEP_NAMES.LOGIN
  }
  catch (error) {

  }
  finally {
    loading.value = false
  }
}
const verifyNumber = async (cur, next) => {
  try {
    loading.value = true
    await salaryStore.verifyNumber()
    dispatchNotify(null, 'Пароль успешно установлен!', COLOR_TYPES.SUCCESS)
    nextRoute(cur, next)
  }
  finally {
    loading.value = false
  }
}
// Provide
provide('step-names', STEP_NAMES)
provide('next-step', nextRoute)
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
        @click="router.go(-1)"
      />

      <template v-if="step === STEP_NAMES.SET_PASSWORD">
        <base-button
          :loading="loading"
          :disabled="!salaryStore.setPasscodeModel.passcode"
          label="Установить"
          size="large"
          rounded
          @click="setPasscode(STEP_NAMES.SET_PASSWORD, STEP_NAMES.LOGIN)"
        />
      </template>

      <template v-if="step === STEP_NAMES.LOGIN">
        <base-button
          :loading="loading"
          :disabled="!salaryStore.checkPasscodeModel.passcode"
          label="Войти"
          size="large"
          rounded
          class="min-w-[105px]"
          @click="checkPasscode"
        />
      </template>

      <template v-if="step === STEP_NAMES.FORGET_PASSWORD">
        <base-button
          label="Продолжить"
          size="large"
          rounded
          @click="nextRoute(STEP_NAMES.FORGET_PASSWORD, STEP_NAMES.CONFIRM)"
        />
      </template>

      <template v-if="step === STEP_NAMES.CONFIRM">
        <base-button
          label="Подтвердить"
          size="large"
          rounded
          @click="verifyNumber(STEP_NAMES.CONFIRM, STEP_NAMES.SET_PASSWORD)"
        />
        <!-- Страница Установить новый Парол равен => Установить Парол -->
      </template>
    </template>
  </base-dialog>
</template>
