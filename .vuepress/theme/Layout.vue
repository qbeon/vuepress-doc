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
			:class="{'collapsed': !showDropdownNav}"
			v-show="showDropdownNav"
			@changeTheme="changeTheme"
			:showDropdownNav="showDropdownNav"
			@changeLanguage="changeLanguage"
			:currentLang="language.isoCode"
		/>
	</transition>
	<appHeader @toggleNav="toggleDropdownNav()" :theme="theme"/>
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
			debugBoundaries: false,
			showDropdownNav: false,
			theme: 'theme_white',
			showModalViewport: false,
			config: Config,
			language: {
				isoCode: '',
				path: '',
			},
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
		toggleDebugBoundries() {
			if (!this.debugBoundaries) {
				let el = document.documentElement.classList
				el.add('debug')
				el.add('boundaries')
			}
			else {
				let el = document.documentElement.classList
				el.remove('debug')
				el.remove('boundaries')
			}
			this.debugBoundaries = !this.debugBoundaries
		},
		changeLanguage(lang) {
			this.language.isoCode = lang.lang
			this.language.path = lang.path
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
