<!-- TodoStatus.svelte -->

<script lang="ts">
	// import
	import type { TodoType } from "../types/todo.type";

	// export
	export let todos: TodoType[];

	$: totalTodos = todos.length;
	$: completedTodos = todos.filter((todo) => todo.completed).length;
	$: verbWord = completedTodos === 1 ? "is" : "are";

	let headingEl: HTMLElement;

	export function focus() {
		// shorter version: export const focus = () => headingEl.focus()
		headingEl.focus();
	}
</script>

<!-- the second heading -->
<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completedTodos} of {totalTodos} tasks {verbWord} done!
</h2>