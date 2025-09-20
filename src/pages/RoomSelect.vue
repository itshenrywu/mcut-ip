<template>
	<div class="ts-menu is-large is-compact">
		<router-link 
			class="item" 
			v-for="room in getRoomList(currentGroup)" 
			:key="room"
			:to="`/${currentDorm?.id}/${currentGroup?.name.replace(/[^0-9]/g, '')}/${room}`"
			v-if="currentDorm && currentGroup"
		>
			{{ getRoomName(null, room) }}
		</router-link>
	</div>
</template>
<script setup>
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { utils } from '../composables/utils.js'
const { _, currentDorm, currentGroup, getRoomName, getRoomList } = utils()
const route = useRoute()

useHead({
	title: route.meta?.title || `${currentDorm.value.name[0]} ${currentGroup.value.name} | 明志科技大學宿舍有線網路`,
})
</script>

<style>
.ts-menu.is-compact .item {
	margin: 0 calc(var(--gap) * -1);
	border-bottom: 1px solid var(--ts-gray-300);
}

.ts-menu.is-compact .item:last-child {
	border-bottom: none;
}
</style>