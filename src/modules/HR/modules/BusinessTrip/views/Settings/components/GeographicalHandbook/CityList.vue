<script setup>
// core
import { ref, reactive, inject, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import Empty from '@/components/Empty.vue'
import CityModal from './CityModal.vue'
import DeleteModal from './DeleteModal.vue'
// services
import { fetchDeleteRegionById } from '@/modules/HR/modules/BusinessTrip/services'
// icons
import { AddCircleBoldIcon, PenBoldIcon, TrashBinTrashIcon } from '@/components/Icons'
// composibles
import { useInfiniteScroll } from '../../composibles/useInfiniteScroll'
// stores
import { useSettingsStore } from '@/modules/HR/modules/BusinessTrip/stores/settings.store'

const settingsStore = useSettingsStore()
const { t, locale } = useI18n()

// inject
const activeSelectedCountry = inject('activeSelectedCountry')
const defaultParams = reactive({ page: 1, page_size: 20, country: activeSelectedCountry.value?.id })
// reactives
const activeSelectedCity = ref(null)
const selectedCityEditId = ref(null)
const deleteModalVisible = ref(false)
const cityModalVisible = ref(false)
const cityListWrapperRef = ref(null)
const deleteModalLoading = ref(false)
const enabledFetchCityList = ref(false)
const params = reactive(defaultParams)

// infinite scroll
const { refetch } = useInfiniteScroll({ fetchFn: settingsStore.actionGetCityList, cityListWrapperRef, params, enabled: enabledFetchCityList })
// methods
const handleClickCity = (city) => {
  activeSelectedCity.value = city
}

const handleDeleteCity = (data) => {
  activeSelectedCity.value = data
  deleteModalVisible.value = true
}

const handleEditCity = (city) => {
  selectedCityEditId.value = city.id
  cityModalVisible.value = true
}
const handleAddCity = () => {
  selectedCityEditId.value = null
  cityModalVisible.value = true
}

const handleClickDeleteModal = async() => {
  deleteModalLoading.value = true
  try {
    await fetchDeleteRegionById(activeSelectedCity.value?.id)
    deleteModalVisible.value = false
    settingsStore.actionGetCityList({ country: activeSelectedCountry.value?.id })
  } catch (err) {
    console.log(err)
  } finally {
    deleteModalLoading.value = false
  }
}

watch(()=> activeSelectedCountry.value, (newValue, oldValue)=> {
  if(newValue != oldValue){
    enabledFetchCityList.value = true
    params.country = newValue?.id
    refetch()  
  }
},{ deep: true })

</script>
<template>
  <div class="w-1/2 pt-5 px-6">
    <!-- title -->
    <div class="mb-4 text-xl font-semibold text-greyscale-900">{{ t('city') }}</div>
    <div v-if="!!settingsStore.cityList.length" class="flex flex-col gap-1">
      <!-- cities -->
      <div ref="cityListWrapperRef" class="flex flex-col gap-1 overflow-y-auto h-[calc(100vh-470px)]">
        <template  v-for="city in settingsStore.cityList" :key="city.name"
        >
          <div 
            class="flex items-center justify-between group p-4 pr-3 hover:bg-primary-10 border-[1.5px] border-white hover:border-[1.5px] hover:border-primary-30 rounded-xl cursor-pointer" 
            :class="{ '!bg-primary-10 !border-[1.5px] !border-primary-30': activeSelectedCity?.id == city.id }" 
            @click="handleClickCity(city)"
            >
            <p class="text-[15px] font-medium text-greyscale-900">{{ city.name }}</p>
            <!-- actions -->
            <div class="flex items-center gap-4 opacity-0 group-hover:opacity-100">
              <base-iconify 
                :icon="TrashBinTrashIcon" class="!w-5 !h-5 text-critic-500"
                @click="handleDeleteCity(city)"
              />
              <base-iconify 
                :icon="PenBoldIcon" class="!w-5 !h-5 text-greyscale-400"
                @click="handleEditCity(city)"
              />
              <base-iconify 
                :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
                @click="handleAddCity(city)"
              />
            </div>
          </div>
        </template>
      </div>      
      <!-- add city -->
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        :class="!activeSelectedCountry ? 'pointer-events-none  opacity-60' : ''"
        @click="handleAddCity()"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-city') }}</p>
      </div>
    </div>
    <!-- if there is no cities at all  -->
    <div v-else class="flex h-[80%] flex-col gap-5 justify-center items-center" >
      <Empty 
        title="no-cities"
        wrapper-class="shadow-none"  
        label-classes="text-sm text-greyscale-400"
        />
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        @click="handleAddCity()"
        :class="!activeSelectedCountry ? 'pointer-events-none  opacity-60' : ''"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-city') }}</p>
      </div>
    </div>
  </div>
  <CityModal
    v-if="cityModalVisible"
    :id="selectedCityEditId"
    v-model="cityModalVisible"
    label="add-city"
    :max-width="'max-w-[600px]'"
  />
  <DeleteModal
    v-if="deleteModalVisible"
    v-model="deleteModalVisible"
    label="city"
    :max-width="'max-w-[472px]'"
    :content="{
      title: 'delete-city',
      description: 'want-delete-city',
      value: activeSelectedCity?.name
    }"
    @click:delete="handleClickDeleteModal"
  />
</template>