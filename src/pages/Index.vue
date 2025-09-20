<template>
	<div class="ts-wrap is-vertical has-vertically-spaced">
		<div v-for="dorm of dorms" :key="dorm.id">
			<div class="ts-header has-bottom-padded-small">{{ dorm.name[is_en] }}</div>
			<div class="ts-wrap is-compact">
				<router-link class="ts-button is-secondary is-small is-dense is-short" v-for="group in dorm.rooms" :to="`/${dorm.id}/${group.name.replace(/[^0-9]/g, '')}`">
					{{ group.name }}
				</router-link>
			</div>
		</div>
		<div class="has-top-spaced">
			<router-link class="ts-button is-fluid" to="/set">{{ _('how_to') }}</router-link>
		</div>
	</div>
</template>
<script setup>
import { utils } from '../composables/utils.js'
const {  _, is_en, dorms } = utils()
</script>