import Index from './pages/Index.vue'
import RoomSelect from './pages/RoomSelect.vue'
import Room from './pages/Room.vue'
import Set from './pages/Set.vue'
import NotFound from './pages/NotFound.vue'
import { utils } from './composables/utils.js'
const { _, getRoomList, getRoomName, dorms } = utils()

let routes = []

if(import.meta.env.SSR) {
	dorms.forEach(dorm => {
		dorm.rooms.forEach(group => {
			let group_name = group.name.replace(/[^0-9]/g, '')
			routes.push({
				path: `/${dorm.id}/${group_name}`,
				component: RoomSelect,
				meta: {
					title: `${dorm.name[0]} ${group.name} | 明志科技大學宿舍有線網路`
				}
			})
			getRoomList(group).forEach(room => {
				routes.push({
					path: `/${dorm.id}/${group_name}/${room}`,
					component: Room,
					meta: {
						title: `${dorm.name[0]} ${group.name} ${getRoomName(group, room)} | 明志科技大學宿舍有線網路`
					}
				})
				let beds = dorm.beds
				if(dorm.id == 8) {
					if(group.name.includes('50') || group.name.includes('52')) {
						beds = [['1A', 0], ['1B', 1], ['2A', 2], ['2B', 3], ['3A', 4], ['4A', 5]]
					} else {
						beds = [['1A', 0], ['1B', 1], ['1C', 2], ['2A', 3], ['2B', 4], ['3A', 5], ['4A', 6]]
					}
				}
				beds.forEach((bed, index) => {
					routes.push({
						path: `/${dorm.id}/${group_name}/${room}/${index + 1}`,
						component: Room,
						meta: {
							title: `${dorm.name[0]} ${group.name} ${getRoomName(group, room)} | 明志科技大學宿舍有線網路`
						}
					})
				})
			})
		})
	})

	routes.push({
		path: '/',
		component: Index,
	})

	routes.push({
		path: '/set',
		component: Set,
	})
	
	routes.push({
		path: '/404',
		component: NotFound
	})

	routes.push({
		path: '/:pathMatch(.*)*',
		component: NotFound
	})
}
else {
	routes = [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/:dorm/:group',
			name: 'RoomSelect',
			component: RoomSelect,
			beforeEnter: (to, from, next) => {
				if(
					dorms.find(dorm => dorm.id === to.params.dorm) &&
					dorms.find(dorm => dorm.id === to.params.dorm).rooms.find(group => group.name.includes(to.params.group))
				) {
					next()
				} else {
					next({ name: 'NotFound' })
				}
			}
		},
		{
			path: '/:dorm/:group/:room',
			name: 'Room',
			component: Room,
			beforeEnter: (to, from, next) => {
				if(
					dorms.find(dorm => dorm.id === to.params.dorm) &&
					dorms.find(dorm => dorm.id === to.params.dorm).rooms.find(group => group.name.includes(to.params.group)) &&
					getRoomList(dorms.find(dorm => dorm.id === to.params.dorm).rooms.find(group => group.name.includes(to.params.group))).find(room => room == to.params.room)
				) {
					next()
				} else {
					next({ name: 'NotFound' })
				}
			}
		},
		{
			path: '/:dorm/:group/:room/:bed',
			name: 'RoomBed',
			component: Room,
			beforeEnter: (to, from, next) => {
				if(
					dorms.find(dorm => dorm.id === to.params.dorm) &&
					dorms.find(dorm => dorm.id === to.params.dorm).rooms.find(group => group.name.includes(to.params.group)) &&
					getRoomList(dorms.find(dorm => dorm.id === to.params.dorm).rooms.find(group => group.name.includes(to.params.group))).find(room => room == to.params.room)
				) {
					next()
				} else {
					next({ name: 'NotFound' })
				}
			}
		},
		{
			path: '/set',
			name: 'Set',
			component: Set
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound
		}
	]
}

export { routes }