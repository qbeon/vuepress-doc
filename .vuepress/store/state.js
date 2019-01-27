import {locales as languages} from '../config'

export default {
	debug: false, // DEBUG --------


	languages,
	themes: {
		'default-white-theme': {
			label: 'White',
			description: 'This is a default daylight theme.',
			dark: false,
			previewColor: '#fff',
			previewOutline: '#000',
			primaryColor: '#05f',
			osTopBarColor: '#fff',
		},
		'default-black-theme': {
			label: 'Black',
			description: 'This is a default night time theme.',
			dark: true,
			previewColor: '#000',
			previewOutline: '#fff',
			primaryColor: '#05f',
			osTopBarColor: '#000',
		}
	},
	appLanguage: {
		lang: '',
		path: '',
	},
	appTheme: {
		id: '',
		primaryColor: '',
		osTopBarColor: '',
		dark: false,
	},
	appHeader: {
		hide: false,
	},
	appDropDownNav: {
		show: false,
	},
	appModals: {
		showViewer: false,
		currentModal: '',
	},
}
