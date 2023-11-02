<script setup>
// Core
import { watch } from 'vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegIncomingBranches } from '../../stores/incomingBranches.store'
// Components
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const incomingBranchesStore = useRegIncomingBranches()
// Watch
watch(
  () => incomingBranchesStore.detailModel.__reviewers,
  // (value) => {
  //   incomingBranchesStore.detailModel.reviewers = value.map(item => ({ user: item.id }))
  // }
)
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingBranchesStore.detailModel.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document-type"
          placeholder="enter-deliver-type"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="incomingBranchesStore.detailModel.register_number"
          label="reg-number"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="incomingBranchesStore.detailModel.outgoing_date"
          label="registration-date"
          placeholder="registration-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingBranchesStore.detailModel.branch"
          :options="correspondentStore.branchList"
          option-value="id"
          label="branch"
          placeholder="enter-branch" />
      </base-col>


      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingBranchesStore.detailModel.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="incomingBranchesStore.detailModel.description"
          label="content" />
      </base-col>

    </base-row>
  </div>
</template>
