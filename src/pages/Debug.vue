<template>
	<div class="ts-wrap is-vertical has-vertically-spaced">
		<template v-if="is_en">
			<p class="ts-text is-description">
				Work through the steps below <b>in order</b>. Stop at the first step that fails and follow the instructions there — most problems are solved in step 1 or 2.
			</p>
			<div class="ts-box is-start-indicated is-warning">
				<div class="ts-content">
					The screenshots below are from <b>Windows 11</b>. On Windows 10 and macOS the screens look different, but the order of the checks is exactly the same.
				</div>
			</div>
			<div class="ts-box is-start-indicated">
				<div class="ts-content">
					Using a Wi-Fi router? Unplug the cable from the router and plug it straight into a computer first. That tells you whether the problem is the router or the line itself.
				</div>
			</div>

			<ol>
				<li>
					<p class="step-title">Check whether your computer can even “see” the cable</p>
					<p>
						Right-click the network icon in the bottom-right corner, then click "<b>Network &amp; Internet settings</b>".<br />
						<img src="/image/set/w11_1.png" />
					</p>
					<p>
						Look at the line of text right under "<b>Ethernet</b>" at the top of the page.<br />
						<img src="/image/set/w11_2.png" />
					</p>

					<div class="ts-box is-start-indicated is-negative">
						<div class="ts-content">
							<div class="ts-text is-label">It says "Network cable unplugged", "Not connected" or "Unidentified network"</div>
							<p>Your computer is not receiving a signal from the line, so this is not a settings problem. Try these in order:</p>
							<ul>
								<li>Unplug and re-plug both ends of the cable until you hear a "click". A broken clip on the connector is by far the most common cause — if the clip is broken, replace the cable.</li>
								<li>Borrow a roommate's cable to find out whether yours is faulty.</li>
								<li>Try another network port on the wall. <b>Note: every port has its own IP</b>, so if you change ports you must look up the IP for that port (bed) again.</li>
								<li>Using a USB to RJ45 adapter? Try a different USB port and make sure the adapter's driver is installed.</li>
								<li>Still "unplugged" after all of that? The port or the line is probably faulty — report it (see step 4).</li>
							</ul>
						</div>
					</div>

					<div class="ts-box is-start-indicated is-warning">
						<div class="ts-content">
							<div class="ts-text is-label">There is no "Ethernet" entry at all</div>
							<p>Windows has not detected a network adapter. If your computer has a built-in network port, update the network adapter driver. If you use an adapter, try another USB port or install the adapter's driver.</p>
						</div>
					</div>

					<div class="ts-box is-start-indicated is-positive">
						<div class="ts-content">
							<div class="ts-text is-label">It says "Connected" or "No internet access"</div>
							<p>The cable is fine. Move on to step 2 and check your IP settings.</p>
						</div>
					</div>
				</li>

				<li>
					<p class="step-title">Check that the IP settings are correct</p>
					<p>
						First look up the four numbers for your own bed — IP address, subnet mask, default gateway and DNS server.
						<router-link to="/">Look them up here</router-link>.
					</p>
					<p>
						Then go to <b>Settings → Network &amp; Internet → Ethernet</b>, scroll down to "IP assignment" and compare every digit with the numbers you looked up.<br />
						<img src="/image/set/w11_3.png" />
					</p>
					<p>
						To change them, click "<b>Edit</b>" next to "IP assignment" — the full walkthrough is in the
						<router-link to="/set">setup guide</router-link>.
					</p>
					<p>The most common mistakes:</p>
					<ul>
						<li>"IP assignment" still says <b>Automatic (DHCP)</b>. The dormitory network does not hand out addresses automatically — it has to be set to <b>Manual</b>.</li>
						<li>Using a roommate's IP, or the IP of another bed.</li>
						<li>The <b>IPv4</b> switch in the Edit window was never turned on, or you forgot to press <b>Save</b>.</li>
						<li>A missing or extra digit in the subnet mask or the default gateway.</li>
						<li>The DNS server 210.240.232.1 was left empty.</li>
					</ul>
					<p>
						Quick check: press <b>Win + R</b>, type <code>cmd</code>, press Enter, then type <code>ipconfig</code>.
						If your IPv4 address starts with <b>169.254</b>, your settings did not take effect — the computer is still trying to get an address automatically.
					</p>

					<div class="ts-box is-start-indicated is-warning">
						<div class="ts-content">
							<div class="ts-text is-label">Everything looks right but it still doesn't work? Try the other beds in your room</div>
							<p>
								In some rooms the wall ports are numbered in the opposite order to the beds — the cable at bed 1 may actually belong to the port for bed 4 — so the bed you pick here does not always match the port you are plugged into.
							</p>
							<p>
								Go back to your room, select bed 1, bed 2, bed 3 … in turn and try each set of numbers. Whichever one gets you online is your real port.
							</p>
							<p>
								Just skip any IP a roommate is already using — two computers on the same IP will knock each other offline.
							</p>
						</div>
					</div>
				</li>

				<li>
					<p class="step-title">Use ping to find where the connection breaks</p>
					<p>
						Press the <b>Win</b> key, type <code>cmd</code> and press Enter to open Command Prompt. Run the commands below one by one (press Enter after each).
						<b>The first one that fails is where the problem is.</b>
					</p>
					<ol class="checks">
						<li>
							<code>ping 127.0.0.1</code>
							<p>Tests your own network adapter. <b>Fails:</b> the driver is broken — restart the computer or reinstall the network adapter driver.</p>
						</li>
						<li>
							<code>ping 192.168.___.254</code>
							<p>Replace this with <b>your own default gateway</b>. Tests the connection to the switch on your floor. <b>Fails:</b> go back to steps 1 and 2, and try the other beds in your room as described there. If the cable and settings are definitely correct, the port may not be activated or your IP may be blocked — see step 4.</p>
						</li>
						<li>
							<code>ping 210.240.232.1</code>
							<p>The school's DNS server, which tests the campus network. <b>Fails:</b> a problem inside the campus network — see step 4.</p>
						</li>
						<li>
							<code>ping 168.95.1.1</code>
							<p>A Chunghwa Telecom DNS server, which tests the school's connection to the outside world. <b>Fails:</b> the school's external line may be down — wait a while and try again.</p>
						</li>
						<li>
							<code>ping www.google.com</code>
							<p>Tests name resolution (DNS). <b>Only this one fails:</b> your DNS is not set correctly — go back to step 2 and set the DNS server to 210.240.232.1.</p>
						</li>
					</ol>
					<p>How to read the result:</p>
					<ul>
						<li>"Reply from …: bytes=32 time=1ms" → it works.</li>
						<li>"Request timed out", "General failure" or "Destination host unreachable" → it does not.</li>
						<li>Everything passes but one particular website will not load → that site is probably the one with the problem; try another site.</li>
					</ul>
				</li>

				<li>
					<p class="step-title">Still not working — how to get help</p>
					<ul>
						<li>
							<b>"IP address conflict detected"</b> — someone else is using your IP. Make sure you really did enter the IP for your own bed; if you did, report it.
						</li>
						<li>
							<b>You think your IP is blocked</b> — access is suspended for infected machines or abnormal traffic. Report it as well.
						</li>
						<li>
							<b>How to report:</b> from your phone or another computer that is online, email
							<a href="mailto:cc@mail.mcut.edu.tw">cc@mail.mcut.edu.tw</a> with your name, student ID, dormitory and room (e.g. 5th Dorm 501), bed number, the number written on the network port, the IP you configured, and which steps you have already tried.
						</li>
						<li>
							<b>By phone:</b> 02-2908-9899 (Library ext. 2280, Computer Center ext. 2270).
						</li>
						<li>
							A broken or inactive network port can also be reported to your dormitory's network assistant or supervisor.
						</li>
					</ul>
				</li>
			</ol>
		</template>

		<template v-else>
			<p class="ts-text is-description">
				網路不通的時候，請照著下面的順序一步一步檢查。<b>做到哪一步不通，就停在那一步照著處理</b>，大部分的問題在第 1、2 步就解決了。
			</p>
			<div class="ts-box is-start-indicated is-warning">
				<div class="ts-content">
					以下畫面以 <b>Windows 11</b> 為例。Windows 10 與 macOS 的畫面位置不同，但檢查的順序完全一樣。
				</div>
			</div>
			<div class="ts-box is-start-indicated">
				<div class="ts-content">
					如果你有接 Wi-Fi 分享器，請先把網路線從分享器上拔下來、直接接到電腦測試，這樣才知道問題是出在分享器還是線路。
				</div>
			</div>

			<ol>
				<li>
					<p class="step-title">先確認電腦有沒有「看到」網路線</p>
					<p>
						對右下角的網路圖示點擊右鍵，再點擊「<b>網路和網際網路設定</b>」。<br />
						<img src="/image/set/w11_1.png" />
					</p>
					<p>
						看最上面「<b>乙太網路</b>」下面那一行字寫什麼。<br />
						<img src="/image/set/w11_2.png" />
					</p>

					<div class="ts-box is-start-indicated is-negative">
						<div class="ts-content">
							<div class="ts-text is-label">寫著「已拔除電纜」、「未連線」或「未識別的網路」</div>
							<p>代表電腦收不到線路的訊號，通常不是設定的問題。請依序試試看：</p>
							<ul>
								<li>把網路線兩端重新拔起來再插回去，插到聽見「喀」一聲。<b>水晶頭上的卡榫斷掉是最常見的原因</b>，卡榫斷了就換一條線。</li>
								<li>借室友的網路線接接看，確認是不是自己的線壞了。</li>
								<li>把線接到牆上的另一個網路孔試試。<b>注意：每個網路孔的 IP 不一樣</b>，換孔之後要回本站重新查那個孔（床位）的 IP。</li>
								<li>用 USB 轉 RJ45 轉接頭的人：換一個 USB 孔，並確認轉接頭的驅動程式有安裝好。</li>
								<li>以上都試過還是「已拔除電纜」，那可能是網路孔或線路故障，請直接報修（見第 4 步）。</li>
							</ul>
						</div>
					</div>

					<div class="ts-box is-start-indicated is-warning">
						<div class="ts-content">
							<div class="ts-text is-label">根本找不到「乙太網路」這個項目</div>
							<p>代表 Windows 沒有抓到網路卡。電腦本身有網路孔的話，請更新網路卡的驅動程式；用轉接頭的話，請換一個 USB 孔或安裝轉接頭的驅動程式。</p>
						</div>
					</div>

					<div class="ts-box is-start-indicated is-positive">
						<div class="ts-content">
							<div class="ts-text is-label">寫著「已連線」或「無網際網路存取」</div>
							<p>代表線路沒問題，請接著做第 2 步，檢查 IP 設定。</p>
						</div>
					</div>
				</li>

				<li>
					<p class="step-title">檢查 IP 設定有沒有填對</p>
					<p>
						先查出自己床位的四組數字：IP 地址、子網路遮罩、預設閘道、DNS 伺服器。
						<router-link to="/">回首頁查詢</router-link>。
					</p>
					<p>
						接著打開<b>設定 → 網路和網際網路 → 乙太網路</b>，往下拉找到「IP 指派」，把畫面上的數字跟查到的一個字一個字對過。<br />
						<img src="/image/set/w11_3.png" />
					</p>
					<p>
						要修改的話，點「IP 指派」旁邊的「<b>編輯</b>」，詳細步驟請看
						<router-link to="/set">網路設定教學</router-link>。
					</p>
					<p>最常見的錯誤：</p>
					<ul>
						<li>「IP 指派」還是顯示<b>自動 (DHCP)</b>。宿舍網路不會自動給 IP，一定要改成<b>手動</b>。</li>
						<li>填成室友的、或別的床位的 IP。</li>
						<li>編輯視窗裡的 <b>IPv4</b> 開關沒有打開，或是填完忘記按「<b>儲存</b>」。</li>
						<li>子網路遮罩或預設閘道少打、多打了一位數字。</li>
						<li>DNS 伺服器沒有填 210.240.232.1。</li>
					</ul>
					<p>
						想快速確認：按 <b>Win + R</b>，輸入 <code>cmd</code> 後按 Enter，再輸入 <code>ipconfig</code>。
						如果 IPv4 位址是 <b>169.254</b> 開頭，代表設定沒有生效，電腦還在自動取得 IP。
					</p>

					<div class="ts-box is-start-indicated is-warning">
						<div class="ts-content">
							<div class="ts-text is-label">確定填對了還是不通？把同房間每一床的 IP 都試一次</div>
							<p>
								有些房間牆上網路孔的排列順序跟床位是相反的（例如 1 床旁邊那個孔，其實是 4 床的），所以你選的床位不一定就是你實際插的那個孔。
							</p>
							<p>
								回到自己的房間頁面，依序點 1 床、2 床、3 床⋯⋯，把每一組數字都填進去試試看，哪一組能上網，那組就是你這個孔的 IP。
							</p>
							<p>
								室友已經在用的那幾組就跳過不要試，兩台電腦用同一個 IP 會互相斷線。
							</p>
						</div>
					</div>
				</li>

				<li>
					<p class="step-title">用 ping 一段一段找出斷在哪裡</p>
					<p>
						按 <b>Win</b> 鍵，直接輸入 <code>cmd</code> 再按 Enter，開啟「命令提示字元」，然後依序輸入下面的指令（每打完一行按 Enter）。
						<b>第一個不通的地方，就是問題所在。</b>
					</p>
					<ol class="checks">
						<li>
							<code>ping 127.0.0.1</code>
							<p>測試自己的網路卡。<b>不通：</b>網路卡驅動程式有問題，請重新開機或重裝驅動程式。</p>
						</li>
						<li>
							<code>ping 192.168.___.254</code>
							<p>請換成<b>你自己的預設閘道</b>。測試到宿舍樓層網路設備的連線。<b>不通：</b>回第 1、2 步再檢查一次，並照第 2 步的說明把同房間每一床的 IP 都試過；線路與設定都確定沒問題卻不通，可能是網路孔沒開通或 IP 被封鎖，見第 4 步。</p>
						</li>
						<li>
							<code>ping 210.240.232.1</code>
							<p>這是學校的 DNS 伺服器，測試校內網路。<b>不通：</b>校內線路有問題，見第 4 步。</p>
						</li>
						<li>
							<code>ping 168.95.1.1</code>
							<p>這是中華電信的 DNS，測試學校對外的網路。<b>不通：</b>學校對外線路可能有狀況，過一陣子再試試。</p>
						</li>
						<li>
							<code>ping www.google.com</code>
							<p>測試網址解析（DNS）。<b>前面都通，只有這個不通：</b>DNS 沒設定好，回第 2 步把 DNS 伺服器填成 210.240.232.1。</p>
						</li>
					</ol>
					<p>怎麼看結果：</p>
					<ul>
						<li>出現「回覆自 …: 位元組=32 時間=1ms」→ 通了。</li>
						<li>出現「要求等候逾時」、「一般失敗」、「目的地主機無法連線」→ 不通。</li>
						<li>全部都通，但只有某個網站打不開 → 多半是那個網站自己的問題，換別的網站試試看。</li>
					</ul>
				</li>

				<li>
					<p class="step-title">都試過還是不行，怎麼求助</p>
					<ul>
						<li>
							<b>跳出「偵測到 IP 位址衝突」</b>：代表有別人用了跟你一樣的 IP。先確認自己填的真的是自己床位的 IP，確認沒填錯就要反映。
						</li>
						<li>
							<b>懷疑 IP 被封鎖</b>：電腦中毒或流量異常會被停權，也請反映。
						</li>
						<li>
							<b>反映方式</b>：用手機或其他可以上網的裝置，寄信到
							<a href="mailto:cc@mail.mcut.edu.tw">cc@mail.mcut.edu.tw</a>，信裡寫上姓名、學號、宿舍與寢室（例如 五宿 501）、床位、網路孔上的編號、你設定的 IP，以及你已經試過哪些步驟。
						</li>
						<li>
							<b>電話</b>：02-2908-9899（圖書館分機 2280、電算中心分機 2270）。
						</li>
						<li>
							網路孔壞掉或沒開通，也可以找宿舍的網管或舍監協助報修。
						</li>
					</ul>
				</li>
			</ol>
		</template>
	</div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { utils } from '../composables/utils.js'
const { is_en } = utils()

useHead({
	title: '網路無法連線？ | 明志科技大學宿舍有線網路',
})
</script>

<style scoped>
img {
	width: 100%;
}

ol {
	padding-inline-start: 15px;
}

ul {
	padding-inline-start: 20px;
	margin: 0;
}

li {
	margin-bottom: 1rem;
}

ul li,
ol.checks li {
	margin-bottom: .4rem;
}

p {
	margin: .5rem 0;
}

.step-title {
	font-weight: bold;
}

.ts-box .ts-content {
	padding: .8rem 1rem;
}

.ts-box p:first-child,
.ts-box .ts-text.is-label + p {
	margin-top: .3rem;
}

.ts-box p:last-child {
	margin-bottom: 0;
}

ol.checks {
	padding-inline-start: 20px;
}

ol.checks > li::marker {
	color: var(--ts-gray-500);
}

code {
	display: inline-block;
	font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
	font-size: .9em;
	background: var(--ts-gray-100);
	border: 1px solid var(--ts-gray-300);
	border-radius: var(--ts-border-radius-secondary);
	padding: .1rem .4rem;
	word-break: break-all;
}

ol.checks > li > code {
	margin-bottom: .2rem;
}
</style>
