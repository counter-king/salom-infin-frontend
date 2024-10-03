<script setup>
// Core
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from "vue-router"
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Components
import { UserIcon, DisplayIcon, KeyMinimalisticIcon } from '@/components/Icons'
import Eimzo from "@/components/EIMZO/Eimzo.vue"
// Store
import { useAuthStore } from '../stores'
// Utils
import { removeStorageItem } from '@/utils/storage'
import { ACCESS, REFRESH, EXPIRES } from '@/constants/storage'
// Composable
const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()
// Reactive
const filesList = ref([
  {
    title: t('login'),
    slot: 'login',
    icon: UserIcon
  },
  {
    title: 'AD',
    slot: 'active-directory',
    icon: DisplayIcon
  },
  {
    title: t('eri'),
    slot: 'eri',
    icon: KeyMinimalisticIcon
  }
])
const loading = ref(false)
const activeTab = ref(null)
const selectedCity = ref()
const cities = ref([
  {
    name: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
  },
  {
    name: 'Drive My Car',
    value: 'song1'
  },
])
const formModel = reactive({
  username: '+998',
  password: null
})
const formModelAd = reactive({
  username: null,
  password: null
})
const rules = {
  username: {
    required: helpers.withMessage(`Необходим телефона`, required)
  },
  password: {
    required: helpers.withMessage(`Необходим пароль`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
}
const rulesAd = {
  username: {
    required: helpers.withMessage(`Необходим имя компьютера`, required)
  },
  password: {
    required: helpers.withMessage(`Необходим пароль`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
}
// Methods
const v = useVuelidate(rules, formModel)
const v2 = useVuelidate(rulesAd, formModelAd)
const logIn = async () => {
  const valid = await v.value.$validate()
  if (!valid) {
    return
  }

  try {
    loading.value = true
    await authStore.actionUserLogin({
      ...formModel,
      username: formModel.username?.replace(/\D/g, '')
    })
    await authStore.actionUserProfile()
    await router.push({
      name: "DashboardIndex"
    })
  }
  catch (error) {

  }
  finally {
    loading.value = false
  }
}
const logInWithAd = async () => {
  const valid = await v2.value.$validate()
  if (!valid) {
    return
  }

  try {
    loading.value = true
    await authStore.loginWithAd(formModelAd)
    await authStore.actionUserProfile()
    await router.push({
      name: "DashboardIndex"
    })
  }
  catch (error) {

  }
  finally {
    loading.value = false
  }
}
const loginViaEri = async (pkcs7) => {
  try {
    loading.value = true
    await authStore.actionLoginViaERI({pkcs7})
    await authStore.actionUserProfile()
    await router.push({
      name: "DashboardIndex"
    })
  }
  catch (err) {

  }
  finally {
    loading.value = false
  }
}

// Hooks
onMounted(() => {
  removeStorageItem(ACCESS)
  removeStorageItem(REFRESH)
  removeStorageItem(EXPIRES)
})
</script>
<template>
  <div class="sign-in-view">
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-7 text-center">{{ t('enter') }}</h1>
    <!-- <p class="text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p> -->

    <base-tab-view
      :tab-view="filesList"
      scrollable
      bricks
      nav-container-class="max-w-[350px] w-full m-auto"
      @emit:tab-click="(value) => activeTab = value"
    >
      <template #login>
        <form @submit.prevent="logIn">
          <base-col col-class="w-full">
            <base-input
              v-model="v.username.$model"
              :error="v.username"
              mask-rule="+998 ## ### ## ##"
              :label="t('mobile-phone')"
              placeholder="+998 XX XXX XX XX"
            />
          </base-col>

          <base-col col-class="w-full">
            <base-password
              v-model="v.password.$model"
              :label="t('password')"
              :error="v.password"
              :placeholder="t('enter-password')"
            />
          </base-col>

          <base-col col-class="w-full">
            <RouterLink :to="{ name: 'ForgetPassword' }" class="text-indigo-700 text-sm mb-3 mt-2 float-right">
              {{ t('forgot-password') }}
            </RouterLink>

            <base-button
              class="w-full"
              :label="t('sign-in')"
              size="large"
              shadow
              type="submit"
              rounded
              icon-left="LockKeyholeUnlockedIcon" :loading="loading">
            </base-button>
          </base-col>
        </form>
      </template>

      <template #active-directory>
        <form @submit.prevent="logInWithAd">
          <base-col col-class="w-full">
            <base-input
              v-model="v2.username.$model"
              :error="v2.username"
              :label="t('login-with-ad')"
              :placeholder="t('enter-ad-name')"
            />
          </base-col>

          <base-col col-class="w-full">
            <base-password
              v-model="v2.password.$model"
              :error="v2.password"
              :label="t('password')"
              :placeholder="t('enter-password')"
            />
          </base-col>

          <base-col col-class="w-full">
            <base-button
              type="submit"
              size="large"
              shadow
              rounded
              :loading="loading"
              :label="t('enter-with-ad')"
              class="w-full mt-3"
            >
            </base-button>
          </base-col>
        </form>
      </template>

      <template #eri>
        <template v-if="activeTab?.slot === 'eri'">
          <div class="card flex justify-content-center">
            <eimzo
              type="login"
              data="sign-in"
              :button-loading="loading"
              @emit:onGetPkcs7="(pkcs7) => loginViaEri(pkcs7)"
            />
          </div>
        </template>
      </template>
    </base-tab-view>

    <div class="text-center mt-4">
      {{ t('account-text') }}
      <router-link :to="{ name: 'ConfirmNumber' }" class="text-indigo-700">
        {{ t('register') }}
      </router-link>
    </div>
  </div>
</template>
<style>
.sign-in-view .p-tabview-panels {
  padding: 20px 0 0;
}
.sign-in-view .p-tabview-header {
  width: 50%;
}
</style>
