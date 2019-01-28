<template>
<div
id="modal-viewport"
@scroll="onModalScrolled"
:class="{
	'active': $store.state.appModals.showViewer,
}">
	<transition name="background">
		<div
			v-show="$store.state.appModals.showViewer"
			class="background"
			@click="$store.commit('closeModal')"
		/>
	</transition>
	<transition name="modal">
		<languageSelection
			v-show="$store.state.appModals.current === 'languages'"
		/>
	</transition>
	<transition name="modal">
		<themeSelection
			v-show="$store.state.appModals.current === 'themes'"
		/>
	</transition>
	<transition name="modal">
		<search
			v-show="$store.state.appModals.current === 'search'"
			:isModalScrolled="isModalScrolled"
		/>
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
			isModalScrolled: false,
		}
	},
	methods: {
		closeOnWideScreen(event) {
			if (
				this.$store.state.appModals.showViewer &&
				event.target.innerWidth < 768
			) {
				this.$store.commit('toggleDropDownNav', true)
				this.$store.commit(
					'changeDropDownNavPanel',
					this.$store.state.appModals.current,
				)
				if (this.$store.state.appDropDownNav.currentPanel === 'search') {
					this.$store.commit(
						'changeDropDownNavPanel',
						'navigation',
					)
					this.$store.commit('toggleSearch')
					this.$store.commit('toggleHeader')
				}
				this.$store.commit('closeModal')
			}
		},
		onModalScrolled(event) {
			this.isModalScrolled = event.target.scrollTop > 70
		},
	},
	mounted() {
		window.addEventListener('resize', this.closeOnWideScreen)
	},
	destroyed() {
		window.removeEventListener('resize', this.closeOnWideScreen)
	},
}
</script>

<style lang="stylus">
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
	pointer-events none
	overflow-y: auto
	z-index: 50
	&.active
		pointer-events all
	.background
		position fixed
		top 0
		left 0
		height 100%
		width 100%
		background-color var(--modal-background-color)
		&-enter, &-leave-to
			opacity 0

.modal
	position relative
	display flex
	width 400px
	max-width 400px
	margin auto
	flex 0 1 auto
	flex-flow column wrap
	border-radius 4px
	background-color var(--app-bg)
	box-shadow var(--modal-shadow)
	&-enter, &-leave-to
		transform translateY(50%)
		opacity 0
	.list
		padding 1rem
		flex 1 1 100%
	header
		display flex
		padding 1rem
		flex-flow row nowrap
		align-content center
		align-items center
		&.shadow-on-scroll
			box-shadow 0 10px 20px -10px rgba(#000, .1)
		.title
			margin 1rem
			flex: 1 1 auto
		.close
			padding 1rem
			flex 0 0 auto
			background none
			border none
			outline none
			opacity .25
			cursor pointer
			&:hover
				opacity 1
			&:active
				opacity 1
				color var(--theme-primary)
	&#search
		header
			position sticky
			position -webkit-sticky
			top -4rem
			margin .2rem 0
			padding 0
			background-color var(--app-bg)
		.search
			padding 1.5rem
			flex 1 1 100%
			border none
			outline none
			background none
			&-result
				&-enter, &-leave-to
					opacity 0
				&-leave-active
					position absolute
				&-item
					margin 1rem
					padding 1rem
					transform-origin top
					background-color rgba(#000, .1)
					h3
						margin-top 0

@media screen and (max-width 768px)
	#modal-viewport
		padding 1rem
</style>
