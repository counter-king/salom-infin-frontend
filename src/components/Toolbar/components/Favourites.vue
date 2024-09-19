<script setup>
// Core
import {useI18n} from "vue-i18n"
// Components
import Empty from "@/components/Empty.vue"

// Composable
const { t } = useI18n()

const emit = defineEmits(['emit:select'])
</script>

<template>
  <div class="favourites-menu flex justify-between w-full">
    <div class="flex flex-col gap-y-1 w-[267px] justify-center">
      <empty
        :title="t('add-to-favourites-message')"
        label-classes="text-xs"
      />
    </div>

    <div class="h-full border"></div>

    <div class="flex flex-col gap-y-1 w-[267px]">

    </div>
  </div>
</template>

<style scoped>

</style>
