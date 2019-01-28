<template>
<div
ref="dropDownNav"
:class="[
	'drop-down-nav',
	{'collapsed': !$store.state.appDropDownNav.show},
	{'expanded': $store.state.appHeader.hide},
]">
	<div class="content" @scroll="onContentScrolled">
		<div class="header" :contentScrolled="isContentScrolled">
			<div v-show="!$store.state.appSearch.show" class="options">
				<button
				v-for="option in dropDownNavOptions"
				:key="option.id"
				@click="$store.commit('changeDropDownNavPanel', option.id)"
				:class="[
					option.id,
					{ 'current': isCurrentPanel(option.id) },
				]">
					<materialIcon :icon="option.icon"/>
				</button>
				<button @click="toggleSearch()">
					<materialIcon icon="search"/>
				</button>
				<div :class="[
					'slider',
					$store.state.appDropDownNav.currentPanel,
				]"/>
			</div>
			<div v-show="$store.state.appSearch.show" class="search-input">
				<input
					type="text"
					placeholder="Search me"
					:value="$store.state.appSearch.input"
					@input="(event) => {
						$store.commit('searchInput', event.target.value)
					}"
				/>
				<button class="close" @click="toggleSearch()">
					<materialIcon icon="close"/>
				</button>
			</div>
		</div>
		<div class="panel-slider">
			<transition name="panel-slider">
				<navigation v-show="
					isCurrentPanel('navigation') &&
					!$store.state.appSearch.show"
				/>
			</transition>
			<transition name="panel-slider">
				<themeSelection v-show="
					isCurrentPanel('themes') &&
					!$store.state.appSearch.show"
				/>
			</transition>
			<transition name="panel-slider">
				<langSelection v-show="
					isCurrentPanel('languages') &&
					!$store.state.appSearch.show"
				/>
			</transition>
			<transition name="panel-search">
				<div
				v-show="$store.state.appSearch.show"
				key="search"
				class="search">
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
				id: 'themes',
				icon: 'brush',
			},{
				id: 'languages',
				icon: 'translate',
			}],
			isContentScrolled: false,
		}
	},
	methods: {
		isCurrentPanel(panel) {
			return panel === this.$store.state.appDropDownNav.currentPanel
		},
		closeOnWideScreen(event) {
			if (
				this.$store.state.appDropDownNav.show &&
				event.target.innerWidth > 768
			) {
				this.$store.commit('toggleDropDownNav')
				if (this.$store.state.appSearch.show) this.toggleSearch()
			}
		},
		toggleSearch() {
			this.$store.commit('toggleHeader')
			this.$store.commit('toggleSearch')
		},
		onContentScrolled(event) {
			if (event.target.scrollTop > 0) {
				this.isContentScrolled = true
			} else {
				this.isContentScrolled = false
			}
		},
	},
	created() {
		// Set panel as default to navigation
		this.$store.commit(
			'changeDropDownNavPanel',
			'navigation',
		)
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
		&[contentScrolled]
			box-shadow 0 6px 40px rgba(#000, .1)
			.search-input > *
				padding 1rem
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
			&.themes
				transform translateX(100%)
			&.languages
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
		#themes .labels
			display flex
			flex-flow row wrap
			justify-content flex-start
			align-content center
			align-items center
			> *
				flex 1 1 100%
				text-align left
			.description
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
