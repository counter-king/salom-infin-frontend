<script setup>
// Core
import { computed, ref, unref } from "vue"
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
  },
  document: {
    type: [Object],
    default: null
  }
})

const router = useRouter()
const { t } = useI18n()
const docSubTypeId = computed(() => {
  return props?.document?.document_sub_type?.id
})

const menuRef = ref(null)
const items = ref([
  {
    label: t('order'),
    icon: DocumentAddIcon,
    command: () => router.push({
      name: ROUTE_SD_CREATE,
      params: {
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER,
        document_sub_type: docSubTypeId.value.toString() === COMPOSE_DOCUMENT_SUB_TYPES.NOTICE_FOR_EMPLOYMENT ? COMPOSE_DOCUMENT_SUB_TYPES.ORDER_FOR_EMPLOYMENT : COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_ORDER
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
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2
      },
      query: {
        compose_id: props.composeId,
        document_sub_type: props.document?.document_sub_type.id
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
