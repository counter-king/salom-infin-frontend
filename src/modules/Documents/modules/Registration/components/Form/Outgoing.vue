<script setup>
// Core
import { watch } from 'vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegOutgoing } from '../../stores/outgoing.store'
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const innerOutgoing = useRegOutgoing()
// Watch
// watch(
//   (value) => {
//     innerOutgoing.detailModel.reviewers = value.map(item => ({ user: item.id }))
//   }
// )
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          v-model="innerOutgoing.detailModel.register_number"
          label="reg-number" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="innerOutgoing.detailModel.outgoing_date"
          label="registration-date"
          placeholder="registration-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="innerOutgoing.detailModel.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document_type"
          placeholder="document_type" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="innerOutgoing.detailModel.__department"
          :options="commonStore.departmentList"
          option-value="id"
          label="enter-department"
          placeholder="enter-department" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="innerOutgoing.detailModel.author"
          :options="commonStore.author"
          option-value="id"
          label="author"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="innerOutgoing.detailModel.__signers"
          :options="commonStore.usersList"
          option-value="id"
          label="signers"
          placeholder="signers" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="innerOutgoing.detailModel.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent" />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="innerOutgoing.detailModel.description"
          label="content" />
      </base-col>

    </base-row>
  </div>
</template>
