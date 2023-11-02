<script setup>
// Core
import { watch } from 'vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegStatement } from '../../stores/statement.store'
// Components
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const statementStore = useRegStatement()
// Watch
watch(
  () => statementStore.detailModel.__reviewers,
  // (value) => {
  //   statementStore.detailModel.reviewers = value.map(item => ({ user: item.id }))
  // }
)
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-calendar
          v-model="statementStore.detailModel.outgoing_date"
          label="registration-date"
          placeholder="registration-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="statementStore.detailModel.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent" />
      </base-col>


      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="statementStore.detailModel.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <multiple-user
          v-model="statementStore.detailModel.__reviewers"
          display="chip"
          label="reviewers"
          placeholder="enter-reviewers"
        />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="statementStore.detailModel.description"
          label="content" />
      </base-col>

    </base-row>
  </div>
</template>
