<!-- App.svelte -->

<script lang="ts">
	// imports
	import Todos from './components/Todos.svelte'
	import Alert from './components/Alert.svelte'
	import { todos } from "./stores";
</script>

<Alert />
<!-- Binding the Todos -->
<Todos bind:todos={$todos} />