<script setup>
// core
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import CountryModal from './CountryModal.vue'
import DeleteModal from './DeleteModal.vue'
import { AddCircleBoldIcon, PenBoldIcon, TrashBinTrashIcon } from '@/components/Icons'
import Empty from '@/components/Empty.vue'
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'
import { useInfiniteScroll } from '../../composibles/useInfiniteScroll'
// services
import { fetchDeleteCountryById } from '@/modules/HR/modules/BusinessTrip/services'
// composibles
const { t } = useI18n()
const settingsStore = useSettingsStore()
// reactive
const deleteModalVisible = ref(false)
const countryModalVisible = ref(false)
const countyListWrapperRef = ref(null)
const deleteModalLoading = ref(false)
const selectedCountryEditId = ref(null)
// infinite scroll
useInfiniteScroll({ fetchFn: settingsStore.actionGetCountryList, countyListWrapperRef, params: { page: 1, page_size: 20 }})
// inject
const activeSelectedCountry = inject('activeSelectedCountry')
// methods
const handleClickCountry = (country) => {
  activeSelectedCountry.value = country
}
const handleDeleteCountry = (data) => {
  activeSelectedCountry.value = data
  deleteModalVisible.value = true
}
const handleEditCountry = (country) => { 
  selectedCountryEditId.value = country?.id
  countryModalVisible.value = true
}
const handleAddCountry = () => {
  
  selectedCountryEditId.value = null
  countryModalVisible.value = true
}

const handleClickDeleteModal = async() => {
  deleteModalLoading.value = true
  try {
    await fetchDeleteCountryById(activeSelectedCountry.value?.id)
    deleteModalVisible.value = false
    settingsStore.actionGetCountryList()
  } catch (err) {
    console.log(err)
  } finally {
    deleteModalLoading.value = false
  }
}

</script>
<template>
  <div class="w-1/2 pt-5 pr-6">
    <!-- title -->
    <div class="mb-4 text-xl font-semibold text-greyscale-900">{{ t('country') }}</div>
    <div v-if="true" class="flex flex-col gap-1">
      <!-- countries -->
      <div
        ref="countyListWrapperRef"
        class="flex flex-col gap-1 overflow-y-auto h-[calc(100vh-470px)]"
        >
        <template v-if="settingsStore.countryListLoading">
          <base-spinner/>
        </template>
        <template v-else>
          <template v-for="country in settingsStore.countryList" :key="country.id">
            <div 
              class="flex items-center justify-between group p-4 pr-3 hover:bg-primary-10 border-[1.5px] border-white hover:border-[1.5px] hover:border-primary-30 rounded-xl cursor-pointer"
              @click="handleClickCountry(country)"
              :class="{ '!bg-primary-10 !border-[1.5px] !border-primary-30': activeSelectedCountry?.id == country.id }" 
              >
              <p class="text-[15px] font-medium text-greyscale-900">{{ country.name }}</p>
              <!-- actions -->
              <div 
                class="flex items-center gap-4 opacity-0 group-hover:opacity-100"
                :class="{ 'opacity-100': activeSelectedCountry?.id == country.id }"
                >
                <base-iconify 
                  :icon="TrashBinTrashIcon" class="!w-5 !h-5 text-critic-500"
                  @click="handleDeleteCountry(country)"
                />
                <base-iconify 
                  :icon="PenBoldIcon" class="!w-5 !h-5 text-greyscale-400"
                  @click="handleEditCountry(country)"
                />
                <base-iconify 
                  :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
                  @click="handleAddCountry()"
                />
              </div>
            </div>
          </template>
        </template>
      </div>
      <!-- add country -->
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        @click="handleAddCountry()"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-country') }}</p>
      </div>
    </div>
    <!-- if there is no countries at all  -->
    <div v-else class="flex flex-col gap-5 justify-center items-center">
      <Empty 
        title="no-countries"
        wrapper-class="shadow-none"  
        label-classes="text-sm text-greyscale-400"
        />
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        @click="handleAddCountry()"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-country') }}</p>
      </div>
    </div>
  </div>
  <CountryModal
    v-if="countryModalVisible"
    :id="selectedCountryEditId"
    v-model="countryModalVisible"
    label="add-country"
    :max-width="'max-w-[600px]'"
  />
  <DeleteModal
    v-if="deleteModalVisible"
    v-model="deleteModalVisible"
    label="delete-country"
    :loading="deleteModalLoading"
    :max-width="'max-w-[472px]'"
    :content="{
      title: 'delete-country',
      description: 'want-delete-country',
      value: activeSelectedCountry?.name
    }"
    @click:delete="handleClickDeleteModal"
  />
</template>
