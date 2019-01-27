export default {
	toggleDebug(state) { // DEBUG --------
		if (state.debug) {
			document.documentElement.classList.remove('debug', 'boundaries')
		} else {
			document.documentElement.classList.add('debug', 'boundaries')
		}
		state.debug = !state.debug
	},


	changeLanguage(state, language) {
		console.log('Change language', language)
	},
	changeTheme(state, changeTo) {
		if (state.appTheme.id != '' && changeTo != state.appTheme.id) {
			document.documentElement.classList.remove(state.appTheme.id)
		}
		document.documentElement.classList.add(changeTo)

		state.appTheme.id = changeTo
		state.appTheme.primaryColor = state.themes[changeTo].primaryColor
		state.appTheme.osTopBarColor = state.themes[changeTo].osTopBarColor
		state.appTheme.dark = state.themes[changeTo].dark
	},
	toggleHeader(state, bool) {
		if (bool != undefined) state.appHeader.hide = bool
		else state.appHeader.hide = !state.appHeader.hide
	},
	toggleDropDownNav(state, bool) {
		// Lock when drop down nav is open
		if (state.appDropDownNav.show) {
			document.documentElement.classList.remove('lock-scroll')
		} else {
			document.documentElement.classList.add('lock-scroll')
		}

		if (bool != undefined) state.appDropDownNav = bool
		else state.appDropDownNav.show = !state.appDropDownNav.show
	},
}
