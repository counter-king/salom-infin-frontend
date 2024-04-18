<script setup>
// Core
import { ref, unref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import { StatusChip } from '@/components/Chips'
import WidgetWrapper from '../WidgetWrapper.vue'
// Composable
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: t('last-seven-days'),
    command: () => itemSelect('last-seven-days')
  },
  {
    label: t('last-two-weeks'),
    command: () => itemSelect('last-two-weeks')
  },
  {
    label: t('this-month'),
    command: () => itemSelect('this-month')
  },
  {
    label: t('last-month'),
    command: () => itemSelect('last-month')
  },
])
const itemSelected = ref('last-seven-days')
// Hooks
onMounted(async () => {
  if(route.query.hasOwnProperty('task')) {
    itemSelected.value = route.query.task
  }
})
// Methods
const itemSelect = async (text) => {
  itemSelected.value = text

  await router.push({
    query: {
      task: itemSelected.value
    }
  })
}
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>

<template>
  <widget-wrapper title="upcoming-tasks">
    <template #header-after>
      <base-button
        type="button"
        size="small"
        outlined
        icon-right="AltArrowDownIcon"
        icon-width="16"
        icon-height="16"
        button-class="!bg-greyscale-50 !py-1 !px-2 !rounded-[6px] border-none"
        @click="toggle"
      >
        <template #label>
          <span class="text-primary-500 font-semibold">{{ t(itemSelected) }}</span>
        </template>
      </base-button>

      <base-menu
        ref="menuRef"
        :items="items"
        width="w-[150px]"
      >
        <template #item="{ item }">
          <span class="block text-xs font-semibold text-greyscale-900 px-2 py-1 cursor-pointer">{{ item.label }}</span>
        </template>
      </base-menu>
    </template>

    <template #content>
      <div class="bg-greyscale-50 h-[calc(100%-32px)] p-3 pr-[6px] rounded-xl">
        <div class="h-full pr-2 overflow-y-auto">
          <template v-for="(item, index) in 3" :key="index">
            <router-link to="/" class="block bg-white rounded-xl shadow-button mb-2 py-4 px-5">
              <div class="relative text-sm font-medium text-greyscale-500 before:content-[''] before:absolute before:left-[-20px] before:top-0 before:w-1 before:h-full before:rounded-tr-xl before:rounded-br-xl before:bg-primary-500">
                <h1 class="text-greyscale-900 font-semibold">Оцифровка</h1>

                <p>Проект умного банка, Путеводитель по банкам</p>
              </div>

              <div class="flex items-center gap-3 mt-3">
                <div class="bg-greyscale-50 rounded-[6px] py-[2px] px-2">
                  <span class="text-xs text-primary-500 font-semibold">Bildirishnoma</span>
                </div>

                <div class="flex items-center gap-1">
                  <base-icon name="CalendarIcon" class="text-greyscale-400" />
                  <span class="text-sm font-medium text-greyscale-400">12.02.2024</span>
                </div>

                <div class="flex-1"></div>

                <status-chip :status="{ id: 8 }" />

                <base-avatar
                  label="Muhammad"
                  avatar-classes="w-7 h-7"
                />
              </div>
            </router-link>
          </template>
        </div>
      </div>

      <router-link to="/" class="flex items-center justify-center gap-1 h-6 text-sm mt-2">
        <span class="font-semibold text-primary-500 leading-[1]">Все задачи</span>

        <base-icon
          name="AltArrowLeftIcon"
          width="16"
          height="16"
          class="rotate-180 text-primary-500"
        />
      </router-link>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
