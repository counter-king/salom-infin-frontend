<script setup>
// Core
import { useI18n } from "vue-i18n"
// Composable
const { t } = useI18n()
</script>

<template>
  <div class="p-16">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold mb-4">Size</h1>

      <div class="flex gap-3">
        <div>
          <base-button :label="t('labeled')" size="small"></base-button>
        </div>

        <div>
          <base-button :label="t('labeled')"></base-button>
        </div>

        <div>
          <base-button
            label="labeled"
            size="large"
            shadow
            rounded
            icon-left="EyeIcon"
            icon-right="CalendarIcon"
          ></base-button>
        </div>

        <div>
          <base-button
            label="labeled"
            size="large"
            shadow
            rounded
            icon-left="EyeIcon"
            icon-right="CalendarIcon"
          ></base-button>
        </div>

        <div>
          <base-button
            color="bg-primary-800"
            border-color="border-primary-800"
            only-icon
            rounded
            icon-left="EyeIcon"
          ></base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
