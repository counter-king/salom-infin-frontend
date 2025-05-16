<script setup>

const props = defineProps({
  status: {
    type: Object,
    default: () => {},
    required: true
  }
})

const statusClass = (id)=> {
  switch(id){
    case 1:
      return 'bg-info-100 text-greyscale-900'  // трудовой отпуск
    case 2:
      return 'bg-critic-30 text-greyscale-900'  // больничный отпуск
    case 3:
      return 'bg-greyscale-50 text-greyscale-500'  // выходные дни
    default:
      return 'bg-success-100 text-greyscale-900' // 8 час
  }
}

</script>
<template>
  <div 
    class="flex items-center w-fit justify-center py-[6px] px-[8px] rounded-lg text-xs font-medium"
    :class="statusClass(props.status.id)"
    >
    {{ props.status.name }}
  </div>
</template>