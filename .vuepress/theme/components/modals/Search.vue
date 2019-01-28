<template>
<div id="search" class="modal">
	<header :class="{'shadow-on-scroll': isModalScrolled}">
		<input
			class="search"
			type="text"
			placeholder="Search me!"
			:value="$store.state.appSearch.input"
			@input="event => {
				$store.commit('searchInput', event.target.value)
			}"
		/>
		<materialIcon
			icon="close"
			class="close"
			@click.native="$store.commit('closeModal')"
		/>
	</header>
	<div class="search-result">
		<transition-group name="search-result">
			<div
			v-for="item in 10"
			:key="item"
			v-show="$store.state.appSearch.input.length > 0"
			class="search-result-item">
				<h3>Header</h3>
				<p>Ceteros ocurreret conclusionemque ex nam. Iusto vocent torquatos in vis, ei vix nulla prompta recusabo. Sed tincidunt persequeris eu, no quo semper liberavisse. Est id laudem aperiri repudiare. Iusto nobis iudico nec cu.</p>
			</div>
		</transition-group>
	</div>
</div>
</template>

<script>
import MaterialIcon from '../MaterialIcon'

export default {
	name: 'ModalSearch',
	props: {
		'isModalScrolled': Boolean,
	},
	components: {
		MaterialIcon,
	},
}
</script>
