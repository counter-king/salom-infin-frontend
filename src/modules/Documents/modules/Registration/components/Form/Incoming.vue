<script setup>
// Core
import { watch } from 'vue'
import { useRoute } from 'vue-router'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegIncoming } from '../../stores/incoming.store'
// Components
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Composable
const route = useRoute()
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const incomingStore = useRegIncoming()
// Watch
watch(
  () => incomingStore.detailModel.__reviewers,
  (value) => {
    incomingStore.detailModel.reviewers = value.map(item => ({ user: item.id }))
  }
)
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          v-model="incomingStore.detailModel.register_number"
          label="reg-number"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="incomingStore.detailModel.outgoing_number"
          label="out-number"
          placeholder="enter-out-number"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.grif"
          label="grif"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.language"
          :options="commonStore.languagesList"
          option-value="id"
          option-label="name"
          label="language-document"
          placeholder="enter-language-document"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model.number="incomingStore.detailModel.number_of_papers"
          label="number-sheets"
          placeholder="number-sheets"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="incomingStore.detailModel.register_date"
          label="reg-date"
          placeholder="enter-reg-date"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="incomingStore.detailModel.outgoing_date"
          label="out-date"
          placeholder="enter-out-date"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document-type"
          placeholder="enter-deliver-type"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.delivery_type"
          :options="commonStore.deliveryTypeList"
          option-value="id"
          label="deliver-type"
          placeholder="enter-document-type"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="incomingStore.detailModel.priority"
          :options="commonStore.prioryList"
          option-value="id"
          label="priority-document"
          placeholder="enter-priority"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="incomingStore.detailModel.title"
          label="naming"
          placeholder="naming"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <multiple-user
          v-model="incomingStore.detailModel.__reviewers"
          display="chip"
          label="reviewers"
          placeholder="enter-reviewers"
        />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="incomingStore.detailModel.description"
          label="content"
        />
      </base-col>
    </base-row>
  </div>
</template>
