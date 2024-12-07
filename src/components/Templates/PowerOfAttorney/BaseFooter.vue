<script setup>
import { formatDate } from "@/utils/formatDate"

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
    <span class="font-semibold">{{ formatDate(props.composeModel.start_date) }} dan {{ formatDate(props.composeModel.end_date) }} gacha</span> berildi.
    Ushbu ishonchnoma orqali ishonch bildiriluvchi shaxs boshqa lavozimga o’tkazilganda yoki mehnat shartnomasi bekor qilinganda o’z kuchini yo‘qotadi.
  </div>
</template>

<style scoped>

</style>
