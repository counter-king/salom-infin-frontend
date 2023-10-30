<script setup>
import { ref, reactive, computed } from 'vue'
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
    required: helpers.withMessage(`Username is required`, required)
  },
  password: {
    required: helpers.withMessage(`Password is required`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
}

const toast = useToast();
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
      toast.add({ severity: 'error', summary: 'Xatolik bor', detail: "Login yoki parol noto'g'ri qayta urinib ko'ring", life: 3000 });
  }

  loading.value = false
}

</script>
<template>
  <div class="sign-in-view">
    <h1 class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Sign In</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Welcome back, you’ve been missed!</p>

    <TabView>
      <TabPanel>
        <template #header class="">
          <span class="w-full flex items-center justify-center">
            <base-icon name="UserIcon" class="duration-[400ms] inline group-hover:text-white  mr-2" />
            Логин
          </span>
        </template>
        <p>
          <form   @submit.prevent="logIn">
            <div class="w-full mb-3">
              <!-- <InputText class="w-full" id="login"
                  v-model="v.username.$model"
                  placeholder="Введите логин"
                  :class="{ 'p-invalid':  v.username.$error}"
                  :error="v.username.$errors" /> -->

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
            </div>

            <div class="w-full mb-3">
              <base-col col-class="w-1/1">
                <base-input
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
            </div>

            <div class="mb-3 mt-2 text-right">
              <RouterLink :to="{ name: 'ForgetPassword' }" class="text-indigo-700 text-sm">
                Забыли пароль
              </RouterLink>
            </div>

            <base-button class="w-full"  label=" Войти в систему" size="large" shadow type="submit" rounded
              icon-left="LockKeyholeUnlockedIcon" :loading="loading">
            </base-button>
          </form>

          <Toast />

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
