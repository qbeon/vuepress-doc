<template>
<header>
	<img id="logo" :src="theme == 'black-theme' ? logoLight : logoDark">
	<div id="navigator" @click="$emit('toggleNav')">
		<span class="title">1. {{ $page.title }}</span>
		<span class="section">1.1. Relations > Unidirectional Relations</span>
	</div>
	<div id="options">
		<button id="change-theme">
			<i class="material-icons">brush</i>
		</button>
		<button id="change-language">
			<i class="material-icons">translate</i>
		</button>
		<button id="search">
			<i class="material-icons">search</i>
		</button>
	</div>
</header>
</template>

<script>
import LogoDark from '../assets/images/logoDark.svg'
import LogoLight from '../assets/images/logoLight.svg'

export default {
	name: 'Header',
	props: {
		'theme': String,
	},
	data() {
		return {
			logoDark: LogoDark,
			logoLight: LogoLight,
		}
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
	#logo
		height 2.5rem
		width 2.5rem
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
		#options
			display none

@media screen and (min-width 768px)
	header #navigator
		display none
</style>
