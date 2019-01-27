<template>
<div>
	<!-- OS top bar color - color depends on theme -->
	<meta
		name="theme-color"
		:content="$store.state.appTheme.osTopBarColor"
	/>
	<meta
		name="apple-mobile-web-app-status-bar-style"
		:content="$store.state.appTheme.osTopBarColor"
	/>

	<transition name="drop-down-nav">
		<dropDownNavigation v-show="$store.state.appDropDownNav.show"/>
	</transition>
	<appHeader :class="{'hidden': $store.state.appHeader.hide}"/>
	<div id="site-container">
		<navigation/>
		<Content class="content"/>
	</div>
	<modalViewport v-show="$store.state.appModals.showViewer"/>
</div>
</template>

<script>
import AppHeader from './components/Header'
import Navigation from './components/Navigation'
import DropDownNavigation from './components/DropDownNavigation'
import ModalViewport from './components/ModalViewport'

export default {
	name: 'Layout',
	components: {
		DropDownNavigation,
		Navigation,
		AppHeader,
		ModalViewport,
	},
}
</script>

<style lang="stylus">
@import 'styles/index'
@import 'styles/variables'
</style>
