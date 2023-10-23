<script setup>
import { ref } from 'vue'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

// Store
import { useAuthStore } from "../stores/index"
const authStore = useAuthStore()

const model = ref({
  username: "test",
  password: "test2023"
})
const formRef = ref(null)
const loading = ref(false)
const selectedCity = ref();
const cities = ref([
    // { name: 'New York', code: 'NY' },
    // { name: 'Rome', code: 'RM' }
    {
      name: "Everybody's Got Something to Hide Except Me and My Monkey",
      value: 'song0',
    },
    {
      name: 'Drive My Car',
      value: 'song1'
    },
]);

const rules = {
  username: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Username is required"
    }
  ],
  password: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Password is required"
    }
  ]
}

const logIn = async () => {
  // formRef.value?.validate(async (errors) => {
    // if (errors) return message.error("Invalid")

    try {
      loading.value = true
      await authStore.actionUserLogin(model.value)
      await authStore.actionUserProfile()
      await router.push({
        name: "MainLayout"
      })
    } catch (error) {
      // message.error(error.message)
    }
    loading.value = false
  // })
}
</script>
<template>
  <div class="sign-in-view">
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Sign In</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Welcome back, you’ve been missed!</p>

    <TabView>
      <TabPanel>
        <template #header>
            <span class="w-full text-center">Логин</span>
        </template>
        <p>
          <form :model="model"  @submit.prevent="logIn" ref="formRef">
              <div class="w-full mb-3">
                <label class="w-full" for="login">Текст</label>
                <InputText class="w-full"  id="login" v-model="model.username"  placeholder="Введите логин" />
                <small class="p-error" id="text-username">Username is required</small>
              </div>

              <div class="w-full mb-3">
                <label class="w-full" for="parol">Текст</label>
                <InputText class="w-full"  type="password" id="parol" v-model="model.password"  placeholder="Введите пароль" />
                <small class="p-error" id="text-password">Username is required</small>
              </div>

              <div class="mb-3 -mt-4 text-right">
                <RouterLink :to="{ name: 'ForgetPassword' }" class="text-indigo-700 text-sm">
                  Забыли пароль
                </RouterLink>
              </div>

              <Button
                class="w-full"
                type="submit"
                label="Войти в систему"
                :loading="loading"
                />
          </form>
        </p>
      </TabPanel>
      <TabPanel>
        <template #header>
            <span class="w-full text-center">ЭЦП</span>
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
.sign-in-view .p-tabview-panels{
  padding: 20px  0 0;
}
.sign-in-view .p-tabview-header
{
  width: 50%;
}
</style>
