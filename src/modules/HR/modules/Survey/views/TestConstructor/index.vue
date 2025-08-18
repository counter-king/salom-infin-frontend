<script setup>
import { ref, watch } from 'vue'
import { ActionToolbar } from '@/components/Actions'
import { Plus20SolidIcon } from '@/components/Icons'
import { useTestConstructorStore } from '../../stores/testConstructor.store'
import { TEST_CONSTRUCTOR_COLUMNS } from '../../constants'

const testConstructorStore = useTestConstructorStore()
const toggle = ref(0)

watch(toggle, (value) => {
  testConstructorStore.getList({ state: value })
})
</script>

<template>
  <div class="test-constructor-view">
    <action-toolbar
      title="test-constructor"
      :action-buttons="['export', 'calendar']"
      :column-menu-items="testConstructorStore.headers"
      :storage-columns-name="TEST_CONSTRUCTOR_COLUMNS"
      @emit:reset-headers="testConstructorStore.resetHeaders"
    >
      <template #title-after>
        <div class="flex gap-2">
          <base-button
            label="Публикованный"
            rounded
            :outlined="toggle !== 0"
            shadow
            color="text-primary-900"
            border-color="border-transparent"
            :button-class="toggle === 0 ? 'text-white' : ''"
            @click="toggle = 0"
          />

          <base-button
            label="Черновик"
            rounded
            :outlined="toggle !== 1"
            outlined
            shadow
            color="text-primary-900"
            border-color="border-transparent"
            :button-class="toggle === 1 ? 'text-white' : ''"
            @click="toggle = 1"
          />

          <base-button
            label="Архив"
            rounded
            :outlined="toggle !== 2"
            shadow
            color="text-primary-900"
            border-color="border-transparent"
            :button-class="toggle === 2 ? 'text-white' : ''"
            @click="toggle = 2"
          />
        </div>
      </template>

      <template #end>
        <base-button
          :icon-left="Plus20SolidIcon"
          label="create"
          rounded
        >
        </base-button>
      </template>
    </action-toolbar>

    <base-data-table
      :headers="testConstructorStore.headers"
      :value="testConstructorStore.list"
      :total-count="testConstructorStore.totalCount"
      :storage-columns-name="TEST_CONSTRUCTOR_COLUMNS"
      scroll-height="calc(100vh - 295px)"
    ></base-data-table>
  </div>
</template>

<style scoped>

</style>
