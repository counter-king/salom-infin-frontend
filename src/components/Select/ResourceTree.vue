<script setup>
import { useModel, onMounted, ref } from 'vue'
import BaseTreeSelect from '@/components/UI/BaseTreeSelect.vue'
import axiosConfig from '@/services/axios.config'

const props = defineProps({
  modelValue: {
    type: [Number, String, Object, Array]
  },
  error: {
    type: Object,
    default: () => {}
  },
})

const modelValue = useModel(props, 'modelValue')

const options = ref([])

const getList = async () => {
  const { data } = await axiosConfig.get(`/policies/resources/`)
  options.value = transformOptionItem(data.results)
}

const transformOptionItem = (options) => {
  return options.map(item => {
    const option = {
      ...item,
      label: item?.display_name,
      key: item.id
    }

    if (item.children && item.children.length > 0) {
      option.children = transformOptionItem(item.children)
    }
    else if (item.children && item.children.length === 0) {
      option.icon = true
    }

    return option
  })
}

onMounted(async () => {
  await getList()
})
</script>

<template>
  <base-tree-select
    v-model="modelValue"
    :options="options"
    :error="error"
  />
</template>

<style scoped>

</style>
