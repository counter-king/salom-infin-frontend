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
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Non-reactive
const rules = {
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  correspondent: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  author: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __reviewers: {
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
// Watch
watch(
  () => statementStore.detailModel.__reviewers,
)
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
          required
          v-model="$v.author.$model"
          :error="$v.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
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
