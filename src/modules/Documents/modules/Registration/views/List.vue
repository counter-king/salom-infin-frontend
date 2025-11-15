<script setup>
// Core
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Store
import { useCommonStore } from '@/stores/common'
import { useDocFlowStore } from '../stores/docflow.store'
// Components
import { DocTypeChip, StatusChip, PriorityChip } from '@/components/Chips'
import { ActionToolbar } from '@/components/Actions'
import { LinkableCell } from '@/components/Table'
import { Plus20SolidIcon } from '@/components/Icons'
import RegisterDocumentDialog from '../components/RegisterDocumentDialog.vue'
// Constants
import { R_INCOMING_COLUMNS } from '../constants'
// Utils
import { formatDate, formatDateMonth } from '@/utils/formatDate'
import { firstLetterCapitalize } from "@/utils"
// Enums
import { JOURNAL } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const filterKeys = ['approvers', 'author', 'curator', 'signers', 'departments', 'register_number', 'status']
const keysToIncludeOnClearFilter = ['type', 'journal_id']
// Computed
const journal = computed(() => commonStore.getJournalByCode(route.params.code))
// Reactive
const date = ref(firstLetterCapitalize(formatDateMonth(new Date(), 'ru', new Date().getMonth())))
const year = ref()
const month = ref(new Date().getMonth() + 1)
const monthName = ref()
// Watch
watch(
  () => route.params.code,
  async (_route) => {
		if(route.params.code) {
			await router.replace({
				query: {
					...route.query,
					journal_id: journal.value.id,
          page_size: 15
				}
			})
			_route && await docFlowStore.actionGetList(route.query)
		}
  },
)
// Methods
const openModal = () => {
  docFlowStore.actionLoadFormCreateDocument({ journalCode: route.params.code })
  docFlowStore.actionToggleModalCreateDocument(true)
}
const link = (data) => {
  return {
    name: 'RegistrationShow',
    params: {
      code: route.params.code,
      id: data.id
    }
  }
}
const dateSelect = async () => {
  const currentDate = new Date(date.value)
  const monthIndex = currentDate.getMonth()
  const yearValue = currentDate.getFullYear().toString()

  monthName.value = firstLetterCapitalize(
    formatDateMonth(currentDate, 'ru', monthIndex)
  )

  date.value = monthIndex.toString()
  year.value = yearValue
  month.value = monthIndex + 1
}
</script>

<template>
  <div class="registration-incoming-view">
    <action-toolbar
      :title="journal?.name"
      :column-menu-items="docFlowStore.headers"
      :storage-columns-name="R_INCOMING_COLUMNS"
      :action-list="docFlowStore.actionGetList"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      @emit:reset-headers="docFlowStore.resetHeaders"
    >
<!--      <template #filter-before>-->
<!--        <base-calendar-button-->
<!--          v-model="date"-->
<!--          view="month"-->
<!--          date-format="mm"-->
<!--          primary-->
<!--          root-class="!bg-primary-500 !text-white !border !border-greyscale-70 !shadow-none"-->
<!--          :parsed-text="monthName"-->
<!--          :clearable="false"-->
<!--          @emit:date-select="dateSelect"-->
<!--        />-->
<!--      </template>-->

      <template #end>
        <base-button
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="openModal"
        />
      </template>
    </action-toolbar>

<!--    <base-day-picker-->
<!--      class="mb-1"-->
<!--    />-->

    <base-data-table
      :action-list="docFlowStore.actionGetList"
      :api-params="{
        journal_id: route.query.journal_id ?? JOURNAL.INCOMING,
        page_size: 15
      }"
      :headers="docFlowStore.headers"
      :value="docFlowStore.list"
      :total-count="docFlowStore.totalCount"
      :loading="docFlowStore.listLoading"
      :storage-columns-name="R_INCOMING_COLUMNS"
      expandable
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => docFlowStore.headers = val"
    >
      <template #priority="{ data }">
        <linkable-cell :to="link(data)">
          <priority-chip :id="data?.priority?.id" />
        </linkable-cell>
      </template>

      <template #title="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.title }}
        </linkable-cell>
      </template>

      <template #document_type="{ data }">
        <linkable-cell :to="link(data)">
          <doc-type-chip :type="data?.document_type?.name"/>
        </linkable-cell>
      </template>

      <template #delivery_type="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.delivery_type?.name }}
        </linkable-cell>
      </template>

      <template #description="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.description }}
        </linkable-cell>
      </template>

      <template #journal="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.journal.name }}
        </linkable-cell>
      </template>

      <template #language="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.language?.name }}
        </linkable-cell>
      </template>

      <template #number_of_papers="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.number_of_papers }}
        </linkable-cell>
      </template>

      <template #outgoing_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data?.outgoing_date) }}
        </linkable-cell>
      </template>

      <template #outgoing_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.outgoing_number }}
        </linkable-cell>
      </template>

      <template #register_number="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.register_number }}
        </linkable-cell>
      </template>

      <template #register_date="{ data }">
        <linkable-cell :to="link(data)">
          {{ formatDate(data?.register_date) }}
        </linkable-cell>
      </template>

      <template #reviewers="{ data }">
        <linkable-cell :to="link(data)">
          <base-avatar-group
            :items="data?.reviewers"
            shape="circle"
            detail-dialog
            avatar-classes="w-8 h-8"
          />
        </linkable-cell>
      </template>

      <template #status="{ data }">
        <linkable-cell v-if="data?.status" :to="link(data)">
          <status-chip :status="data?.status"/>
        </linkable-cell>
      </template>

      <template #correspondent="{ data }">
        <linkable-cell :to="link(data)">
          {{ data?.correspondent?.name }}
        </linkable-cell>
      </template>
    </base-data-table>

    <!-- RegisterDocumentDialog -->
    <register-document-dialog v-model="docFlowStore.documentMenuModal" />
    <!-- /RegisterDocumentDialog -->
  </div>
</template>

<style scoped>

</style>
