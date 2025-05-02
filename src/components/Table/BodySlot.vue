<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  }
})

const { t } = useI18n()
</script>

<template>
  <div class="body-slot-datatable p-datatable">
    <div class="body-slot-wrapper p-datatable-wrapper">
      <table role="table" class="body-slot-datatable-table p-datatable-table p-datatable-scrollable-table w-full border-separate border-spacing-y-1 -mt-1">
        <thead class="body-slot-datatable-thead p-datatable-thead bg-white">
          <tr>
            <th class="w-[60px] bg-white !text-sm font-semibold !text-greyscale-500">
              <div class="p-column-header-content">
                <span class="p-column-title">№</span>
              </div>
            </th>

            <template v-for="{ header } in props.headers">
              <th class="bg-inherit h-[56px]">
                <div class="p-column-header-content text-sm font-semibold text-greyscale-500">
                  <span class="p-column-title">{{ header }}</span>
                </div>
              </th>
            </template>
          </tr>
        </thead>

        <tbody class="p-datatable-tbody">
          <slot name="body" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.body-slot-datatable-table .body-slot-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border-style: solid;
  border-color: #dee2e6;
  border-width: 0 0 1px 0;
  font-weight: 700;
  color: #343a40;
  background: #f8f9fa;
  transition: box-shadow 0.2s;
}

.body-slot-datatable-table th:first-child,
.body-slot-datatable-table td:first-child {
  border-radius: 12px 0 0 12px;
}

.body-slot-datatable-table th:last-child,
.body-slot-datatable-table td:last-child {
  border-radius: 0 12px 12px 0;
}
</style>
