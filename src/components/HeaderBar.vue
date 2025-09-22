<template>
	<div class="cell">
		<div class="ts-container is-very-narrow">
			<header class="ts-grid is-compact">
				<div class="column is-2-wide">
					<router-link :to="getBackUrl" v-show="$route.path !== '/'" v-if="router.currentRoute.value.name !== 'NotFound'">
						<span class="icon-chevron-left"></span>
					</router-link>
				</div>
				<div class="column is-fluid">
					<div class="item is-text" v-if="$route.path === '/' || router.currentRoute.value.name === 'NotFound'">
						<h1>{{ _('title') }}</h1>
					</div>
					<div class="item is-text" v-else-if="$route.path === '/set'">
						<h1>{{ _('set') }}</h1>
					</div>
					<div class="item is-text" v-else-if="currentDorm && currentGroup">
						<h1>
							<span v-html="currentDorm.name[is_en?2:0]"></span>
							<span class="icon-caret-right"></span>
							<span>{{ currentGroup.name }}</span>
							<template v-if="currentRoom!=''">
								<span class="icon-caret-right"></span>
								<span>{{ getRoomName(null, currentRoom) }}</span>
							</template>
						</h1>
					</div>
				</div>
				<div class="column is-2-wide hover-cursor-pointer" @click="switchLang()">
					{{ _('switch_lang') }}
				</div>
			</header>
		</div>
	</div>
</template>

<script setup>
import { utils } from '../composables/utils.js'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const { _, is_en, switchLang, currentDorm, currentGroup, currentRoom, getRoomName } = utils()
const router = useRouter()

const getBackUrl = computed(() => {
	if (router.currentRoute.value.name === 'Room' || router.currentRoute.value.name === 'RoomBed') {
		if (currentDorm.value && currentGroup.value) {
			return `/${currentDorm.value.id}/${currentGroup.value.name.replace(/[^0-9]/g, '')}`
		}
	}
	return '/'
})
</script>

<style scoped>
h1 {
	font-size: unset;
	height: 1.8rem;
}

header {
	padding: .8rem 0;
}

header .column.is-fluid {
	text-align: center;
	font-weight: bold;
}

header .column:last-child {
	text-align: right;
	font-size: .8rem;
	line-height: 1.8rem;
}

a {
	text-decoration: none;
}

.icon-chevron-left {
	font-size: 1.2rem;
	line-height: 1.2rem;
	vertical-align: middle;
}

.icon-caret-right {
	font-size: 0.8rem;
	line-height: 0.8rem;
	width: 1.3rem;
	vertical-align: middle;
	color: var(--ts-gray-500);
}
</style>