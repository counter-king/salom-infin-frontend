<script setup>
//core
import { ref } from 'vue';
// components
import HeaderToolbar from '../../components/MyApplication/HeaderToolbar.vue';
import CurrentTable from './CurrentTable.vue';
import ArchiveTable from './ArchiveTable.vue';
// reactives
const activeButtonMenu = ref(1)
</script>

<template>
    <HeaderToolbar v-model:active-button-menu="activeButtonMenu" />
    <CurrentTable v-if="activeButtonMenu == 1" />
    <ArchiveTable v-if="activeButtonMenu == 2" />
</template>