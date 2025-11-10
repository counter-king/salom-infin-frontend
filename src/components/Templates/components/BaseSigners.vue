<script setup>
// Utils
import { formatUserFullName } from "@/utils"
// Components
import QrcodeVue from "qrcode.vue"

const props = defineProps({
  signers: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <div class="mt-6 pb-2 px-4">
    <template v-for="item in props.signers" :key="item.id">
      <base-row class="mb-2 items-center">
        <base-col col-class="w-1/3">
          <span class="text-sm font-semibold block">{{ item.user ? item.user.position.name : item.position.name }}</span>
        </base-col>

        <base-col col-class="w-1/3">
          <qrcode-vue
            v-if="item.is_signed"
            :value="'salom.sqb.uz'"
            :size="50"
            level="L"
            render-as="svg"
          />
        </base-col>

        <base-col col-class="w-1/3">
          <span class="text-sm font-semibold block">{{ formatUserFullName(item) }}</span>
        </base-col>
      </base-row>
    </template>
  </div>
</template>

<style scoped>

</style>
