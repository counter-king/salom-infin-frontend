<script setup>
// core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// components
import CountryModal from './CountryModal.vue'
import DeleteModal from './DeleteModal.vue'
import { AddCircleBoldIcon, PenBoldIcon, TrashBinTrashIcon } from '@/components/Icons'
import Empty from '@/components/Empty.vue'


const { t, locale } = useI18n()

// reactive
const activeSelectedCountry = ref(null)
const deleteModalVisible = ref(false)
const countryModalVisible = ref(false)
const selectedDeleteCountry = ref(null)

const countries = [
  {
    id:1,
    name : {
      uz: 'Uzbekistan',
      ru: 'Узбекистан',
      en: 'Uzbekistan'
    }
  },
  {
    id:2,
    name : {
      uz: 'Rossiya',
      ru: 'Россия',
      en: 'Russia'
    }
  },
  {
    id:3,
    name : {
      uz: 'Qozotstan',
      ru: 'Казахстан',
      en: 'Kazakhstan'
    }
  }
]

// methods
const handleClickCountry = (country) => {
  console.log(country)
  activeSelectedCountry.value = country.id
}
const handleDeleteCountry = (data) => {
  selectedDeleteCountry.value = data
  deleteModalVisible.value = true
}
const handleEditCountry = () => { 
}
const handleAddCountry = () => {
  countryModalVisible.value = true
}

</script>
<template>
  <div class="w-1/2 pt-5 pr-6">
    <!-- title -->
    <div class="mb-4 text-xl font-semibold text-greyscale-900">{{ t('countries') }}</div>
    <div v-if="true" class="flex flex-col gap-1">
      <!-- countries -->
      <template v-for="country in countries" :key="country.name">
        <div 
          class="flex items-center justify-between group p-4 pr-3 hover:bg-primary-10 border-[1.5px] border-white hover:border-[1.5px] hover:border-primary-30 rounded-xl cursor-pointer"
          @click="handleClickCountry(country)"
          :class="{ '!bg-primary-10 !border-[1.5px] !border-primary-30': activeSelectedCountry == country.id }" 
          >
          <p class="text-[15px] font-medium text-greyscale-900">{{ country.name[locale] }}</p>
          <!-- actions -->
          <div 
            class="flex items-center gap-4 opacity-0 group-hover:opacity-100"
            :class="{ 'opacity-100': activeSelectedCountry == country.id }"
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
    v-model="countryModalVisible"
    label="add-country"
    :max-width="'max-w-[600px]'"
  />
  <DeleteModal
    v-model="deleteModalVisible"
    label="country"
    :max-width="'max-w-[472px]'"
    :content="{
      title: 'delete-country',
      description: 'want-delete-country',
      value: selectedDeleteCountry
    }"
    @click:delete="handleDeleteCountry"
  />
</template>
