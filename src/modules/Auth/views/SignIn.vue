<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
// Store
import { useAuthStore } from "../stores/index"
// Components
import BaseButton from "@/components/UI/BaseButton.vue"
const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)
const selectedCity = ref();
const toast = useToast();
const cities = ref([
  {
    name: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
  },
  {
    name: 'Drive My Car',
    value: 'song1'
  },
]);
const formModel = reactive({
  username: null,
  password: null
})
const rules = {
  username: {
    required: helpers.withMessage(`Необходим логин`, required)
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
    await authStore.actionUserLogin(formModel)
    await authStore.actionUserProfile()
    await router.push({
      name: "DashboardIndex"
    })
  } catch (error) {

  }

  loading.value = false
}
</script>
<template>
  <div class="sign-in-view">
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Войти</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p>

    <TabView>
      <TabPanel>
        <template #header class="">
          <span class="w-full flex items-center justify-center">
            <base-icon name="UserIcon" class="duration-[400ms] inline group-hover:text-white  mr-2" />
            Логин
          </span>
        </template>

        <form @submit.prevent="logIn">
          <base-col col-class="w-1/1">
            <base-input
              v-model="v.username.$model"
              label="Логин"
              :error="v.username"
              placeholder="Введите логин"
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
        <Toast />
      </TabPanel>

      <TabPanel>
        <template #header>
          <span class="w-full flex items-center justify-center">
            <base-icon name="KeyMinimalisticIcon" class="duration-[400ms] inline group-hover:text-white  mr-2" />
            ЭЦП
          </span>
        </template>
        <p>
        <div class="card flex justify-content-center">
          <Dropdown class="w-full" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Выбрать" />
        </div>
        </p>
      </TabPanel>
    </TabView>

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
