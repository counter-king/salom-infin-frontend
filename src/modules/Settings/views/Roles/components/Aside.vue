<script setup>
// Components
import RoleItem from './Item.vue'
</script>

<template>
  <div class="role-aside-view max-w-[306px] w-full border-r border-r-greyscale-200">
    <div class="h-full overflow-y-auto p-5">
      <template v-for="i in 20">
        <role-item />
      </template>
    </div>
  </div>
</template>
