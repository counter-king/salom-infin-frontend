<script setup>
// Core
import { onMounted } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import {
  FileTextIcon,
  InfoCircleBoldIcon,
  AltArrowRightIcon,
  Plus20SolidIcon
} from '@/components/Icons'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Composable
const agreementsStore = useAgreementsStore()
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiationTypes()
})
const icons = [
  '/images/block-icon-1.svg',
  '/images/block-icon-2.svg',
  '/images/block-icon-3.svg',
  '/images/block-icon-4.svg',
  '/images/block-icon-5.svg'
]
</script>

<template>
  <action-toolbar title="Согласия">
    <template #filters>
      <router-link :to="{ name: 'AgreementCreated' }">
        <base-button
          :icon-left="FileTextIcon"
          icon-width="!w-4"
          icon-height="!h-4"
          border-color="border-transparent"
          label="Созданные документы"
          outlined
          rounded
        >
        </base-button>
      </router-link>

      <router-link :to="{ name: 'AgreementCreate' }">
        <base-button
          :icon-left="Plus20SolidIcon"
          label="add"
          rounded
        >
        </base-button>
      </router-link>
    </template>
  </action-toolbar>

  <InlineMessage
    severity="warn"
    :pt="{
      root: 'items-start gap-3 rounded-xl !bg-warning-50 overflow-hidden border border-warning-100',
      text: 'flex-1 text-sm font-medium'
    }"
  >
    <template #icon>
      <base-iconify :icon="InfoCircleBoldIcon" />
    </template>

    <span class="text-greyscale-900">Докумeнт (нем. — образец, свидетельство, доказательство) — это зафиксированная на материальном носителе информация в виде текста, звукозаписи или изображения с реквизитами, позволяющими её идентифицировать.</span>
  </InlineMessage>

  <div class="grid grid-cols-3 gap-4 mt-4">
    <template v-for="(item, index) in agreementsStore.negotiationTypes">
      <router-link
        :to="{ name: 'AgreementGroupsList', params: { item: item.id } }"
        class="group flex bg-white shadow-button rounded-2xl p-5 pt-4"
      >
        <div class="flex flex-col items-start max-w-[370px] w-full">
          <h1 class="text-base font-semibold text-greyscale-900 mb-1">{{ item.name }}</h1>
          <p class="text-sm font-medium text-greyscale-500 line-clamp-2 mb-6">{{ item.description }}</p>

          <button class="flex items-center gap-1 transition-colors bg-greyscale-50 group-hover:bg-primary-500 rounded-xl border border-greyscale-100 p-2 pl-3 mt-auto">
            <span class="text-sm font-medium text-greyscale-900 group-hover:text-white transition-colors">Подробнee</span>

            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4 text-greyscale-500 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div class="flex flex-col justify-between items-end flex-1">
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-critic-50">
            <span class="text-critic-500 font-bold">{{ item.docs_count_to_sign }}</span>
          </div>

          <img :src="icons[index % 6]" alt="icon" />
        </div>
      </router-link>
    </template>
  </div>
</template>
