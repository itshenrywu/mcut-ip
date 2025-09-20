<template>
	<div class="ts-app-center">
		<div>
			<div class="ts-header is-big is-center-aligned is-icon">
				<span class="icon-exclamation"></span>
				{{ _('not_found_title') }}
			</div>
			<p class="ts-text is-description is-center-aligned is-large">
				{{ _('not_found_text') }}
			</p>
			<div class="ts-wrap is-center-aligned">
				<router-link to="/" class="ts-button" v-if="!is_en">返回首頁</router-link>
				<router-link to="/" class="ts-button" v-else>Back to Home</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { utils } from '../composables/utils.js'
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
const { _, is_en } = utils()

useHead({
	title: '找不到這個頁面 | 明志科技大學宿舍有線網路',
})

</script>

<style scoped>
.icon-exclamation {
	font-size: 4rem;
	line-height: 4rem;
	display: block;
	margin-bottom: 1rem;
}
</style>