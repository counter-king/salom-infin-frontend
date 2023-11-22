<script setup>
// Core
import { ref,onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Store
import { useSearchStore } from "../stores/index";
// Components
import { ExportButton} from "../../../components/Actions/index";
import SearchFilter from '../../../components/Toolbar/SearchFilter.vue'
// Composable
const { t } = useI18n()
const searchStore = useSearchStore();
// Hooks
onMounted(async () => {
  await searchStore.actionGetDocumentList({ page_size: searchStore.filterState.page_size });
})
</script>
<template>
  <div class="container mx-auto search_block">
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">{{ t('search') }}</h1>

      <export-button />
    </div>

    <div class="bg-white !rounded-xl p-5 mb-5">
      <div class="flex w-full h-12  rounded-full bg-greyscale-50 border-greyscale-50 focus:border-primary-500">
        <base-input
          class="!mb-0 flex-1 p-input-icon-left p-input-icon-right search_input"
          inputClass="h-12 bg-inherit border-transparent
          !focus:outline-none focus:ring-0  focus:border-inherit focus-visible:border-inherit"
          v-model="model"
          placeholder="document-number"
          >
          <template #input-icon-left>
            <base-icon name="MagniferIcon" width="16" height="16" class="text-greyscale-500 -mt-2"/>
          </template>

          <template #input-icon-right>
            <base-icon name="XIcon" width="20" height="20" class="bg-gray-300 text-greyscale-900 rounded-full p-1 cursor-pointer"/>
          </template>
        </base-input>

        <search-filter></search-filter>
      </div>
    </div>

    <base-card-table
      :value="searchStore.documentList"
      :page-size="searchStore.filterState.page_size"
      :loading="searchStore.listLoading"
    >
      <!-- <template #type="{ nameSearch }">
        <doc-type :type="nameSearch.type"/>
      </template> -->

    </base-card-table>

  </div>
</template>
<style>
.search_block .btn_fliter{
  height: 40px;
}
</style>
