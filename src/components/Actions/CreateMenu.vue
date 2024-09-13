<script setup>
// Core
import {ref, unref} from "vue"
import {useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Enums
import {ROUTE_SD_CREATE} from "@/modules/Documents/modules/SendDocuments/constants"
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"
// Components
import {AltArrowDownIcon, DocumentAddIcon, CheckCircleIcon} from "@/components/Icons"

const props = defineProps({
  composeId: {
    type: [String, Number]
  }
})

const router = useRouter()
const { t } = useI18n()

const menuRef = ref(null)
const items = ref([
  {
    label: t('order'),
    icon: DocumentAddIcon,
    command: () => router.push({
      name: ROUTE_SD_CREATE,
      params: {
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER
      },
      query: {
        compose_id: props.composeId
      }
    })
  },
  {
    label: t('decree'),
    icon: CheckCircleIcon,
    command: () => router.push({
      name: ROUTE_SD_CREATE,
      params: {
        document_type: COMPOSE_DOCUMENT_TYPES.DECREE,
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.ORDINARY_DECREE
      },
      query: {
        compose_id: props.composeId
      }
    })
  },
])

// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>

<template>
  <div class="create-menu-component">
    <base-button
      label="create"
      :icon-right="AltArrowDownIcon"
      rounded
      outlined
      shadow
      type="button"
      border-color="border-transparent"
      @click="toggle"
    />

    <base-menu
      ref="menuRef"
      :items="items"
      width="w-[200px]"
    ></base-menu>
  </div>
</template>

<style scoped>

</style>
