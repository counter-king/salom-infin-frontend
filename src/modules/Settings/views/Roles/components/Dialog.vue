<script setup>
// Core
import { useModel, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useRolesStore } from '../../../stores/roles.store'
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Const
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  type: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})
const emit = defineEmits(['update:modelValue', 'emit:success'])
// Non-reactive
const rules = {
  name: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const modelValue = useModel(props, 'modelValue')
const rolesStore = useRolesStore()
const $v = useVuelidate(rules, rolesStore.createModel)
// Reactive
const loading = ref(false)
// Methods
const submit = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    loading.value = true

    switch(props.type) {
      case FORM_TYPE_CREATE:
        await create()
        break
      case FORM_TYPE_UPDATE:
        await update()
        break;
      default:
        console.log('default')
    }
  }
  finally {
    loading.value = false
  }
}
const create = async () => {
  await rolesStore.createRole()
  await rolesStore.actionGetList()
  modelValue.value = false
  dispatchNotify(null, 'Права доступа создана', COLOR_TYPES.SUCCESS)
}
const update = async () => {
  await rolesStore.updateRole()
  await rolesStore.actionGetList()
  modelValue.value = false
  dispatchNotify(null, 'Права доступа изменен', COLOR_TYPES.SUCCESS)
}
const afterHide = () => {
  clearModel(rolesStore.createModel, ['is_active'])
  $v.value.$reset()
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[545px]"
    :label="props.type === FORM_TYPE_CREATE ? 'Создать роль' : props.type === FORM_TYPE_UPDATE ? 'Изменить роль' : ''"
    @emit:after-hide="afterHide"
  >
    <template #content>
      <div class="space-y-5 pb-10">
        <base-input
          v-model="$v.name.$model"
          :error="$v.name"
          required
          label="Наименование"
          placeholder="Наименование"
        />

        <div class="flex items-center justify-between !mt-7">
          <span class="text-sm font-medium text-greyscale-500">Статус</span>

          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-greyscale-900">{{ rolesStore.createModel.is_active ? 'Активный' : 'Не активный' }}</span>

            <base-switch
              v-model="rolesStore.createModel.is_active"
              class-body="flex"
              class-switch-root=""
            />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <base-button
        label="Отмена"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="modelValue = false"
      />

      <base-button
        :label="props.type === FORM_TYPE_CREATE ? 'Создать' : props.type === FORM_TYPE_UPDATE ? 'Изменить' : ''"
        rounded
        shadow
        border-color="border-transparent"
        :loading="loading"
        @click="submit"
      />
    </template>
  </base-dialog>
</template>
