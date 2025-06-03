<script setup>
import { useI18n } from 'vue-i18n'
import StatusCards from '../components/Trip/StatusCards.vue'
import InnerOuterLinear from '../components/Trip/InnerOuterLinear.vue'
import InnerPie from '../components/Trip/InnerPie.vue'
import OuterPie from '../components/Trip/OuterPie.vue'
import ExpensesLinear from '../components/Trip/ExpensesLinear.vue'
import Departments from '../components/Trip/Departments.vue'
import TransportPie from '../components/Trip/TransportPie.vue'
import Targets from '../components/Trip/Targets.vue'

const { t } = useI18n()
</script>

<template>
  <div class="hr-business-trip-dashboard-view flex flex-col flex-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl text-primary-900 font-bold">{{ t('business-trip-dashboard') }}</h1>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 space-y-4">
        <status-cards />

        <inner-outer-linear />

        <div class="grid grid-cols-2 gap-4">
          <inner-pie />

          <outer-pie />
        </div>

        <expenses-linear />
      </div>

      <div class="col-span-1 space-y-4">
        <departments />

        <transport-pie />

        <targets />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
