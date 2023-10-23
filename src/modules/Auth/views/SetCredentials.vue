<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';

const props = defineProps({
  title: {
    type: String,
    default: "Confirm number"
  }
})

const model = ref({
  phone_number: null,
  password: null,
  reenteredPassword: null
})

// const validatePasswordStartWith = (rule, value) => {
//   return !!model.value.password && model.value.password.startsWith(value) && model.value.password.length >= value.length;
// }

// const validatePasswordSame = (rule, value) => {
//   return value === model.value.password;
// }

const handlePasswordInput = () => {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
}

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
//   ],
//   reenteredPassword: [
//     {
//       required: true,
//       message: "Re-entered password is required",
//       trigger: ["input", "blur"]
//     },
//     {
//       validator: validatePasswordStartWith,
//       message: "Password is not same as re-entered password!",
//       trigger: "input"
//     },
//     {
//       validator: validatePasswordSame,
//       message: "Password is not same as re-entered password!",
//       trigger: ["blur", "password-input"]
//     }
//   ]
// }

</script>
<template>
  <div class="sign-in-view">
    <h1  class="text-2xl decoration-zinc-950  font-bold mb-1 text-center">Set Credensial</h1>
    <p class="font-light text-sm text-color-3 text-center mb-7">Welcome back, you’ve been missed!</p>

    <form @submit="onSubmit" :model="model"  :rules="rules">
      <div class="w-full mb-3">
        <label class="w-full" for="login">Логин</label>
        <InputText
          class="w-full"  id="login"
          v-model="model.phone_number"
          placeholder="Введите логин"
          />
        <small class="p-error" id="text-username">Username is required</small>
      </div>

      <div class="w-full mb-3">
        <label class="w-full" for="parol">Пароль</label>
        <Password
         class="w-full input--Password"
         placeholder="Введите пароль"
         @input="handlePasswordInput"
         v-model="model.password"
         toggleMask />
        <small class="p-error" id="text-password">Username is required</small>
      </div>

      <div class="w-full mb-3">
        <label class="w-full" for="parol">Пароль</label>
        <Password
          class="w-full input--Password"
          placeholder="Повторно введите пароль"
          v-model="model.password"
          toggleMask />
        <small class="p-error" id="text-password">Username is required</small>
      </div>

      <Button class="w-full" type="submit" severity="success" label=" Войти в систему" />
    </form>

  </div>
</template>

<style lang="scss">
.input--Password input{
  width: 100%;
}
</style>
