<script setup>
// Core
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
// Store
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Components
import { AltArrowRightIcon, StarLinearIcon } from "@/components/Icons"

const sdStore = useSDStore()
const { t } = useI18n()
const router = useRouter()

const subMenuList = computed(() => {
  return sdStore.SEND_DOCUMENT_CREATE_MENU_LIST.find(item => item.active).items
})

// Methods
const onHover = (item) => {
  sdStore.SEND_DOCUMENT_CREATE_MENU_LIST.forEach(i => i.active = i.id === item.id)
}
const onSelect = async (item) => {
  if (item.hasRouterLink) {
    await router.push({
      name: item.routerLinkName,
      params: {
        document_type: item.documentType,
        document_sub_type: item.documentSubType
      }
    })

    emit('emit:select')
  }
}

const emit = defineEmits(['emit:select'])


</script>

<template>
  <div class="send-document-menu flex justify-between w-full">
    <div class="flex flex-col gap-y-1 w-[267px]">
      <div
        v-for="item in sdStore.SEND_DOCUMENT_CREATE_MENU_LIST"
        :key="item.id"
        class="flex justify-between group rounded-lg hover:bg-greyscale-50 p-3 cursor-pointer transition-all duration-[200ms]"
        :class="{ 'bg-greyscale-50' : item.active }"
        @mouseenter="onHover(item)"
        @click="onSelect(item)"
      >
        <div class="flex items-center">
          <base-iconify
            v-if="item.type === 'menu'"
            :icon="item.icon"
            class="text-greyscale-500 mr-2 !w-4 !h-4 group-hover:text-primary-500 transition-all duration-[200ms]"
            :class="{ 'text-primary-500' : item.active }"
          />

          <div class="text-xs font-medium text-greyscale-900">{{ t(item.label) }}</div>
        </div>

        <base-iconify
          v-if="!item.hasRouterLink"
          :icon="AltArrowRightIcon"
          class="text-greyscale-500 mr-2 !w-4 !h-4 group-hover:text-primary-500 transition-all duration-[200ms]"
          :class="{ 'text-primary-500' : item.active }"
        />
      </div>
    </div>

    <div class="h-full border"></div>

    <div class="flex flex-col gap-y-1 w-[267px]">
      <div
        v-for="submenu in subMenuList"
        class="flex justify-between hover:bg-greyscale-50 p-3 cursor-pointer transition-all duration-[200ms] rounded-lg"
        @click="onSelect(submenu)"
      >
        <div class="flex items-center">
          <div class="w-2 h-2 rounded-full bg-primary-500"></div>
          <div class="text-xs font-medium text-greyscale-900 ml-3">{{ t(submenu.label) }}</div>
        </div>

        <base-iconify
          :icon="StarLinearIcon"
          class="text-greyscale-300 !w-4 !h-4"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
