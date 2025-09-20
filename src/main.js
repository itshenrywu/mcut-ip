import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router.js'

import 'tocas/src/reboot.css'
import 'tocas/src/container.css'
import 'tocas/src/text.css'
import 'tocas/src/grid.css'
import 'tocas/src/wrap.css'
import 'tocas/src/box.css'
import 'tocas/src/content.css'
import 'tocas/src/header.css'
import 'tocas/src/button.css'
import 'tocas/src/menu.css'
import 'tocas/src/select.css'
import 'tocas/src/selection.css'
import 'tocas/src/progress.css'
import 'tocas/src/app-layout.css'
import 'tocas/src/app-center.css'
import 'tocas/src/utilities.css'
import './assets/css/tocas-base.css'
import './assets/css/fonts.css'
import './style.css'

export const createApp = ViteSSG(
	App,
	{ routes },
	({ app, router, routes, initialState }) => {},
)