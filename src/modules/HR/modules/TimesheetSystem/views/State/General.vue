<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseInput from '@/components/UI/BaseInput.vue';
import { MagniferIcon } from '@/components/Icons';
// components
import DataTable from '../../components/state/DataTable.vue';
// stores
import { useStateStore } from '@/modules/HR/modules/TimesheetSystem/stores/state.store';
// composibles
const { t } = useI18n()
const stateStore = useStateStore()
// reactives
const search = ref('')

</script>
<template>
    <div class="bg-white rounded-xl h-[calc(100vh-300px)]">
      <!-- top bar -->
      <div class="flex items-center justify-end p-3">
        <base-input
          v-model="search"
          :icon-left="MagniferIcon"
          :placeholder="t('search')"
          class="flex p-input-icon-left items-center w-[205px]"
          input-class="!pl-10 p-3 bg-white text-xs !rounded-[90px] placeholder:text-xs"
          icon-left-class="!w-4 !h-4"
        />
      </div>
      <!-- table -->
      <div>
        <DataTable 
          :value="stateStore.generalList"
          :headers="stateStore.generalHeaders"
          scroll-height="calc(100vh - 300px)"
          />
      </div>
    </div>
</template>
