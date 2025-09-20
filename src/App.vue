<template>
	<div class="ts-app-layout is-vertical is-fullscreen" :class="[routeName]">
		<HeaderBar />
		<div class="cell is-scrollable is-fluid is-secondary">
			<div class="ts-container is-very-narrow">
				<router-view v-slot="{ Component, route }">
					<Transition :name="transitionName" mode="out-in" appear>
						<component :is="Component" :key="route.fullPath" />
					</Transition>
				</router-view>
			</div>
		</div>
		<div class="cell">
			<footer>
				Made by <a href="https://henrywu.tw" target="_blank">Henry Wu</a>
			</footer>
		</div>
	</div>
</template>

<script>
import { useRouter } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'

export default {
	name: 'App',
	components: {
		HeaderBar
	},
	setup() {
		useRouter()
	},
	data() {
		return {
			transitionName: 'fade'
		}
	},
	watch: {
		$route: {
			immediate: true,
			handler(to, from) {
				if (!from?.name) {
					return
				}

				const routeIndex = {
					'Index': 1,
					'RoomSelect': 2,
					'Room': 3,
					'RoomBed': 3,
					'Set': 5,
				}

				if(routeIndex[to.name] == routeIndex[from.name] || to.name == 'NotFound' || from.name == 'NotFound') {
					this.transitionName = 'none'
				} else {
					this.transitionName = routeIndex[to.name] > routeIndex[from.name] ? 'slide-right' : 'slide-left'
				}
			}
		}
	},
	computed: {
		routeName() {
			return 'route-' + this.$route.name?.toLowerCase()
		}
	}
}
</script>

<style scoped>
footer {
	padding: .2rem 0;
	font-size: .8rem;
	text-align: center;
}

.route-notfound .ts-container.is-very-narrow {
	height: 100%;
}
</style>