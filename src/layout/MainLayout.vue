<script setup>
// Components
import TheToolbar from "@/components/TheToolbar.vue"
</script>

<template>
	<div class="main-layout-view">
		<the-toolbar />

		<div class="main-layout-content">
			<router-view />
		</div>
	</div>
</template>

<style scoped>

</style>
