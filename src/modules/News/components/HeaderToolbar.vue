<script setup>
// Core
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import BaseButton from '@/components/UI/BaseButton.vue'
import { ActionToolbar } from '@/components/Actions'
import BaseInput from '@/components/UI/BaseInput.vue'
//Icons
import { AddPlusIcon } from '@/components/Icons'
import { MagniferIcon } from '@/components/Icons'

// Reactive
const searchQuery = ref(null)

const { t } = useI18n()
const router = useRouter()
//watch
watch(searchQuery, (newValue) => {
  // if newValue is empty, if work
  if (!newValue) {
    const { search, ...rest } = router.currentRoute.value.query
    router.replace({ query: rest })
  } else {
    router.replace({ query: { search: newValue } })
  }
})
</script>
<template>
  <action-toolbar title="News">
    <template #filters>
      <div class="w-full max-w-[316px]">
        <base-input
          v-model="searchQuery"
          :icon-left="MagniferIcon"
          :placeholder="t('search')"
          class="flex p-input-icon-left items-center"
          input-class="!pl-10 p-3 bg-white text-sm"
          icon-left-class="!w-4 !h-4"
        />
      </div>
      <div class="w-fit w-min-[148px] max-w-[168px]">
        <base-button
          size="large"
          button-class="rounded-[120px]"
          :label="t('createNews')"
          class="w-full text-sm"
          icon-color="text-white"
          iconWidth="!w-5"
          iconHeight="!h-5"
          :icon-left="AddPlusIcon"
          @click="()=>{router.push({name:'NewsCreate'})}"
        ></base-button>
      </div>
    </template>
  </action-toolbar>
</template>
