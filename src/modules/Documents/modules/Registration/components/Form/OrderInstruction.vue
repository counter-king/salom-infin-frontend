<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useRegOrderInstruction } from '../../stores/orderInstruction.store'
// Components
// import { SelectMultiple } from '@/components/Select'
import { UserWithLabel } from '@/components/Users'
// Utils
import { isObject } from '@/utils'
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
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
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
          label="reg-date"
          placeholder="registration-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.magazine.$model"
          :error="$v.magazine"
          :options="commonStore.magazineList"
          option-value="id"
          label="magazine"
          placeholder="enter-magazine" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
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
        <base-multi-select
          v-model="$v.__reviewers.$model"
          :error="$v.__reviewers"
          api-url="users"
          label="reviewers"
          display="chip"
          required
        >
          <template #chip="{ value }">
            <user-with-label
              :compact="true"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            />
          </template>

          <template #option="{ value }">
            <user-with-label
              :compact="true"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-6 h-6"
            />
          </template>

          <template #hint="{ value }">
            <user-with-label
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              shadow
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            />
          </template>
        </base-multi-select>
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
