<script setup>
import { ref, computed } from 'vue'
import { useRouter } from "vue-router"
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'

const username = ref('')
const password = ref('')

const rules = computed(() => ({
  username: {
    required,
    minLength: helpers.withMessage(`Минимальная длина: 3 символа`, minLength(3))
  },
  password: {
    required,
    minLength: helpers.withMessage(`Минимальная длина: 3 символа`, minLength(3))
  },
}))

const v = useVuelidate(rules, { username, password })
const model = ref({
  username: "test",
  password: "test2023"
})
const logIn = async () => {

  v.value.$touch()

  if (v.value.$error) {
    try {
      loading.value = true
      await authStore.actionUserLogin(model.value)
      await authStore.actionUserProfile()
      await router.push({
        name: "DashboardIndex"
      })
    } catch (error) {
      // message.error(error.message)
    }
  }
  loading.value = false

  alert('Form submitted')
}


// Store
import { useAuthStore } from "../stores/index"
// Components
import BaseButton from "@/components/UI/BaseButton.vue"
const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const selectedCity = ref();
// const model = ref({
//   username: "test",
//   password: "test2023"
// })
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
// const rules = {
//   username: [
//     {
//       required: true,
//       trigger: ["input", "blur"],
//       message: "Username is required"
//     }
//   ],
//   password: [
//     {
//       required: true,
//       trigger: ["input", "blur"],
//       message: "Password is required"
//     }
//   ]
// }


const logIn2 = async () => {
  // formRef.value?.validate(async (errors) => {
  // if (errors) return message.error("Invalid")

  try {
    loading.value = true
    await authStore.actionUserLogin(model.value)
    await authStore.actionUserProfile()
    await router.push({
      name: "DashboardIndex"
    })
  } catch (error) {
    // message.error(error.message)
  }
  // loading.value = false
  // })
}
</script>
<template>
  <div class="sign-in-view">
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Sign In</h1>
    <p class="text-sm text-color-3 text-center mb-7">Welcome back, you’ve been missed!</p>

    <TabView>
      <TabPanel>
        <template #header class="">
          <span class="w-full flex items-center justify-center">
            <base-icon name="UserIcon" class="duration-[400ms] inline group-hover:text-white  mr-2" />
            Логин
          </span>
        </template>
        <p>
        <form ref="formRef" :model="model" :rules="rules" @submit.prevent="logIn">
          <div class="w-full mb-3">
            <label class="w-full" for="login">Текст</label>
            <InputText class="w-full" id="login" v-model:value="v.username.$model" placeholder="Введите логин" />
            <!-- <small class="p-error" id="text-username">Username is required</small> -->
          </div>

          <div class="w-full mb-3">
            <label class="w-full" for="parol">Текст</label>
            <InputText class="w-full" type="password" id="parol" v-model:value="v.password.$model"
              placeholder="Введите пароль" />
            <!-- <small class="p-error" id="text-password">Username is required</small> -->

          </div>

          <div class="mb-3 mt-2 text-right">
            <RouterLink :to="{ name: 'ForgetPassword' }" class="text-indigo-700 text-sm">
              Забыли пароль
            </RouterLink>
          </div>

          <base-button class="w-full" label=" Войти в систему" size="large" shadow type="submit" rounded
            icon-left="LockKeyholeUnlockedIcon" :loading="loading"></base-button>
        </form>
        </p>
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
