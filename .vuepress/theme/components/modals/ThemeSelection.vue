<template>
<div id="themes" class="modal">
	<header>
		<h2 class="title">Theme Seletion</h2>
		<materialIcon
			icon="close"
			class="close"
			@click.native="$store.commit('closeModal')"
		/>
	</header>
	<themeSelection/>
</div>
</template>

<script>
import ThemeSelection from '../ThemeSelection'
import MaterialIcon from '../MaterialIcon'

export default {
	name: 'ModalThemeSelection',
	components: {
		ThemeSelection,
		MaterialIcon,
	},
}
</script>
