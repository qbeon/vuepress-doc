<template>
<div>
	<meta name="theme-color" :content="androidTopBar">
	<meta
		name="apple-mobile-web-app-status-bar-style"
		:content="androidTopBar"
	/>
	<!-- Google Material Icons -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<transition name="drop-down-nav">
		<dropDownNavigation
			@toggleNav="toggleDropdownNav()"
			:class="{
				'collapsed': !showDropdownNav,
				'expanded': !headerState,
			}"
			v-show="showDropdownNav"
			@changeTheme="changeTheme"
			:showDropdownNav="showDropdownNav"
			@changeLanguage="changeLanguage"
			:currentLang="language.isoCode"
			@toggleHeader="toggleHeader"
		/>
	</transition>
	<appHeader
		@toggleNav="toggleDropdownNav()"
		:class="{'hidden': !headerState}"
		:theme="theme"
		:dropDownNavState="showDropdownNav"
	/>
	<div id="site-container">
		<navigation/>
		<Content class="content"/>
	</div>
	<!-- <modalViewport v-show="showModalViewport"/> -->
</div>
</template>

<script>
import AppHeader from './components/Header'
import Navigation from './components/Navigation'
import DropDownNavigation from './components/DropDownNavigation'
import ModalViewport from './components/ModalViewport'
import Config from '../config'

export default {
	name: 'Layout',
	components: {
		DropDownNavigation,
		Navigation,
		AppHeader,
		ModalViewport,
	},
	data() {
		return {
			debug: false, // DEBUG --------
			showDropdownNav: false,
			theme: 'theme_white',
			showModalViewport: false,
			config: Config,
			language: {
				isoCode: '',
				path: '',
			},
			headerState: true,
		}
	},
	computed: {
		androidTopBar() {
			switch (this.theme) {
				case 'light-theme':
					return '#fff'
				case 'black-theme':
					return '#000'
				default:
					return 'default'
			}
		},
	},
	methods: {
		changeTheme(theme) {
			if (theme != this.theme && this.theme != '') {
				document.documentElement.classList.remove(this.theme)
			}
			document.documentElement.classList.add(theme)
			this.theme = theme
		},
		toggleDropdownNav() {
			if (this.showDropdownNav) {
				document.documentElement.classList.remove('lock-scroll')
			} else {
				document.documentElement.classList.add('lock-scroll')
			}
			this.showDropdownNav = !this.showDropdownNav
		},
		toggleDebug() { // DEBUG --------
			if (this.debug) {
				document.documentElement.classList.remove('debug', 'boundaries')
			} else {
				document.documentElement.classList.add('debug', 'boundaries')
			}
			this.debug = !this.debug
		},
		changeLanguage(lang) {
			this.language.isoCode = lang.lang
			this.language.path = lang.path
		},
		toggleHeader(state) {
			if (state === undefined) this.headerState = !this.headerState
			else this.headerState = state
		},
	},
	watch: {
		'language.path'(val) {
			let fullPath = this.$route.fullPath
			// this.$router.push(
			// 	val + fullPath.slice(4, fullPath.length)
			// )
		},
	},
}
</script>

<style lang="stylus">
@import 'styles/index'
@import 'styles/variables'
</style>
