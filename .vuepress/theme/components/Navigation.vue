<template>
<div id="navigation">
	<ul id="page-list">
		<li
		:class="[
			'page',
			{'selected': $route.path == page.path},
		]"
		v-for="(page, pageIdx) in sortedPages">
			<router-link :to="page.path" class="title">
				{{ page.title }}
			</router-link>
			<ul v-if="$route.path == page.path" class="page-list-items">
				<li
				v-for="(header, itemIdx) in page.headers"
				:class="{
					'second-level': header.level == 2,
					'third-level': header.level == 3,
				}">
					<router-link :to="`${page.path}#${header.slug}`">
						{{ header.title }}
					</router-link>
				</li>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'Navigation',
	computed: {
		sortedPages() {
			let filteredList = []
			this.$site.pages.forEach(page => {
				if (this.isForCurrentLanguage(page.path)) {
					filteredList.push(page)
				}
			});
			// Sort alphabetically
			return filteredList.sort((a, b) => {
				let titleA = a.title.toLowerCase()
				let titleB = b.title.toLowerCase()

				if (titleA < titleB) return -1
				if (titleA > titleB) return 1

				return 0
			})
		},
	},
	methods: {
		isForCurrentLanguage(path) {
			return this.$page.path.slice(0,4) == path.slice(0,4)
		},
	},
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

#navigation
	flex 1 1 auto
	h1
		margin 0 0 1rem 0
		font-size 1rem
		text-transform uppercase
		font-family 'LatoWebBlack'
	ul
		display flex
		margin 0
		padding 0
		flex 1 1 100%
		flex-flow row wrap
		list-style-type none
		li
			position relative
			display flex
			flex-flow row wrap
			flex 1 1 100%
			&:before
				content ''
				position absolute
				top .75rem
				left -2rem
				height 2px
				width 1rem
				flex 0 0 auto
				opacity 0
				transform translateX(-1rem)
			b
				margin-right .5rem
				font-weight normal
				opacity .4
				color inherit
		.page
			flex 1 1 100%
			margin-top 1rem
			&-list-items
				margin-top .5rem
			&:first-child
				margin-top 0
			transition var(--default-transition)
			a
				display flex
				flex 1 1 auto
				transition var(--default-transition)
				color var(--app-fg)
				&:hover
					color var(--theme-primary)
			&.selected
				color var(--theme-primary)
				cursor default
				&:before
					opacity 1
					background-color var(--theme-primary)
					transform translateX(0)
				& > a, .router-link-exact-active
					font-weight 700
					color var(--theme-primary)
					cursor default
					b
						opacity 1
			.title
				font-size calc(var(--app-font-size) * 1.25)
				line-height var(--app-line-height)
		.second-level, .third-level
			margin-top .5rem
		.second-level
			margin-left 2rem
		.third-level
			margin-left 4rem
</style>
