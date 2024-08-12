<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
// Components
import TieredMenu from 'primevue/tieredmenu'
import BaseIconify from "@/components/UI/BaseIconify.vue"
// Enums
import { ROUTE_SD_CREATE } from "@/modules/Documents/modules/SendDocuments/constants"
import { COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES } from "@/enums"

const menu = ref(null)
const { t } = useI18n()
const router = useRouter()
const items = [
  {
    label: 'service-letter',
    icon: 'NotebookIcon',
		type: 'menu',
	  hasRouterLink: true,
	  routerLinkName: ROUTE_SD_CREATE,
	  documentType: COMPOSE_DOCUMENT_TYPES.INNER,
	  documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER
  },
  {
    label: 'notice',
    icon: 'NotesIcon',
	  type: 'menu',
	  hasRouterLink: false,
    items: [
      {
        label: 'business-trip',
	      icon: 'NotesIcon',
	      type: 'submenu',
	      hasRouterLink: true,
	      routerLinkName: ROUTE_SD_CREATE,
	      documentType: COMPOSE_DOCUMENT_TYPES.NOTICE,
	      documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP
      }
    ],
  },
  {
    label: 'application',
    icon: 'NotesPenIcon',
	  type: 'menu',
	  hasRouterLink: false,
    items: [
      {
        label: 'labor-leave',
	      icon: 'NotesIcon',
	      type: 'submenu',
	      hasRouterLink: true,
	      routerLinkName: ROUTE_SD_CREATE,
	      documentType: COMPOSE_DOCUMENT_TYPES.APPLICATION,
	      documentSubType: COMPOSE_DOCUMENT_SUB_TYPES.LABOR_LEAVE
      }
    ],
  },
]

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
      icon-left="AddIcon"
      rounded
      type="button"
      @click="toggleMenu"
    />
    <TieredMenu
      :model="items"
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
            <base-icon
	            v-if="item.type === 'menu'"
              :name="item.icon"
              class="text-greyscale-500 mr-2 w-4 h-4 hover:text-primary-dark"
            />
	          <div v-else class="w-[6px] h-[6px] bg-info-500 rounded-full mr-2"></div>
            <span>{{ t(item.label) }} </span>
          </div>

          <base-iconify v-if="hasSubmenu" icon="solar:alt-arrow-right-outline" class="!w-4 !h-4"/>
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style>

</style>
