<script setup>
// Core
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import BaseButton from '@/components/UI/BaseButton.vue'
import { ActionToolbar } from '@/components/Actions'
import BaseInput from '@/components/UI/BaseInput.vue'
// Icons
import { AddPlusIcon } from '@/components/Icons'
import { MagniferIcon } from '@/components/Icons'
// store
import { useAuthStore } from '@/modules/Auth/stores'
import { useNewsHeaderStore } from '../stores/news.header.store'
import { useNewsCountStore } from '../stores/news.count.store'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const newsHeaderStore = useNewsHeaderStore()
const newsCountStore = useNewsCountStore()
// Reactive
const searchQuery = computed({
  get:() => route.query.search || undefined,
  set:(value) =>{
    router.replace({ query: value ? {...router.currentRoute.value.query, search: value } : {...router.currentRoute.value.query, search: undefined} })
  }
})

const tagPramId = computed(() => route.query.tag || undefined)
const isUserModerator = computed(() => authStore.currentUser.roles.some(role => role.name === 'moderator'))
const rules = ref([])

const activeMenu = computed({
  get: () => ( route.query.activeMenu || !tagPramId.value && 'all-news'),
  set: (value) => {
    router.replace({ query: { ...router.currentRoute.value.query, activeMenu: value } })
  }
})

//watch
watch(searchQuery, (newValue) => {
  // if newValue is empty, if work
  if (!newValue) {
    const { search, ...rest } = router.currentRoute.value.query
    router.replace({ query: rest })
  } else {
    router.replace({ query: {...router.currentRoute.value.query, search: newValue } })
  }
})

const handleClickMenu=(item)=>{  
  if(!!tagPramId.value){
    router.push({ name:item.link, query: { activeMenu: item.title, tag: undefined}})
  } else {
    router.push({ name:item.link, query: { activeMenu: item.title}})
  }
}

watchEffect(() => {
  if (!!tagPramId.value) {
    activeMenu.value = null
    router.replace({ query: { ...router.currentRoute.value.query, activeMenu: undefined } })
  }
});

onMounted(() => {
  if(isUserModerator.value) {
    rules.value = ['user','moderator']
  } else {
    rules.value = ['user']
  }

  newsCountStore.actionGetNewsPandingCountList()
})

</script>

<template>
  <action-toolbar title="news">
    <template #title-after>
      <div class="flex gap-3">
        <template v-for="item in newsHeaderStore.header" :key="item.link">
          <div
            v-if="rules.some(role => !!item.roles?.includes(role))"
            :key="item.link"
            @click="handleClickMenu(item)"
            class="flex items-center gap-2 py-1 px-4 bg-white rounded-[32px] text-sm font-medium text-greyscale-900 cursor-pointer"
            :class="{ '!bg-primary-500 text-white': activeMenu === item.title }"
          >
            <span>{{ t(item.title) }}</span>
            <div  v-if="item.count" class="flex items-center justify-center w-5 h-5 rounded-full bg-critic-500 text-[10px] font-semibold text-white">{{ item.count }}</div>
          </div>
        </template>
      </div>
      <div
        v-if="tagPramId" 
          @click="router.replace({query: {...router.currentRoute.value.query, tag: undefined}})"
        class="py-1 px-4 !bg-primary-500 rounded-[32px] text-sm font-medium text-white cursor-pointer"
      >
        {{  t('cancel-tag-filter') }}
      </div>
    </template>
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
      <div class="w-fit w-min-[148px]">
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
