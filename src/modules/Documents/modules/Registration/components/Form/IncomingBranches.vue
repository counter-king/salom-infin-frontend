<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegIncomingBranches } from '../../stores/incomingBranches.store'
// Components
// import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Non-reactive
const rules = {
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  register_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  branch: {
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
const incomingBranchesStore = useRegIncomingBranches()
const $v = useVuelidate(rules, incomingBranchesStore.detailModel)
// Composable
defineExpose({ $v })
// Watch
watch(
  () => incomingBranchesStore.detailModel.__reviewers,
)
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.document_type.$model"
          :error="$v.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document-type"
          placeholder="enter-deliver-type"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          required
          v-model="$v.register_number.$model"
          :error="$v.register_number"
          label="reg-number"
        />
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
          v-model="$v.branch.$model"
          :error="$v.branch"
          :options="correspondentStore.branchList"
          option-value="id"
          label="branch"
          placeholder="enter-branch" />
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
