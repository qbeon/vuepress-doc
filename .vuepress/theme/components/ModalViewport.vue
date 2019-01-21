<template>
<div id="modal-viewport">
	<div class="background" @click="tescht = !tescht"/>
	<transition name="modal">
		<languageSelection v-show="true"/>
	</transition>
	<transition name="modal">
		<themeSelection v-show="true"/>
	</transition>
	<transition name="modal">
		<search v-show="true"/>
	</transition>
</div>
</template>

<script>
import LanguageSelection from './modals/LanguageSeletion'
import ThemeSelection from './modals/ThemeSelection'
import Search from './modals/Search'

export default {
	name: 'ModalViewport',
	components: {
		LanguageSelection,
		ThemeSelection,
		Search,
	},
	data() {
		return {
			tescht: false,
		}
	},
}
</script>

<style lang="stylus" scoped>
#modal-viewport
	position fixed
	top 0
	left 0
	display flex
	height 100%
	width 100%
	padding: 4rem
	flex-flow: row wrap
	justify-content: center
	align-content: flex-start
	align-items: flex-start
	overflow-y: auto
	z-index: 50
	.background
		position fixed
		top 0
		left 0
		height 100%
		width 100%
		background-color var(--modal-background-color)
	.modal
		position relative
		display flex
		margin auto
		flex 0 1 auto
		flex-flow column wrap
		border-radius 4px
		background-color var(--app-bg)
		box-shadow:
			0 0 1px rgba(#000, .1),
			0 5px 40px rgba(#000, .1)
		// &-enter-active, &-leave-active
		&-enter, &-leave-to
			transform translateY(100%)
			opacity 0
#test-modal
	padding 2rem
</style>
