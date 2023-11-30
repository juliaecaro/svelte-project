<!-- components/NewTodo.svelte -->

<script lang="ts">
	// imports
	import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
	import { selectOnFocus } from "../actions";

	const dispatch = createEventDispatcher();

	export let autofocus: boolean = false;

	let name = '';
	let nameEl: HTMLElement; // reference to the name input DOM node

	const addTodo = () => {
		dispatch('addTodo', name);
		name = '';
		nameEl.focus(); // give focus to the name input
	}

	const onCancel = () => {
		name = '';
		nameEl.focus(); // give focus to the name input
	}

	onMount(() => autofocus && nameEl.focus()); // if autofocus is true, we run nameEl.focus()
</script>

<form on:submit|preventDefault={addTodo} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
	<!-- the title -->
	<h1 class="label-wrapper">
		<!-- the label -->
		<label for="todo-0" class="label__lg">What needs to be done?</label>
	</h1>
	<!-- the top input -->
	<div class="new-input">
		<input
			bind:value={name}
			bind:this={nameEl}
			use:selectOnFocus
			type="text"
			id="todo-0"
			autocomplete="off"
			placeholder="Type here..."
			class="input input__lg" />
		<button type="submit" disabled={!name} class="btn btn__primary btn__lg">
			<i class="fa-sharp fa-solid fa-plus fa-lg"></i>
		</button>
	</div>
</form>