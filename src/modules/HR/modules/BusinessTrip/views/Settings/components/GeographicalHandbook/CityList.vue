<script setup>
// core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import Empty from '@/components/Empty.vue'
import CountryModal from './CountryModal.vue'
import DeleteModal from './DeleteModal.vue'
// icons
import { AddCircleBoldIcon, PenBoldIcon, TrashBinTrashIcon } from '@/components/Icons'

const { t, locale } = useI18n()

// reactives
const activeSelectedCity = ref(null)
const deleteModalVisible = ref(false)
const countryModalVisible = ref(false)
const selectedDeleteData = ref(null)

const cities = [
  {
    id:1,
    name : {
      uz: 'Toshkent',
      ru: 'Ташкент',
      en: 'Tashkent'
    }
  },
  {
    id:2,
    name : {
      uz: 'Samarqand',
      ru: 'Самара',
      en: 'Samara'
    }
  },
  {
    id:3,
    name : {
      uz: 'Bukhara',
      ru: 'Бухара',
      en: 'Bukhara'
    }
  }
]
// methods

const handleClickCity = (city) => {
  console.log(city)
  activeSelectedCity.value = city.id
}

const handleDeleteCity = (data) => {
  selectedDeleteData.value = {
    type: 'city',
    data: data
  }
  deleteModalVisible.value = true
}

const handleEditCity = () => {
}
const handleAddCity = () => {
  countryModalVisible.value = true
}
</script>
<template>
  <div class="w-1/2 pt-5 px-6">
    <!-- title -->
    <div class="text-xl font-semibold text-greyscale-900">{{ t('cities') }}</div>
    <div v-if="true" class="flex flex-col gap-1">
      <!-- cities -->
      <template  v-for="city in cities" :key="city.name"
      >
        <div 
          class="flex items-center justify-between group p-4 pr-3 hover:bg-primary-10 border-[1.5px] border-white hover:border-[1.5px] hover:border-primary-30 rounded-xl cursor-pointer" 
          :class="{ '!bg-primary-10 !border-[1.5px] !border-primary-30': activeSelectedCity == city.id }" 
          @click="handleClickCity(city)"
          >
          <p class="text-[15px] font-medium text-greyscale-900">{{ city.name[locale] }}</p>
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
      
      <!-- add country -->
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        @click="handleAddCity()"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-city') }}</p>
      </div>
    </div>
    <!-- if there is no cities at all  -->
    <div v-else class="flex flex-col gap-5 justify-center items-center" >
      <Empty 
        title="no-cities"
        wrapper-class="shadow-none"  
        label-classes="text-sm text-greyscale-400"
        />
      <div 
        class="flex items-center justify-center gap-2 mt-1 hover:bg-greyscale-70 bg-greyscale-50 rounded-lg px-3 py-[14px] cursor-pointer"
        @click="handleAddCity()"
        >
        <base-iconify 
            :icon="AddCircleBoldIcon" class="!w-5 !h-5 text-primary-500"
        />
        <p class="text-sm font-semibold text-greyscale-900">{{ t('add-city') }}</p>
      </div>
    </div>
  </div>
  <CountryModal
    v-model="countryModalVisible"
    label="add-city"
    :max-width="'max-w-[600px]'"
  />
  <DeleteModal
    v-model="deleteModalVisible"
    label="city"
    :max-width="'max-w-[472px]'"
    :content="{
      title: 'delete-city',
      description: 'want-delete-city',
      value: selectedDeleteData
    }"
    @click:delete="handleDeleteCity"
  />
</template>