<script setup>
import { ref, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, sameAs,  minLength, required} from '@vuelidate/validators'

const loading = ref(false)
const formModel = reactive({
  phone_number: null,
  password: null,
  reenteredPassword: null
})
const rules = {
  phone_number: {
    required: helpers.withMessage(`Имя пользователя требуется`, required)
  },
  password: {
    required: helpers.withMessage(`Необходим пароль`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
  reenteredPassword: {
    required: helpers.withMessage(`Необходим пароль`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
    // sameAsPassword: helpers.withMessage(`Пароли не совпадают`, sameAs('password'))
  },
}
// Methods
const v = useVuelidate(rules, formModel)
const logIn = async () => {
  const valid = await v.value.$validate()
  if (!valid) {
    return
  }
  loading.value = false
}
</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Установить учетные данные</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">С возвращением, вас скучали!</p>

    <form  @submit.prevent="logIn">
      <base-col col-class="w-1/1 pb-4">
        <base-input
          v-model="v.phone_number.$model"
          label="Логин"
          :errorClass="v.phone_number.$error"
          placeholder="Введите логин"
        />
        <small
          class="p-error"
          v-for="element of v.phone_number.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </base-col>

      <base-col col-class="w-1/1 pb-4">
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

      <base-col col-class="w-1/1 pb-4">
        <base-password
          v-model="v.reenteredPassword.$model"
          label="Пароль"
          :errorClass="v.reenteredPassword.$error"
          placeholder="Введите пароль"
        />
        <small
          class="p-error"
          v-for="element of v.reenteredPassword.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </base-col>

      <base-button class="w-full mt-2" label="Войти в систему" size="large" shadow type="submit" rounded
        icon-left="LockKeyholeUnlockedIcon" :loading="loading"></base-button>
    </form>
  </div>
</template>
