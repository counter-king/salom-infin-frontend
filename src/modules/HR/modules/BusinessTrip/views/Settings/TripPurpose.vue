<script setup>
// cores
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';
// components
import AddButton from './components/AddButton.vue';
import Empty from '@/components/Empty.vue';
import { TripModal, TripTable } from './components/TripPrupose';


const { t } = useI18n()
// reactives
const tripModalVisible = ref(false)
// methods
const handleClickAddButton = () => {
  tripModalVisible.value = true
}

const headers = [
  {
    field: 'order',
    header: '№',
    width: 'w-[2%]'
  },
  {
    field: 'targets',
    header: 'targets',
    width: 'w-[60%]'
  },
  {
    field: 'documentType',
    header: 'document-type',
    width: 'w-[20%]'

  },
  {
    field: 'actions',
    header: 'actions',
    width: 'w-[10%]'
  }
]

</script>
<template>
  <div class="flex flex-col pt-4 min-h-[520px]">
    <!-- header -->
    <div class="flex items-center justify-between">
      <!-- title -->
       <p class="text-xl font-semibold text-greyscale-900">{{ t('business-trip-purpose') }}</p>
       <AddButton
        label="add-purpose"
        @click="handleClickAddButton"
       />
    </div>
    <!-- table -->
    <div v-if="true" class="mt-4">
      <TripTable :headers="headers"/>
    </div>
    <div v-else class="flex flex-col gap-6 items-center justify-center flex-1">
        <Empty
            title="current-no-trip-purpose"
            wrapper-class="shadow-none"
            label-classes="text-sm text-greyscale-400"
        />
        <AddButton
          @click="handleClickAddButton"
          label="add-purpose"
       />
    </div>    
    <!-- modal -->
    <TripModal v-model="tripModalVisible" label="create-trip-purpose"/>
  </div>
</template>

<style scoped>
</style>