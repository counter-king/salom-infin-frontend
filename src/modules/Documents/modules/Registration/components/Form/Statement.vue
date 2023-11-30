<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegStatement } from '../../stores/statement.store'
// Components
import { UserWithLabel } from '@/components/Users'
// Utils
import { isObject } from '@/utils'
// Non-reactive
const rules = {
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  correspondent: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  author: {
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __reviewers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const statementStore = useRegStatement()
const $v = useVuelidate(rules, statementStore.detailModel)
// Composable
defineExpose({ $v })
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
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
          v-model="$v.correspondent.$model"
          :error="$v.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.author.$model"
          :error="$v.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.document_type.$model"
          :error="$v.document_type"
          :options="commonStore.documentTypesList"
          required
          option-value="id"
          label="document-type"
          placeholder="enter-deliver-type"
        />
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
