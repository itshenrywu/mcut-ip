<template>
	<div>
		<div class="ts-select has-vertically-spaced">
			<select v-model="os">
				<option value="w11">Windows 11</option>
				<option value="w10">Windows 10</option>
				<option value="mac">MacOS</option>
				<option value="ap">{{ is_en ? 'Wi-Fi AP' : 'Wi-Fi 分享器' }}</option>
			</select>
		</div>
		<template v-if="os === 'w11'">
			<div v-if="is_en">
				<ol>
					<li>
						<p>
							Use a network cable to connect your computer to the network port at your seat.<br />
							If your computer doesn’t have a network port, please <a href="https://www.google.com/search?q=USB+to+RJ45" target="_blank">purchase an adapter</a>.
						</p>
					</li>
					<li>
						<p>
							Right-click the network icon, then click "<b>Network & Internet settings</b>".<br />
							<img src="/image/set/w11_1.png" />
						</p>
					</li>
					<li>
						<p>
							Click on "<b>Ethernet</b>"<br />
							<img src="/image/set/w11_2.png" />
						</p>
					</li>
					<li>
						<p>
							Click "<b>Edit</b>" beside "IP assignment".<br />
							<img src="/image/set/w11_3.png" />
						</p>
					</li>
					<li>
						<p>
							Select <b>Manual</b> in the drop-down menu, <b>turn on IPv4</b>, and fill in the information below, then click Save.<br />
							<img src="/image/set/w11_4.png" />
						</p>
					</li>
				</ol>
			</div>
			<div v-else>
				<ol>
					<li>
						<p>
							用網路線連接電腦與座位上的網路孔。<br />
							若電腦本身無網路孔，請<a href="https://www.google.com/search?q=USB+%E8%BD%89+RJ45" target="_blank">購買轉換器</a>。
						</p>
					</li>
					<li>
						<p>
							對網路圖示點擊右鍵，再點擊「<b>網路與網際網路設定</b>」。<br />
							<img src="/image/set/w11_1.png" />
						</p>
					</li>
					<li>
						<p>
							點擊「<b>乙太網路</b>」。<br />
							<img src="/image/set/w11_2.png" />
						</p>
					</li>
					<li>
						<p>
							點擊底下的編輯。
							<img src="/image/set/w11_3.png" />
						</p>
					</li>
					<li>
						<p>
							設定為「手動」，開啟 IPv4，並填寫底下的資訊，按下儲存。<br />
							<img src="/image/set/w11_4.png" />
						</p>
					</li>
				</ol>
			</div>
		</template>
		<template v-if="os === 'w10'">
			<div v-if="is_en">
				<ol>
					<li>
						<p>
							Use a network cable to connect your computer to the network port at your seat.<br />
							If your computer doesn’t have a network port, please <a href="https://www.google.com/search?q=USB+to+RJ45" target="_blank">purchase an adapter</a>.
						</p>
					</li>
					<li>
						<p>
							Right-click the network icon, then click "<b>Open Network & Internet settings</b>".<br />
							<img src="/image/set/w10_1.png" />
						</p>
					</li>
					<li>
						<p>
							Under "<b>Change your network settings</b>", click "<b>Change adapter options</b>".<br />
							<img src="/image/set/w10_2.png" />
						</p>
					</li>
					<li>
						<p>
							Double-click on "<b>Ethernet</b>", then click "<b>Properties</b>" at the bottom, and double-click "<b>Internet Protocol Version 4</b>".<br />
							Note: Ethernet may also appear as "Wired Network" or "Local Area Network".<br />
							<img src="/image/set/w10_3.png" />
						</p>
					</li>
					<li>
						<p>
							Select "<b>Use the following IP address</b>" and "<b>Use the following DNS server addresses</b>", enter your own IP, Subnet Mask, Default Gateway, and DNS server, then click "OK"!<br />
							<img src="/image/set/w10_4.png" />
						</p>
					</li>
				</ol>
			</div>
			<div v-else>
				<ol>
					<li>
						<p>
							用網路線連接電腦與座位上的網路孔。<br />
							若電腦本身無網路孔，請<a href="https://www.google.com/search?q=USB+%E8%BD%89+RJ45" target="_blank">購買轉換器</a>。
						</p>
					</li>
					<li>
						<p>
							對網路圖示點擊右鍵，再點擊「<b>開啟網路與網際網路設定</b>」<br />
							<img src="/image/set/w10_1.png" />
						</p>
					</li>
					<li>
						<p>
							在「<b>變更您的網路設定</b>」下，點擊「<b>變更介面卡選項</b>」<br />
							<img src="/image/set/w10_2.png" />
						</p>
					</li>
					<li>
						<p>
							點擊「<b>乙太網路</b>」兩下，點擊底下的「<b>內容</b>」，再點選「<b>網際網路通訊協定第 4 版</b>」兩下
							<br>註：乙太網路也可能顯示為「有線網路」或「區域網路」<br />
							<img src="/image/set/w10_3.png" />
						</p>
					</li>
					<li>
						<p>
							點選「使用下列的 IP 位置」與「使用下列的 DNS 伺服器位置」 輸入你自己的 IP、子網路遮罩、預設閘道與 DNS 伺服器，並點擊「確定」即可！<br />
							<img src="/image/set/w10_4.png" />
						</p>
					</li>
				</ol>
			</div>
		</template>
		<template v-if="os === 'mac'">
			<div v-if="is_en">
				<ol>
					<li>
						<p>
							Use a network cable to connect your computer to the network port at your seat.<br />
							If your computer doesn’t have a network port, please <a href="https://www.google.com/search?q=USB+to+RJ45" target="_blank">purchase an adapter</a>.
						</p>
					</li>
					<li>
						<p>
							Click the Apple icon in the top left corner, click "<b>System Settings</b>", click "<b>Network</b>", then click "<b>Ethernet</b>".<br />
							Note: If using a USB, Thunderbolt, or Type C network adapter, please select the corresponding option.<br />
							<img src="/image/set/mac_1.png" />
						</p>
					</li>
					<li>
						<p>
							Click "Details"
							<img src="/image/set/mac_2.png" />
						</p>
					</li>
					<li>
						<p>
							Click "<b>TCP/IP</b>", set "<b>Configure IPv4</b>" to "Manually".<br />
							Enter the <b>IP, Subnet Mask, and Router</b> you found earlier.<br />
							<img src="/image/set/mac_3.png" />
						</p>
					</li>
					<li>
						<p>
							Click "<b>DNS</b>", enter the DNS server, and then click "<b>OK</b>".<br />
							<img src="/image/set/mac_4.png" />
						</p>
					</li>
				</ol>
			</div>
			<div v-else>
				<ol>
					<li>
						<p>
							用網路線連接電腦與座位上的網路孔。<br />
							若電腦本身無網路孔，請<a href="https://www.google.com/search?q=USB+%E8%BD%89+RJ45" target="_blank">購買轉換器</a>。
						</p>
					</li>
					<li>
						<p>
							點擊左上角的蘋果圖示，點擊「<b>系統設定</b>」，點擊「<b>網路</b>」，再點擊「<b>乙太網路</b>」<br />
							註：若使用 USB、Thunderbolt 或 Type C 網路轉接線，請選擇相對應的選項<br />
							<img src="/image/set/mac_1.png" />
						</p>
					</li>
					<li>
						<p>
							點擊「詳細資訊」
							<img src="/image/set/mac_2.png" />
						</p>
					</li>
					<li>
						<p>
							點擊「<b>TCP/IP</b>」，將「<b>設定 IPv4</b>」選為「手動」<br />
							輸入剛剛查到的 <b>IP、子網路遮罩、路由器</b><br />
							<img src="/image/set/mac_3.png" />
						</p>
					</li>
					<li>
						<p>
							點擊「<b>DNS</b>」，輸入 DNS 伺服器，再點擊「<b>好</b>」<br />
							<img src="/image/set/mac_4.png" />
						</p>
					</li>
				</ol>
			</div>
		</template>
		<template v-if="os === 'ap'">
			<div v-if="is_en">
				<ol>
					<li>
						<p>
							Use a network cable to connect the network port at your seat to the <b>WAN</b> port on the router.
							(Usually a different color or specially labeled WAN).<br />
							<img src="/image/set/ap_1.png" />
						</p>
					</li>
					<li>
						<p>
							After connecting the router to a power source, use your phone or computer to connect to the router's Wi-Fi.<br />
							The Wi-Fi name and password are usually on a label on the bottom or side of the router.<br />
							Set up the <b>external network</b> with a <b>static IP</b> according to the instructions for your specific brand of router. <br>
							After connecting to Wi-Fi, you don’t need to set up the external network IP.
						</p>
						<p>
							Note: Each brand of router has a different setup process, please search for the manual for your specific model on Google. <br>
							Example: <a ref="nofollow" href="https://www.asus.com/tw/support/FAQ/1011715/">ASUS Router Setup Guide</a>
						</p>
					</li>
				</ol>
			</div>
			<div v-else>
				<ol>
					<li>
					<p>
						用網路線將座位上的網路孔接到分享器上的 <b>WAN</b> 孔（通常會是不同顏色、或是有特別標示 WAN）。<br>
						<img src="/image/set/ap_1.png" />
					</p>
					</li>
					<li>
						<p>
							分享器接上電源後，用手機或電腦連上分享器的 Wi-Fi。<br>
							Wi-Fi 名稱與密碼通常會貼在分享器底部或側邊的標籤上。<br>
							依各廠牌分享器的說明書設定<b>外部網路</b>的<b>固定 IP</b>。<br>
							電腦連接 Wi-Fi 後則不用設定外部網路 IP。
						</p>
						<p>
							註：各廠牌分享器/路由器設定方式皆不同，請自行在 Google 搜尋該型號的說明書。<br>
							範例：<a href="https://www.asus.com/tw/support/FAQ/1011715/">ASUS 路由器設定方式</a>
						</p>
					</li>
				</ol>
			</div>
		</template>
	</div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { onMounted, ref } from 'vue'
import { utils } from '../composables/utils.js'
const { is_en } = utils()

useHead({
	title: '網路設定教學 | 明志科技大學宿舍有線網路',
})

const os = ref('w11')

onMounted(() => {
	
});
</script>

<style scoped>
img {
	width: 100%;
}

ol {
	padding-inline-start: 15px;
}

li {
	margin-bottom: 1rem;
}

.ts-select {
	width: 10rem;
}

.ts-select::after {
	font-family: icomoon;
	content: "\e901";
	transform: rotate(-90deg);
	font-size: .76rem;
}
</style>