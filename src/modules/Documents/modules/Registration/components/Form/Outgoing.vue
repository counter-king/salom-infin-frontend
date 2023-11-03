<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegOutgoing } from '../../stores/outgoing.store'
// Non-reactive
const rules = {
  register_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __department: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __signers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  correspondent: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  author: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const innerOutgoing = useRegOutgoing()
const $v = useVuelidate(rules, innerOutgoing.detailModel)
// Composable
defineExpose({ $v })
// Watch
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          required
          v-model="$v.register_number.$model"
          :error="$v.register_number"
          label="reg-number" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          required
          v-model="$v.outgoing_date.$model"
          :error="$v.outgoing_date"
          label="registration-date"
          placeholder="registration-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.document_type.$model"
          :error="$v.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document_type"
          placeholder="document_type" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.__department.$model"
          :error="$v.__department"
          :options="commonStore.departmentList"
          option-value="id"
          label="enter-department"
          placeholder="enter-department" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.author.$model"
          :error="$v.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.__signers.$model"
          :error="$v.__signers"
          :options="commonStore.usersList"
          option-value="id"
          label="signers"
          placeholder="signers" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.correspondent.$model"
          :error="$v.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent" />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          required
          v-model="$v.description.$model"
          :error="$v.description"
          label="content" />
      </base-col>

    </base-row>
  </div>
</template>
