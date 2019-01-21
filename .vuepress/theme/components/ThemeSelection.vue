<template>
	<div id="theme-selection">
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
			<span class="name">{{ theme.name }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'ThemeSelection',
	data() {
		return {
			themes: [{
					name: 'White',
					id: 'white-theme',
					color: '#fff',
					outline: '#000',
				},{
					name: 'Black',
					id: 'black-theme',
					color: '#000',
					outline: '#fff',
			}],
		}
	},
}
</script>
