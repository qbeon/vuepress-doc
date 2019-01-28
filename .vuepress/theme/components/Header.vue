<template>
<header :contentScrolled="onContentScrolled">
	<img id="logo" :src="$store.state.appTheme.dark ? logoLight : logoDark">
	<div id="navigator" @click="$store.commit('toggleDropDownNav')">
		<span class="title">{{ $page.title }}</span>
		<span class="section">{{ 'text' }}</span>
	</div>
	<div id="options">
		<button
		v-for="option in headerOptions"
		:key="option.id"
		:id="option.id"
		@click="$store.commit('openModal', option.id)">
			<materialIcon :icon="option.icon"/>
		</button>
	</div>
</header>
</template>

<script>
import LogoDark from '../assets/images/logoDark.svg'
import LogoLight from '../assets/images/logoLight.svg'
import MaterialIcon from '../components/MaterialIcon'

export default {
	name: 'Header',
	components: {
		MaterialIcon,
	},
	data() {
		return {
			logoDark: LogoDark,
			logoLight: LogoLight,
			isContentScrolled: false,
			headerOptions: [{
				id: 'themes',
				icon: 'brush',
			},{
				id: 'languages',
				icon: 'translate',
			},{
				id: 'search',
				icon: 'search',
			}],
		}
	},
	computed: {
		onContentScrolled() {
			return this.contentScroll && !this.$store.state.appDropDownNav.show
		},
	},
	methods: {
		headerShadowOnScroll(event) {
			if (event.target.scrollingElement.scrollTop > 0) {
				this.isContentScrolled = true
			}
			else this.isContentScrolled = false
		},
	},
	mounted() {
		window.addEventListener('scroll', this.headerShadowOnScroll)
	},
	destroyed() {
		window.removeEventListener('scroll', this.headerShadowOnScroll)
	},
}
</script>

<style lang="stylus" scoped>
header
	display flex
	margin auto
	padding 2rem 1rem
	flex 1 1 100%
	align-items center
	justify-content space-between
	background-color var(--app-bg)
	z-index 2
	&.hidden
		transform translateY(-100%)
	#logo
		height 2.5rem
		flex 0 0 auto
	#navigator
		display flex
		margin-left 1.5rem
		flex-flow row wrap
		flex 1 1 auto
		border-radius 3px
		cursor pointer
		user-select none
		> *
			flex 1 1 100%
		.title
			font-weight 600
		.section
			opacity .5
			font-size .75em
	#options
		display flex
		margin-left auto
		flex-flow row nowrap
		flex 0 0 auto
		button
			display flex
			padding .5rem
			margin-left .5rem
			justify-content center
			align-content center
			align-items center
			background none
			outline none
			border none
			cursor pointer
			user-select none
			opacity .25
			&:hover
				opacity 1
			&:active
				opacity 1
				> *
					color var(--theme-primary)

@media screen and (max-width 768px)
	header
		position sticky
		position -webkit-sticky
		top 0
		padding 1rem
		&[contentScrolled]
			padding .5rem 1rem
			box-shadow 0 6px 40px rgba(#000, .1)
			#logo
				height 2rem
			#navigator
				margin-left 1rem
		#options
			display none

@media screen and (min-width 768px)
	header #navigator
		display none
</style>
