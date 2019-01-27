import Vuex from 'vuex'
import state from './store/state.js'
import mutations from './store/mutations.js'

export default ({Vue, options, router, siteData}) => {
	Vue.use(Vuex)

	Vue.mixin({
		store: new Vuex.Store({
			state,
			mutations,
		})
	})
}