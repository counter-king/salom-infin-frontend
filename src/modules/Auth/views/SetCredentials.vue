<script setup>
import { ref, reactive } from 'vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
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
    required: helpers.withMessage(`Username is required`, required)
  },
  password: {
    required: helpers.withMessage(`Password is required`, required),
    minLength: helpers.withMessage(`Минимальная длина: 6 символа`, minLength(6))
  },
  reenteredPassword: {
    required: helpers.withMessage(`Password is required`, required),
    // sameAsPassword: helpers.withMessage(`Пароли не совпадают`, sameAs('password'))
  },

}
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
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Set Credensial</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Welcome back, you’ve been missed!</p>

    <form  @submit.prevent="logIn">
      <div class="w-full mb-3">
        <label class="w-full" for="login">Логин</label>
        <InputText class="w-full" id="login"
          v-model="v.phone_number.$model"
          placeholder="Введите логин"
          :class="{ 'p-invalid':  v.phone_number.$error}"
          :error="v.phone_number.$errors"
        />
        <small
          class="p-error"
          v-for="element of v.phone_number.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </div>

      <div class="w-full mb-3">
        <label class="w-full" for="parol">Пароль</label>
        <InputText
          class="w-full"
          type="text" id="parol"
          placeholder="Введите пароль"
          v-model="v.password.$model"
          :class="{ 'p-invalid':  v.password.$error}"
          :error="v.password.$errors"
        />
        <small
          class="p-error"
          v-for="element of v.password.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </div>

      <div class="w-full mb-3">
        <label class="w-full" for="parol">Пароль</label>
        <InputText
          class="w-full"
          type="text" id="parol"
          placeholder="Введите пароль"
          v-model="v.reenteredPassword.$model"
          :class="{ 'p-invalid':  v.reenteredPassword.$error}"
          :error="v.reenteredPassword.$errors"
          :disabled="!v.password.$model"
        />
        <small
          class="p-error"
          v-for="element of v.reenteredPassword.$errors"
          :key="element.$uid">
          <div class="form-error__message">{{element.$message}}</div>
        </small>
      </div>

      <base-button class="w-full" label="Войти в систему" size="large" shadow type="submit" rounded
        icon-left="LockKeyholeUnlockedIcon" :loading="loading"></base-button>
    </form>



  </div>
</template>

<style lang="scss">
.input--Password input{
  width: 100%;
}
</style>
