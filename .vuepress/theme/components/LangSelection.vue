<template>
	<div id="languages">
		<button
		v-for="(lang, idx) in sortedLangList"
		:key="lang.label"
		@click="$store.commit('changeLanguage', lang)"
		:class="{'current': $store.state.appLanguage.lang === lang.lang}">
			<!-- $route.fullPath.slice(0, 4) == lang.path -->
			<i class="material-icons icon">check</i>
			<span class="in-lang-label">{{ lang.label }}</span>
			<span class="english-label">{{ lang.englishLabel }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'LanguageSelection',
	computed: {
		sortedLangList() {
			// Sort alphabetically
			return Object.values(this.$store.state.languages).sort((a, b) => {
				let titleA = a.label.toLowerCase()
				let titleB = b.label.toLowerCase()

				if (titleA < titleB) return -1
				if (titleA > titleB) return 1

				return 0
			})
		},
	},
}
</script>

<style lang="stylus">

</style>
