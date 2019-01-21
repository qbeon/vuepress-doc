<template>
	<div id="language-selection">
		<button
		v-for="lang in sortedLangList"
		:key="lang.name">
			<span class="in-lang-name">{{ lang.name }}</span>
			<span class="english-name">{{ lang.englishName }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'LanguageSelection',
	data() {
		return {
			languages: [{
					name: 'English',
					englishName: 'English',
				},{
					name: 'Русский',
					englishName: 'Russian',
				},{
					name: 'Deutsch',
					englishName: 'German',
				},{
					name: '日本人',
					englishName: 'Japanies',
				},{
					name: '中文',
					englishName: 'Chinese',
				},{
					name: 'Svenska',
					englishName: 'Swedish',
				},{
					name: 'ไทย',
					englishName: 'Thai',
				},{
					name: 'Čeština',
					englishName: 'Czech',
				},{
					name: 'Italiano',
					englishName: 'Italian',
				},{
					name: 'Español',
					englishName: 'Spanish',
				},{
					name: 'Ελληνικά',
					englishName: 'Greek',
				},{
					name: 'हिंदी',
					englishName: 'Hindi',
				},{
					name: '한국어',
					englishName: 'Korean',
				},{
					name: 'Hrvatski',
					englishName: 'Croatian',
				},{
					name: 'Polskie',
					englishName: 'Polish',
				},{
					name: 'Українська',
					englishName: 'Ukrainian',
				},{
					name: 'Türk',
					englishName: 'Turkish',
				},{
					name: 'Français',
					englishName: 'French',
				},{
					name: 'عربى',
					englishName: 'Arabic',
			}],
		}
	},
	computed: {
		sortedLangList() {
			// Sort alphabetically
			return this.languages.sort((a, b) => {
				let titleA = a.name.toLowerCase()
				let titleB = b.name.toLowerCase()

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
