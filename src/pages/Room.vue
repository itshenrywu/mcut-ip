<template>
	<div class="ts-wrap is-vertical is-relaxed is-center-aligned has-vertically-spaced" v-if="currentDorm">
		<div class="ts-content is-center-aligned is-fitted">
			<div class="ts-text is-description is-center-aligned has-bottom-spaced-small" :class="{'gradient': !currentBed}">
				{{ (currentDorm.id <= 6 ? _('choose1') : _('choose2')) }}
			</div>
			<div class="ts-selection is-dense is-small">
				<label class="item" v-for="(bed, index) of beds">
					<input type="radio" name="bed" v-bind:value="(index + 1)" v-model="currentBed" />
					<div class="text">{{ is_en ? bed[0].split(' ')[0] : bed[0] }}</div>
				</label>
			</div>
		</div>

		<template v-if="currentBed >= 0">
			<div class="ts-box is-fluid">
				<div class="ts-content">
					<div class="ts-wrap is-vertical">
						<div>
							<h2 class="ts-text is-label">{{ _('ip') }}</h2>
							<div class="ts-header is-huge">192.168.{{ networkInfo.gateway }}.{{ parseInt(networkInfo.ip + beds[currentBed - 1][1]) }}</div>
						</div>
						<div>
							<h2 class="ts-text is-label">{{ _('submask') }}</h2>
							<div class="ts-header is-huge">255.255.255.{{ networkInfo.submask }}</div>
						</div>
						<div>
							<h2 class="ts-text is-label">{{ _('gateway') }}</h2>
							<div class="ts-header is-huge">192.168.{{ networkInfo.gateway }}.{{ networkInfo.gateway2 }}</div>
						</div>
						<div>
							<h2 class="ts-text is-label">{{ _('dns') }}</h2>
							<div class="ts-header is-huge">210.240.232.1</div>
							<div class="ts-header is-huge">210.240.232.2</div>
						</div>
					</div>
				</div>
			</div>

			<router-link class="ts-button is-wide" to="/set">{{ _('how_to') }}</router-link>
		</template>
	</div>
</template>

<style scoped>
.ts-box.is-fluid {
	width: 100%;
}

h2 {
	margin: 0;
	font-weight: unset;
}

.gradient {
	padding: 0 2rem;
	background: linear-gradient(
		to right,
		var(--ts-gray-500) 0%,
		var(--ts-gray-500) 30%,
		var(--ts-gray-400) 50%,
		var(--ts-gray-500) 70%,
		var(--ts-gray-500) 100%
	);
	background-size: 500%;
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent!important;
	animation: scroll-gradient 2.5s ease-in-out infinite;
}

@keyframes scroll-gradient {
	0% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}
</style>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import { utils } from '../composables/utils.js'
const router = useRouter()
const route = useRoute()
const { _, is_en, currentDorm, currentGroup, currentRoom, getRoomName } = utils()

useHead({
	title: route.meta?.title || `${currentDorm.value.name[0]} ${currentDorm.value.id == 8 ? currentGroup.value.name : ''} ${getRoomName(null, currentRoom.value)} | 明志科技大學宿舍有線網路`,
})

const currentBed = ref(router.currentRoute.value.params.bed)

const beds = computed(() => {
	if (!currentDorm.value) return []
	if(currentDorm.value.id == 8) {
		if(currentGroup.value && (currentGroup.value.name.includes('50') || currentGroup.value.name.includes('52'))) {
			return [ ['1A', 0], ['1B', 1], ['2A', 2], ['2B', 3], ['3A', 4], ['4A', 5] ]
		} else {
			return [ ['1A', 0], ['1B', 1], ['1C', 2], ['2A', 3], ['2B', 4], ['3A', 5], ['4A', 6] ]
		}
	}
	return currentDorm.value.beds
})

const networkInfo = computed(() => {
	if (!currentRoom.value || !currentDorm.value || !currentGroup.value) {
		return { submask: '0', ip: '0', gateway: '0' }
	}

	const room = parseInt(currentRoom.value)
	const dormId = currentDorm.value.id
	
	let ip = 0
	let gateway = 0
	let gateway2 = 254
	
	const submask = dormId === '8' ? '240' : '0'

	let floor
	if (dormId === '8') {
		floor = parseInt(String(currentGroup.value.name).split('.')[1] || 0)
	} else {
		floor = parseInt(currentGroup.value.name)
	}

	switch (dormId) {
		case '1':
			ip = (room - 1) * 4 + 1 + Math.floor((room - 1) / 6) * 8
			gateway = 103 + floor
			break
		case '2':
			if (floor === 1) {
				if (room === 1) ip = 109
				else if (room <= 7) ip = (room - 2) * 4 + 1
				else if (room <= 12) ip = (room - 2) * 4 + 1 + 8
				else if (room <= 17) ip = (room - 2) * 4 + 1 + 24
				else ip = (room - 2) * 4 + 1 + 32
			}
			else {
				ip = (room - 1) * 4 + 1 + Math.floor((room - 1) / 6) * 8
			}
			gateway = 107 + floor
			break
		case '3':
			ip = (room - 1) * 4 + 1 + Math.floor((room - 1) / 6) * 8
			gateway = 111 + floor
			break
		case '4':
			ip = (room - 1) * 4 + 1 + Math.floor((room - 1) / 6) * 8
			gateway = 115 + floor
			break
		case '5':
			ip = 2 * ((room - 1) % 16 * 4 + 4)
			gateway = 121 + (floor - 1) * 2 + (room <= 16 ? 0 : 1) + (floor >= 2 ? -1 : 0)
			break
		case '6':
			ip = (room - 1) % 20 * 8 + 8
			gateway = 132 + (floor * 2 - 8) + (room <= 20 ? 0 : 1)
			break
		case '7':
			ip = room * 8
			gateway = 147 + floor
			break
		case '8':
			if (floor === 50 || floor === 52) {
				gateway = 14
			}
			else {
				gateway = 13
			}
			ip = (room - 1) * 32 + 1 + ((floor === 50 || floor === 54) ? 0 : 16)
			gateway2 = (room - 1) * 32 + 1 + ((floor==50||floor==54)?0:16) + 13
			break
	}

	return {
		submask: submask,
		ip: parseInt(ip),
		gateway: parseInt(gateway),
		gateway2: parseInt(gateway2),
	}
})

watch(currentBed, (newBed) => {
	if (newBed >= 0) {
		router.replace({
			name: 'RoomBed',
			params: {
				dorm: router.currentRoute.value.params.dorm,
				group: router.currentRoute.value.params.group,
				room: router.currentRoute.value.params.room,
				bed: newBed
			}
		})
	}
})

const usageColor = computed(() => {
	if (usage.value.status == 'loading' || usage.value.status == 'no_data') {
		return '#7f8c8d'
	}
	if (usage.value.status == 'banned') {
		return '#e74c3c'
	}
	if (usage.value.percent >= 90) {
		return '#e67e22'
	}
	if (usage.value.percent >= 80) {
		return '#f39c12'
	}
	if (usage.value.percent >= 70) {
		return '#f1c40f'
	}
	return '#2ecc71'
})

const formatDate = (date) => {
	const d = new Date(date.replace(' ', 'T'))
	const month = d.getMonth() + 1
	const day = d.getDate()
	const hours = d.getHours().toString().padStart(2, '0')
	const minutes = d.getMinutes().toString().padStart(2, '0')
	return `${month}/${day} ${hours}:${minutes}`
}

const usage_all = ref([])

const usage = computed(() => {
	if (!currentBed.value || usage_all.value.length === 0) {
		return {
			status: 'no_data'
		}
	}
	const ip = networkInfo.value.gateway + '.' + parseInt(networkInfo.value.ip + beds.value[currentBed.value - 1][1])
	const data = usage_all.value.find(u => u[0] === ip)
	if (!data) {
		return {
			status: 'no_data'
		}
	}
	const usedBytes = parseFloat(data[1]) * (data[1].includes('GB') ? 1024 * 1024 * 1024 : data[1].includes('MB') ? 1024 * 1024 : data[1].includes('KB') ? 1024 : 1)
	const percent = Math.min(100, Math.round((usedBytes / (8 * 1024 * 1024 * 1024)) * 10000) / 100)
	let status = 'success'
	if(data[2] === 1) {
		status = 'banned'
	}
	else if(data[1] == '0 B') {
		status = 'no_data'
	}
	return {
		status: status,
		used: data[1],
		update_at: formatDate(data[3]),
		percent: percent
	}
})

const getUsage = async () => {
	usage_all.value = []
	let ip_list = beds.value.map(b => {
		return networkInfo.value.gateway + '.' + parseInt(networkInfo.value.ip + b[1])
	}).join('_')
	let usageData = JSON.parse(localStorage.getItem('usage_' + ip_list))
	if(new Date(usageData?.update_at).getTime() > new Date().getTime() - 1000 * 30) {
		usage_all.value = usageData.data
		return
	}
	fetch(`https://mcut-bot.henrywu.tw/api/net/?search=${ip_list}`)
	.then(res => res.json())
	.then(data => {
		usage_all.value = data
		localStorage.setItem('usage_' + ip_list, JSON.stringify({
			data: data,
			update_at: new Date()
		}))
	})
}

onMounted(() => {
	getUsage()
})
</script>