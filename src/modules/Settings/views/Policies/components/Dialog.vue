<script setup>
import { useModel, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { usePoliciesStore } from '../../../stores/policies.store'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
import { SelectSingle, SelectResourceTree } from '@/components/Select'

const { t } = useI18n()

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

const rules = {
  __role: {
    required: helpers.withMessage(t('required-text'), required)
  },
  __resource: {
    required: helpers.withMessage(t('required-text'), required)
  },
  __action: {
    required: helpers.withMessage(t('required-text'), required)
  },
  __effect: {
    required: helpers.withMessage(t('required-text'), required)
  },
  param_time_end_hhmm: {
    required: helpers.withMessage(t('required-text'), required)
  }
}

const modelValue = useModel(props, 'modelValue')
const policiesStore = usePoliciesStore()
const $v = useVuelidate(rules, policiesStore.createModel)

const loading = ref(false)
const effectList = ref([
  {
    name: 'Ruxsat berish',
    value: 'allow',
  },
  {
    name: 'Rad etish',
    value: 'deny',
  }
])

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
  await policiesStore.actionCreatePolicies()
  await policiesStore.actionListPolicies()
  modelValue.value = false
  dispatchNotify(null, t('created-permission'), COLOR_TYPES.SUCCESS)
}
const update = async () => {
  await policiesStore.actionUpdatePolicies()
  await policiesStore.actionListPolicies()
  modelValue.value = false
  dispatchNotify(null, t('edited-permission'), COLOR_TYPES.SUCCESS)
}
const afterHide = () => {
  policiesStore.actionResetModel()
  $v.value.$reset()
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[545px]"
    :label="props.type === FORM_TYPE_CREATE ? t('create-permission') : props.type === FORM_TYPE_UPDATE ? t('edite-permission') : ''"
    @emit:after-hide="afterHide"
  >
    <template #content>
      <div class="space-y-5 pb-10">
        <select-single
          v-model="$v.__role.$model"
          :error="$v.__role"
          api-url="policies/roles"
          required
          label="roles"
          placeholder="roles"
        />

        <select-resource-tree
          v-model="$v.__resource.$model"
          :error="$v.__resource"
          required
          label="resource"
          placeholder="resource"
        />

        <select-single
          v-model="$v.__action.$model"
          :error="$v.__action"
          api-url="policies/actions"
          option-label="description"
          required
          label="methods"
          placeholder="methods"
        />

        <select-single
          v-model="$v.__effect.$model"
          :error="$v.__effect"
          v-model:options="effectList"
          required
          label="effect"
          placeholder="effect"
        />

        <div class="flex items-center justify-between !mt-7">
          <span class="text-sm font-medium text-greyscale-500">{{ t('status') }}</span>

          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-greyscale-900">{{ policiesStore.createModel.enabled ? t('active') : t('non-active') }}</span>

            <base-switch
              v-model="policiesStore.createModel.enabled"
              class-body="flex"
              class-switch-root=""
            />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <base-button
        label="cancel"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="modelValue = false"
      />

      <base-button
        :label="props.type === FORM_TYPE_CREATE ? t('create') : props.type === FORM_TYPE_UPDATE ? t('update') : ''"
        rounded
        shadow
        border-color="border-transparent"
        :loading="loading"
        @click="submit"
      />
    </template>
  </base-dialog>
</template>
