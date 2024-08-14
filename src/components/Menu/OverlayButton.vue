<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
// Components
import TieredMenu from 'primevue/tieredmenu'
import {
	Plus20SolidIcon,
  AltArrowRightIcon
} from '@/components/Icons'
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store"

const menu = ref(null)
const { t } = useI18n()
const router = useRouter()
const SDStore = useSDStore()

// Methods
const toggleMenu = (event) => {
  menu.value.toggle(event);
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
	}
}
const onShow = () => {
	console.log(menu)
}
</script>

<template>
  <div>
    <base-button
      label="create"
      :icon-left="Plus20SolidIcon"
      rounded
      type="button"
      @click="toggleMenu"
    />
    <TieredMenu
      :model="SDStore.SEND_DOCUMENT_CREATE_MENU_LIST"
      popup
      ref="menu"
      :pt="{
        root: {
          class: 'flex flex-col p-1 gap-y-1 rounded-[8px] w-[224px]'
        },
        submenu: {
          class: 'left-[-104%] p-1 rounded-[8px]'
        },
        menuitem: ({ context }) => ({
          class: 'bg-white hover:text-primary-dark hover:bg-greyscale-50 transition-all duration-[400ms] rounded-[8px]'
        }),
        content: {
          class: 'bg-white hover:text-primary-dark hover:bg-greyscale-50 transition-all duration-[400ms] rounded-[8px]'
        }
      }"
    >
      <template #item="{ item, hasSubmenu }">
        <div
          class="select-none cursor-pointer flex font-medium text-sm items-center justify-between hover:text-primary-dark hover:bg-greyscale-50 transition-all duration-[400ms] rounded-[8px] p-3"
          @click="onSelect(item)"
        >
          <div class="flex items-center">
            <base-iconify
	            v-if="item.type === 'menu'"
              :icon="item.icon"
              class="text-greyscale-500 mr-2 !w-4 !h-4 hover:text-primary-dark"
            />
	          <div v-else class="w-[6px] h-[6px] bg-info-500 rounded-full mr-2"></div>
            <span>{{ t(item.label) }} </span>
          </div>

          <base-iconify
            v-if="!item.hasRouterLink"
            :icon="AltArrowRightIcon"
            class="!w-4 !h-4"
          />
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style>

</style>
