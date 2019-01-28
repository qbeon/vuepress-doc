<template>
	<div id="themes" class="list">
		<button
		v-for="(theme, themeId) in $store.state.themes"
		:key="theme.id"
		@click="$store.commit('changeTheme', themeId)"
		:themeId="themeId">
			<div
				class="color-preview"
				:style="{
					backgroundColor: theme.previewColor,
					boxShadow: '0 0 0 .1rem ' + theme.previewOutline,
				}"
			/>
			<div class="labels">
				<span class="label">{{ theme.label }}</span>
				<span class="description">{{ theme.description }}</span>
			</div>
		</button>
	</div>
</template>

<script>
export default {
	name: 'ThemeSelection',
}
</script>
