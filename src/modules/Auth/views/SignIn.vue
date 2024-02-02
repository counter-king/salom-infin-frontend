<script setup>
// Core
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from "vue-router"
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Store
import { useAuthStore } from '../stores'
// Utils
import { removeStorageItem } from '@/utils/storage'
import { ACCESS, REFRESH, EXPIRES } from '@/constants/storage'
// Composable
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
// Reactive
const filesList = ref([
  {
    title: 'Логин',
    slot: 'login',
    icon: 'UserIcon'
  },
  {
    title: 'ЭЦП',
    slot: 'eri',
    icon: 'KeyMinimalisticIcon'
  }
])
const loading = ref(false)
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
// Methods
const v = useVuelidate(rules, formModel)
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
  } catch (error) {

  }

  loading.value = false
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
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Войти</h1>
    <p class="text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p>

    <base-tab-view
      :tab-view="filesList"
      scrollable
      bricks
      nav-container-class="max-w-[350px] w-full m-auto"
    >
      <template #login="{ value }">
        <form @submit.prevent="logIn">
          <base-col col-class="w-1/1">
            <base-input
              v-model="v.username.$model"
              :error="v.username"
              mask-rule="+### ## ### ## ##"
              label="Телефона"
              placeholder="Введите телефона"
            />
          </base-col>

          <base-col col-class="w-1/1">
            <base-password
              v-model="v.password.$model"
              label="Пароль"
              :error="v.password"
              placeholder="Введите пароль"
            />
          </base-col>

          <RouterLink :to="{ name: 'ForgetPassword' }" class="text-indigo-700 text-sm mb-3 mt-2 float-right">
            Забыли пароль
          </RouterLink>

          <base-button
            class="w-full"
            label=" Войти в систему"
            size="large"
            shadow
            type="submit"
            rounded
            icon-left="LockKeyholeUnlockedIcon" :loading="loading">
          </base-button>
        </form>
      </template>

      <template #eri="{ value }">
        <div class="card flex justify-content-center">
          <Dropdown class="w-full" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Выбрать" />
        </div>
      </template>
    </base-tab-view>

    <div class="text-center mt-4">
      У вас еще нет аккаунта ?
      <router-link :to="{ name: 'ConfirmNumber' }" class="text-indigo-700">
        Подтвердите номер
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
