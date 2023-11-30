<!-- components/MoreActions.svelte -->

<script lang="ts">
	// imports
	import { createEventDispatcher } from 'svelte';
	import type { TodoType } from "../types/todo.type";

	// exports
	export let todos: TodoType[];

	const dispatch = createEventDispatcher();

	let completed = true;

	const checkAll = () => {
		dispatch('checkAll', completed);
		completed = !completed;
	}

	const removeCompleted = () => dispatch('removeCompleted');

	// declaring completedTodos as a number
	let completedTodos: number;
	
	$: completedTodos = todos.filter((t: TodoType) => t.completed).length;
</script>

<!-- the buttons at the bottom of the app -->
<div class="btn-group">
	<!-- the check/uncheck all button -->
	<button type="button" class="btn btn__primary"
		disabled={todos.length === 0} on:click={checkAll}>{completed ? 'Check' : 'Uncheck'} all</button>
	<!-- the delete checked button -->
	<button type="button" class="btn btn__danger"
		disabled={completedTodos === 0} on:click={removeCompleted}>Delete checked</button>
</div>