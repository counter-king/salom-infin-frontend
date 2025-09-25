<script setup>
import { useModel, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { useAssignmentRolesStore } from '../../../stores/assignment-roles.store'
import { SelectSingle, SelectUserMultiple } from '@/components/Select'
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
import {FORM_TYPE_CREATE, FORM_TYPE_READ, FORM_TYPE_UPDATE} from '@/constants/constants'
import {formatDateReverse} from "@/utils/formatDate";

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
  __user: {
    required: helpers.withMessage(t('required-text'), required)
  }
}

const modelValue = useModel(props, 'modelValue')
const assignmentRolesStore = useAssignmentRolesStore()
const $v = useVuelidate(rules, assignmentRolesStore.createModel)

const loading = ref(false)

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
  await assignmentRolesStore.createAssignmentRole()
  await assignmentRolesStore.getAssignmentRoleList()
  modelValue.value = false
  dispatchNotify(null, t('created-permission'), COLOR_TYPES.SUCCESS)
}
const update = async () => {
  await assignmentRolesStore.updateAssignmentRole()
  await assignmentRolesStore.getAssignmentRoleList()
  modelValue.value = false
  dispatchNotify(null, t('edited-permission'), COLOR_TYPES.SUCCESS)
}
const afterHide = () => {
  clearModel(assignmentRolesStore.createModel, ['is_active'])
  $v.value.$reset()
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    max-width="max-w-[545px]"
    :label="props.type === FORM_TYPE_CREATE ? t('create-role-assignment') : props.type === FORM_TYPE_UPDATE ? t('update-role-assignment') : ''"
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

        <select-user-multiple
          v-model="$v.__user.$model"
          :error="$v.__user"
          required
          label="users"
          placeholder="users"
        />

        <base-calendar
          v-model="assignmentRolesStore.createModel.valid_from"
          :min-date="new Date() /* Минимальная дата сегодняшние число */"
          label="start-date"
          placeholder="start-date"
          @update:modelValue="(value) => assignmentRolesStore.createModel.valid_from = formatDateReverse(value)"
        />

        <base-calendar
          v-model="assignmentRolesStore.createModel.valid_until"
          :min-date="new Date() /* Минимальная дата сегодняшние число */"
          label="end-date"
          placeholder="end-date"
          @update:modelValue="(value) => assignmentRolesStore.createModel.valid_until = formatDateReverse(value)"
        />

        <div class="flex items-center justify-between !mt-7">
          <span class="text-sm font-medium text-greyscale-500">{{ t('status') }}</span>

          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-greyscale-900">{{ assignmentRolesStore.createModel.enabled ? t('active') : t('non-active') }}</span>

            <base-switch
              v-model="assignmentRolesStore.createModel.enabled"
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
