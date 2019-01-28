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
	changeDropDownNavPanel(state, panel) {
		state.appDropDownNav.currentPanel = panel
	}, 

	toggleHeader(state, bool) {
		if (bool != undefined) state.appHeader.hide = bool
		else state.appHeader.hide = !state.appHeader.hide
	},
	toggleDropDownNav(state, bool) {
		if (bool != undefined) {
			state.appDropDownNav.show = bool
			this.commit('toggleAppScroll', bool)
		} else {
			state.appDropDownNav.show = !state.appDropDownNav.show
			this.commit(
				'toggleAppScroll',
				state.appDropDownNav.show,
			)
		}
	},
	toggleAppScroll(state, bool) {
		let lockScroll = () => document.documentElement.classList.add('lock-scroll')
		let enlockScroll = () => document.documentElement.classList.remove('lock-scroll')

		if (bool != undefined) {
			if (bool) lockScroll()
			else enlockScroll()
			state.appScrollLock = bool
		}
		else if (state.appScrollLock) enlockScroll()
		else lockScroll()
		state.appScrollLock = !state.appScrollLock
	},
	toggleSearch(state, bool) {
		if (bool != undefined) state.appSearch.show = bool
		else state.appSearch.show = !state.appSearch.show
	},

	openModal(state, modalId) {
		this.commit('toggleAppScroll', true)
		state.appModals.showViewer = true
		state.appModals.current = modalId
	},
	closeModal(state, modalId) {
		if (modalId === 'search') this.commit('closeSearch')
		this.commit('toggleAppScroll', false)
		state.appModals.showViewer = false
		state.appModals.current = ''
	},

	searchInput(state, input) {
		state.appSearch.input = input
	},
}
