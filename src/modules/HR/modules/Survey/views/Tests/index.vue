<script setup>
import { ref } from 'vue'
import { ActionToolbar } from '@/components/Actions'
import CardItem from '../../components/CardItem.vue'

const loading = ref(false)
const toggle = ref(0)
</script>

<template>
  <div class="tests-view">
    <div class="max-w-[1055px] w-full mx-auto">
      <action-toolbar title="Тесты">
        <template #title-after>
          <div class="flex gap-2">
            <base-button
              label="Текущие"
              rounded
              shadow
              @click="toggle = 0"
            />

            <base-button
              label="Архив"
              rounded
              outlined
              color="text-primary-900"
              border-color="border-transparent"
              @click="toggle = 1"
            />
          </div>
        </template>

        <template #filters>
          <span></span>
        </template>
      </action-toolbar>

      <div class="grid grid-cols-2 gap-5 mt-6">
        <template v-if="loading">
          <div>Loading...</div>
        </template>

        <template v-else>
          <template v-if="toggle === 0">
            <router-link :to="{ name: 'TestShow', params: { id: 1 } }">
	            <card-item />
            </router-link>
          </template>

          <template v-if="toggle === 1">
            <card-item />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
