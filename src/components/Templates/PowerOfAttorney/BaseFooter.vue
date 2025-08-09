<script setup>
import { formatDate } from "@/utils/formatDate"
import { calculateYearsAndMonths } from "@/utils";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  },
  parentDocument: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="italic indent-8">
    <span v-if="parentDocument && parentDocument.register_date && parentDocument.register_number">Ushbu ishonchnomaning berilishi munosabati bilan {{ formatDate(parentDocument.register_date) }}-yilda berilgan {{ parentDocument.register_number }}-sonli ishonchnoma o‘z kuchini yo‘qotadi.</span>
    Mazkur ishonchnomaning amal qilish muddati u orqali berilgan vakolatlarni boshqa shaxsga o‘tkazish huquqisiz
    {{ calculateYearsAndMonths(composeModel.start_date, composeModel.end_date) }}ni tashkil etadi.
    Ushbu ishonchnoma orqali ishonch bildiriluvchi shaxs boshqa ish (lavozim)ga o’tkazilganda, u bilan tuzilgan mehnat
    shartnomasi bekor qilinganda yoki ishonchnoma muddatidan oldin bekor qilinganda o’z kuchini yo‘qotadi.
  </div>
</template>

<style scoped>

</style>
