<script setup>
// cores
import Menu from 'primevue/menu';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); 
const props = defineProps({
 menuItems : {
  type: Array,
  default: () => []
 },
 classMenu:{
  type: String
 }
})
// reactives
const menu = ref(null);
defineExpose({
  menu: menu
})

</script>
<template>
 <Menu ref="menu" :model="props.menuItems" :popup="true" />
</template>
<style scoped>
</style>