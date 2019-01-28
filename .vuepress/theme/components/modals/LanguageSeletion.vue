<template>
<div id="languages" class="modal">
	<header>
		<h2 class="title">Language Seletion</h2>
		<materialIcon
			icon="close"
			class="close"
			@click.native="$store.commit('closeModal')"
		/>
	</header>
	<languageSelection/>
</div>
</template>

<script>
import LanguageSelection from '../LangSelection'
import MaterialIcon from '../MaterialIcon'

export default {
	name: 'ModalLanguageSelection',
	components: {
		LanguageSelection,
		MaterialIcon,
	},
}
</script>
