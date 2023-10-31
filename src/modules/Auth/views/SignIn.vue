<script setup>
<<<<<<< HEAD
import { ref, computed } from 'vue'
=======
import { ref, reactive } from 'vue'
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
import { useRouter } from "vue-router"
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
<<<<<<< HEAD
import { useVuelidate } from '@vuelidate/core'
=======
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import useVuelidate from '@vuelidate/core'
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
import { helpers, minLength, required } from '@vuelidate/validators'
// Store
import { useAuthStore } from "../stores/index"
// Components
import BaseButton from "@/components/UI/BaseButton.vue"
const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)
const selectedCity = ref();
<<<<<<< HEAD
=======
const toast = useToast();
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
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
<<<<<<< HEAD


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

const logIn = async () => {
  v.value.$touch()

  if (!v.value.$error) {
    console.log("salom");

    try {
      loading.value = true
      await authStore.actionUserLogin(
        {
          username: username.value,
          password: password.value
        })
      await authStore.actionUserProfile()
      await router.push({
        name: "DashboardIndex"
      })
    } catch (error) {
      // message.error(error.message)
    }
=======
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
      toast.add({ severity: 'error', summary: 'Есть ошибка', detail: "Неверный логин или пароль. Попробуйте еще раз.", life: 3000 });
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
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
<<<<<<< HEAD
        <p>
        <form   @submit.prevent="logIn">
          <div class="w-full mb-3">
            <label class="w-full" for="login">Текст</label>
            <InputText class="w-full" id="login"
                v-model:value="v.username.$model"
                placeholder="Введите логин"
                :error="v.username.$errors" />
            <!-- <small class="p-error" id="text-username">Username is required</small> -->
             <div
              class="form-error"
              v-for="element of v.username.$errors"
              :key="element.$uid">
              <div class="form-error__message">{{element.$message}}</div>
              <pre>
                {{ v.username.$errors }}
              </pre>
            </div>
          </div>

          <div class="w-full mb-3">
            <label class="w-full" for="parol">Текст</label>
            <InputText
             class="w-full"
             type="password" id="parol"
             v-model:value="v.password.$model"
             :error="v.password.$errors"
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
=======

        <form   @submit.prevent="logIn">
          <base-col col-class="w-1/1">
            <base-input
              v-model="v.username.$model"
              label="Логин"
              :errorClass="v.username.$error"
              placeholder="Введите логин"
            />
            <small
              class="p-error"
              v-for="element of v.username.$errors"
              :key="element.$uid">
              <div class="form-error__message">{{element.$message}}</div>
            </small>
          </base-col>

          <base-col col-class="w-1/1">
            <base-password
              v-model="v.password.$model"
              label="Пароль"
              :errorClass="v.password.$error"
              placeholder="Введите пароль"
            />
            <small
              class="p-error"
              v-for="element of v.password.$errors"
              :key="element.$uid">
              <div class="form-error__message">{{element.$message}}</div>
            </small>
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
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
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
<<<<<<< HEAD

=======
>>>>>>> 90db9076ef1d652521eb7e863c74f5c8d593e8c6
.sign-in-view .p-tabview-header {
  width: 50%;
}
</style>
