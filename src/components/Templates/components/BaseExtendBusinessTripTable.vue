<script setup>
// Props
import { computed } from "vue";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {
    },
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  }
})

// Computed
const noticesToChange = computed(() => {
  return props.preview ?
    props.composeModel?.__groups[0]?.__notices_to_change : []
})
</script>

<template>
  <pre>{{ noticesToChange }}</pre>
  <table class="business-trip-table w-full mt-4 text-sm text-center">
    <tr class="bg-greyscale-100 font-semibold">
      <td class="w-[5%] text-start">
        №
      </td>
      <td class="w-[30%]">
        F.I.Sh
      </td>
      <td class="w-[30%]">
        Lavozimi
      </td>
      <td class="w-[35%]">
        Tarkibiy tuzilmasi
      </td>
    </tr>

    <!-- Loop according to notices to change -->
    <tr
      v-for="(item, index) in noticesToChange"
      :key="item?.user?.id"
    >
      <td>{{ index + 1 }}.</td>
      <td>{{ item?.user?.full_name }}</td>
      <td>{{ item?.user?.position?.name }}</td>
      <td>{{ item?.user?.top_level_department?.name }}</td>
    </tr>
    <!-- /Loop according to notices to change -->

  </table>
</template>

<style scoped>
.business-trip-table,
.business-trip-table tr,
.business-trip-table td {
  border: none;
}

.booking-table td {
  border: 1px solid var(--greyscale-200)
}
</style>
