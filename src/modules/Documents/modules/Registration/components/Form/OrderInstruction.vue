<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useRegOrderInstruction } from '../../stores/orderInstruction.store'
// Components
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Non-reactive
const rules = {
  name_document: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  register_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  magazine:{
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __department: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __reviewers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const commonStore = useCommonStore()
const orderInstructionStore = useRegOrderInstruction()
const $v = useVuelidate(rules, orderInstructionStore.detailModel)
// Composable
defineExpose({ $v })

</script>

<template>

  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          required
          v-model="$v.name_document.$model"
          :error="$v.name_document"
          label="title-document"
          placeholder="enter-document" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          required
          v-model="$v.register_number.$model"
          :error="$v.register_number"
          label="reg-number"
          placeholder="reg-number" />
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
          v-model="$v.magazine.$model"
          :error="$v.magazine"
          :options="commonStore.magazineList"
          option-value="id"
          label="magazine"
          placeholder="enter-magazine" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.magazine.$model"
          :error="$v.magazine"
          :options="commonStore.magazineList"
          option-value="id"
          label="magazine"
          placeholder="enter-magazine" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.__department.$model"
          :error="$v.__department"
          :options="commonStore.departmentList"
          option-value="id"
          label="department"
          placeholder="department" />
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
        <multiple-user
          required
          v-model="$v.__reviewers.$model"
          :error="$v.__reviewers"
          display="chip"
          label="reviewers"
          placeholder="enter-reviewers"
        />
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
