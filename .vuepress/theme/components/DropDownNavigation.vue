<template>
<div class="drop-down-nav" ref="dropDownNav">
	<div class="content">
		<div id="options">
			<button
			v-for="option in dropDownNavOptions"
			:id="option.id"
			:class="{'current': isCurrentPanel(option.id)}"
			@click="currentPanel = option.id">
				<i class="material-icons">{{ option.icon }}</i>
			</button>
			<div :class="['slider', currentPanel]"/>
		</div>
		<div id="panel-slider">
			<transition name="panel-slider">
				<navigation key="navigation" v-if="isCurrentPanel('navigation')"/>
				<themeSelection
					key="theme-selection"
					v-if="isCurrentPanel('theme')"
					@changeTheme="changeTheme"
				/>
				<langSelection key="lang-selection" v-if="isCurrentPanel('lang')"/>
				<div key="search" class="search" v-if="isCurrentPanel('search')">
					<div class="result-item" v-for="item in 10" :key="item">
						<h3>Header</h3>
						<p>Ceteros ocurreret conclusionemque ex nam. Iusto vocent torquatos in vis, ei vix nulla prompta recusabo. Sed tincidunt persequeris eu, no quo semper liberavisse. Est id laudem aperiri repudiare. Iusto nobis iudico nec cu.</p>
					</div>
				</div>
			</transition>
		</div>
		<!-- <transition-group id="panel-slider" name="panel-slider" mode="out-in" tag="div">
		</transition-group> -->
	</div>
</div>
</template>

<script>
import Navigation from './Navigation'
import LangSelection from './LangSelection'
import ThemeSelection from './ThemeSelection'

export default {
	name: 'DropDownNavigation',
	props: {
		showDropdownNav: Boolean,
	},
	data() {
		return {
			dropDownNavOptions: [{
					id: 'navigation',
					icon: 'subject',
				},{
					id: 'theme',
					icon: 'brush',
				},{
					id: 'lang',
					icon: 'translate',
				},{
					id: 'search',
					icon: 'search',
			}],
			searchInput: '',
			currentPanel: 'navigation',
		}
	},
	components: {
		Navigation,
		LangSelection,
		ThemeSelection,
	},
	methods: {
		isCurrentPanel(panel) {
			return panel === this.currentPanel
		},
		changeTheme(theme) {
			this.$emit('changeTheme', theme)
		},
		closeOnWideScreen(event) {
			if (event.target.innerWidth > 768 && this.showDropdownNav) {
				this.$emit('toggleNav')
			}
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
.drop-down-nav
	position fixed
	height 100vh
	width 100vw
	z-index 1
	background-color var(--app-bg)
	transform translateY(0)
	#options
		position sticky
		position -webkit-sticky
		top 0
		display flex
		flex 1 1 100%
		flex-flow row nowrap
		outline none
		background-color var(--app-bg)
		z-index 10
		button
			position relative
			display flex
			padding 1rem
			flex 1 1 25%
			justify-content center
			align-content center
			align-items center
			background none
			outline none
			border none
			opacity .3
			cursor pointer
			&:hover:not(.current)
				opacity 1
			&.current
				opacity 1
				> *
					color var(--theme-primary)
			&:last-child
				margin-right none
		.slider
			position absolute
			bottom 0
			width 25%
			height .1rem
			background-color var(--theme-primary)
			&.navigation
				transform translateX(0)
			&.theme
				transform translateX(100%)
			&.lang
				transform translateX(200%)
			&.search
				transform translateX(300%)
	.search
		.result-item
			position relative
			padding 1rem
			margin-bottom 1rem
			&:last-child
				margin-bottom 0
			&:before
				content ''
				position absolute
				top 0
				left 0
				height 100%
				width 100%
				background-color var(--app-fg)
				opacity .1
			h3
				margin-top 0
	.panel-slider
		&-enter, &-leave-to
			transform translateX(-100%)
	#panel-slider
		position relative
		flex 1 1 100%
		> *
			position absolute
			padding 1.5rem
			width 100%
			top 0
			left 0
		#theme-selection, #language-selection
			display flex
			flex-flow row wrap
			justify-content flex-start
			align-content flex-start
			align-items flex-start
			button
				position relative
				display flex
				padding 1rem
				flex 1 1 100%
				justify-content flex-start
				align-content center
				align-items center
				background none
				outline none
				border none
				cursor pointer
				color var(--app-fg)
				&:not(:last-child):after
					content ''
					position absolute
					bottom 0
					left 0
					width 100%
					height 1px
					background-color var(--app-divider-color)
					opacity var(--app-divider-opacity)
				.color-preview
					height 1rem
					width @height
					margin-right 1rem
					border-radius @height
		#language-selection button
			display flex
			flex-flow row wrap
			justify-content flex-start
			align-content center
			align-items center
			text-align left
			> *
				flex 1 1 100%
			.in-lang-name
				font-size calc(var(--app-font-size) * 1.25)
			.english-name
				font-size calc(var(--app-font-size) * .75)
				opacity .35
	// 	#navigation
	// 	#theme-selection
	// 	#search
	> .content
		display flex
		height 100%
		width 100%
		padding-top 4.6rem
		flex-flow row wrap
		align-content flex-start
		align-items flex-start
		overflow auto
		> .nav-items
			padding 1rem 1rem 2rem 1rem
			.navigation #page-list
				padding-left 1rem
	&-enter, &-leave-to
		transform translateY(-100%)
</style>
