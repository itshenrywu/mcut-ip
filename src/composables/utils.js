import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const is_en = ref(typeof window !== 'undefined' && localStorage.getItem('is_en') == 1 ? 1 : 0)
const switchLang = () => {
	is_en.value = is_en.value == 1 ? 0 : 1
	if (typeof window !== 'undefined') {
		localStorage.setItem('is_en', is_en.value)
	}
}

export function utils() {
	const _ = (text) => {
		return {
			title: ['明志科技大學宿舍有線網路', 'MCUT Dormitory Internet'],
			ip: ['IP 地址', 'IP Address'],
			submask: ['子網路遮罩', 'Subnet Mask'],
			gateway: ['預設閘道', 'Default Gateway'],
			dns: ['DNS 伺服器', 'DNS Server'],
			choose1: ['請選擇床位', 'Please select your bed number'],
			choose2: ['請選擇網路孔編號', 'Please select your internet port number'],
			how_to: ['如何設定網路？', 'How to set up my internet?'],
			switch_lang: ['English', '中文'],
			not_found_title: ['找不到這個頁面', '404 Not Found'],
			not_found_text: ['請確認您輸入的網址是否正確。', 'Please check if the URL you entered is correct.'],
			usage: ['網路使用流量', 'Internet Usage'],
			update_at: ['更新於', 'Last updated: '],
			loading: ['讀取中...', 'Loading...'],
			no_data: ['暫無資料', 'Currently no data'],
			banned: ['今日已鎖定', 'Temporary banned'],
			set: ['網路設定教學', 'Internet Setup Guide'],
		}[text]?.[is_en.value || 0]
	}

	const dorms = reactive([
		{
			id: '1',
			name: ['一宿', 'First Dormitory', '1<sup>st</sup> Dorm'],
			type: '男宿',
			rooms: [
				{
					name: '1F',
					rooms: [[1, 24]]
				},
				{
					name: '2F',
					rooms: [[1, 24]]
				},
				{
					name: '3F',
					rooms: [[1, 24]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 1], ['3 床', 2], ['4 床', 3] ]
		},
		{
			id: '2',
			name: ['二宿', 'Second Dormitory', '2<sup>nd</sup> Dorm'],
			type: '男宿',
			rooms: [
				{
					name: '1F',
					rooms: [[1, 19]]
				},
				{
					name: '2F',
					rooms: [[1, 24]]
				},
				{
					name: '3F',
					rooms: [[1, 24]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 1], ['3 床', 2], ['4 床', 3] ]
		},
		{
			id: '3',
			name: ['三宿', 'Third Dormitory', '3<sup>rd</sup> Dorm'],
			type: '男宿',
			rooms: [
				{
					name: '1F',
					rooms: [[1, 14], [16, 16], [21, 26]]
				},
				{
					name: '2F',
					rooms: [[1, 29]]
				},
				{
					name: '3F',
					rooms: [[1, 29]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 1], ['3 床', 2], ['4 床', 3] ]
		},
		{
			id: '4',
			name: ['四宿', 'Fourth Dormitory', '4<sup>th</sup> Dorm'],
			type: '男宿',
			rooms: [
				{
					name: '1F',
					rooms: [[1, 7], [9, 20], [22, 29]]
				},
				{
					name: '2F',
					rooms: [[1, 29]]
				},
				{
					name: '3F',
					rooms: [[1, 29]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 1], ['3 床', 2], ['4 床', 3] ]
		},
		{
			id: '5',
			name: ['五宿', 'Fifth Dormitory', '5<sup>th</sup> Dorm'],
			type: '男宿',
			rooms: [
				{
					name: '1F',
					rooms: [[1, 16]]
				},
				{
					name: '2F',
					rooms: [[1, 32]]
				},
				{
					name: '3F',
					rooms: [[1, 32]]
				},
				{
					name: '4F',
					rooms: [[1, 32]]
				},
				{
					name: '5F',
					rooms: [[1, 32]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 2], ['3 床', 4], ['4 床', 6] ]
		},
		{
			id: '6',
			name: ['六宿', 'Sixth Dormitory', '6<sup>th</sup> Dorm'],
			type: '女宿',
			rooms: [
				{
					name: '4F',
					rooms: [[1, 39]]
				},
				{
					name: '5F',
					rooms: [[1, 39]]
				},
				{
					name: '6F',
					rooms: [[1, 39]]
				},
				{
					name: '7F',
					rooms: [[1, 39]]
				}
			],
			beds: [ ['1 床', 0], ['2 床', 1], ['3 床', 2], ['4 床', 5], ['5 床', 4], ['6 床', 3] ]
		},
		{
			id: '7',
			name: ['國際學生宿舍', 'International Student Dormitory', 'Intl. Dorm'],
			rooms: [
				{
					name: '1F',
					rooms: [[1, 13]]
				},
				{
					name: '2F',
					rooms: [[1, 17]]
				},
				{
					name: '3F',
					rooms: [[1, 18]]
				}
			],
			beds: [ ['1 號', 0], ['2 號', 2], ['3 號', 4], ['4 號', 6] ]
		},
		{
			id: '8',
			name: ['研究交流會館', 'Research and Exchange Hall', 'Research Hall'],
			rooms: [
				{
					name: 'No. 50',
					rooms: [[1, 6]]
				},
				{
					name: 'No. 52',
					rooms: [[1, 6]]
				},
				{
					name: 'No. 54',
					rooms: [[1, 6]]
				},
				{
					name: 'No. 56',
					rooms: [[1, 6]]
				}
			],
			beds: []
		}
	])

	const router = useRouter()
	
	const currentDorm = computed(() => {
		const dormParam = router.currentRoute.value.params.dorm
		if (!dormParam) return null
		return dorms.find(dorm => dorm.id.includes(dormParam)) || null
	})

	const currentGroup = computed(() => {
		const groupParam = router.currentRoute.value.params.group
		if (!currentDorm.value || !groupParam) return null
		return currentDorm.value.rooms.find(room => room.name.includes(groupParam)) || null
	})

	const currentRoom = computed(() => {
		return router.currentRoute.value.params.room || ''
	})

	const getRoomName = (group = null, room) => {
		if(!group) group = currentGroup.value
		if(group.name.includes('F')) {
			return group.name.replace('F','') + room.toString().padStart(2, '0')
		} else {
			return room + 'F'
		}
	}

	const getRoomList = ((group = null) => {
		try {
			if(!group) group = currentGroup.value
			return group.rooms.flatMap(([start, end]) =>
				Array.from({ length: end - start + 1 }, (_, i) => start + i)
			)
		} catch (error) {
			return []
		}
	})

	return {
		is_en,
		switchLang,
		dorms,
		_,
		currentDorm,
		currentGroup,
		currentRoom,
		getRoomName,
		getRoomList,
	}
}
