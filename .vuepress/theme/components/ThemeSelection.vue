<template>
	<div id="themes">
		<button
		v-for="theme in themes"
		:key="theme.id"
		@click="$emit('changeTheme', theme.id)">
			<div
				:style="{
					backgroundColor: theme.color,
					boxShadow: '0 0 0 .1rem ' + theme.outline,
				}"
				class="color-preview"
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
	data() {
		return {
			themes: [{
					label: 'White',
					id: 'white-theme',
					color: '#fff',
					outline: '#000',
					description: 'This is a theme for the daylight.',
				},{
					label: 'Black',
					id: 'black-theme',
					color: '#000',
					outline: '#fff',
					description: 'This is a theme for the night time.',
			}],
		}
	},
}
</script>
