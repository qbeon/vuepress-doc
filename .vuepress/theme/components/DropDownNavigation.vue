<template>
<div class="drop-down-nav" ref="dropDownNav">
	<div class="content" @scroll="headerShadowOnScroll">
		<div class="header" :contentScrolled="isContentScrolled">
			<div v-show="!search.state" class="options">
				<button
				v-for="option in dropDownNavOptions"
				:key="option.id"
				@click="changePanel(option)"
				:class="[
					option.id,
					{'current': isCurrentPanel(option.id)},
				]">
					<materialIcon :icon="option.icon"/>
				</button>
				<button @click="toggleSearch()">
					<materialIcon icon="search"/>
				</button>
				<div :class="['slider', currentPanel]"/>
			</div>
			<div v-show="search.state" class="search-input">
				<input
					type="text"
					v-model="search.input"
					placeholder="Search me"
				/>
				<button class="close" @click="toggleSearch()">
					<materialIcon icon="close"/>
				</button>
			</div>
		</div>
		<div class="panel-slider">
			<transition name="panel-slider">
				<navigation
					v-if="isCurrentPanel('navigation') && !search.state"
					key="navigation"
				/>
				<themeSelection
					v-if="isCurrentPanel('theme') && !search.state"
					key="themes"
					@changeTheme="changeTheme"
				/>
				<langSelection
					v-if="isCurrentPanel('lang') && !search.state"
					key="languages"
				/>
			</transition>
			<transition name="panel-search">
				<div v-if="search.state" key="search" class="search">
					<div class="result-item" v-for="item in 10" :key="item">
						<h3>Header</h3>
						<p>Ceteros ocurreret conclusionemque ex nam. Iusto vocent torquatos in vis, ei vix nulla prompta recusabo. Sed tincidunt persequeris eu, no quo semper liberavisse. Est id laudem aperiri repudiare. Iusto nobis iudico nec cu.</p>
					</div>
				</div>
			</transition>
		</div>
	</div>
</div>
</template>

<script>
import Navigation from './Navigation'
import LangSelection from './LangSelection'
import ThemeSelection from './ThemeSelection'
import MaterialIcon from './MaterialIcon'

export default {
	name: 'DropDownNavigation',
	props: {
		showDropdownNav: Boolean,
	},
	components: {
		Navigation,
		LangSelection,
		ThemeSelection,
		MaterialIcon,
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
			}],
			search: {
				input: '',
				state: false,
			},
			currentPanel: 'navigation',
			isContentScrolled: false,
		}
	},
	methods: {
		changePanel(option) {
			this.currentPanel = option.id
		},
		isCurrentPanel(panel) {
			return panel === this.currentPanel
		},
		changeTheme(theme) {
			this.$emit('changeTheme', theme)
		},
		closeOnWideScreen(event) {
			if (event.target.innerWidth > 768 && this.showDropdownNav) {
				this.$emit('toggleNav')
				if (this.search.state) this.toggleSearch()
			}
		},
		toggleSearch() {
			this.search.state = !this.search.state
		},
		headerShadowOnScroll(event) {
			if (event.target.scrollTop > 0) this.isContentScrolled = true
			else this.isContentScrolled = false
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
	.content
		display flex
		height 100%
		width 100%
		padding-top 4.6rem
		flex-flow row wrap
		align-content flex-start
		align-items flex-start
		overflow auto
	&[contentScrolled]
			box-shadow 0 6px 40px rgba(#000, .1)
			.search-input > *
				padding 1rem
		.options
			display flex
			flex-flow row nowrap
			flex 1 1 100%
	.header
		position sticky
		position -webkit-sticky
		top 0
		display flex
		flex 1 1 100%
		flex-flow row nowrap
		outline none
		background-color var(--app-bg)
		box-shadow 0 0 0 transparent
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
			&:last-child
				margin-right none
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
		.search-input
			position relative
			display flex
			flex 1 1 100%
			flex-flow row nowrap
			> *
				padding 2rem
			input
				padding-right 0
				flex 1 1 100%
				outline none
				border none
				background none
				color var(--app-fg)
			.close
				flex 0 0 auto
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
		position relative
		flex 1 1 100%
		&-enter, &-leave-to
			transform translateX(-100%)
		> *
			position absolute
			padding 1.5rem
			width 100%
			top 0
			left 0
		#themes, #languages
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
		#languages button
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
		#navigation
			.page
				margin-bottom 1rem
	.panel-search
		&-enter, &-leave-to
			opacity 0
			transform translateY(10%)
	&.expanded > .content
		padding-top 0
	&-enter, &-leave-to
		transform translateY(-100%)
</style>
