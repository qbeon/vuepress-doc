<template>
	<div id="languages">
		<button
		v-for="(lang,idx) in sortedLangList"
		:key="lang.label"
		@click="$emit('changeLanguage', lang)"
		:class="{'current': currentLang === lang.lang}">
			<!-- $route.fullPath.slice(0, 4) == lang.path -->
			<i class="material-icons icon">check</i>
			<span class="in-lang-label">{{ lang.label }}</span>
			<span class="english-label">{{ lang.englishLabel }}</span>
		</button>
	</div>
</template>

<script>
import LanguageList from '../../config'

export default {
	name: 'LanguageSelection',
	props: {
		'currentLang': String,
	},
	data() {
		return {
			languageList: LanguageList.locales,
		}
	},
	computed: {
		sortedLangList() {
			// Sort alphabetically
			return Object.values(this.languageList).sort((a, b) => {
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
