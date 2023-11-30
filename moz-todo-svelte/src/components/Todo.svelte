<!-- components/Todo.svelte -->

<script lang="ts">
	// imports
	import { createEventDispatcher } from "svelte";
	import { selectOnFocus } from "../actions";
	import type { TodoType } from "../types/todo.type";

	// export
	export let todo: TodoType;

	const dispatch = createEventDispatcher();

	let editing = false; // track editing mode
	let name = todo.name; // hold the name of the to-do being edited
	let nameEl; // reference to the name input DOM node
	let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save

	function update(updatedTodo: Partial<TodoType>) {
		todo = { ...todo, ...updatedTodo }; // applies modifications to todo
		dispatch("update", todo); // emit update event
	}

	function onCancel() {
		name = todo.name; // restores name to its initial value and
		editing = false; // and exit editing mode
	}

	function onSave() {
		update({ name }); // updates todo name
		editing = false; // and exit editing mode
	}

	function onRemove() {
		dispatch("remove", todo); // emit remove event
	}

	function onEdit() {
		editButtonPressed = true; // user pressed the Edit button, focus will come back to the Edit button
		editing = true; // enter editing mode
	}
	
	const focusEditButton = (node: HTMLElement) => editButtonPressed && node.focus();

	function onToggle() {
		update({ completed: !todo.completed }); // updates todo status
	}

	const focusOnInit = (node: HTMLElement) =>
	node && typeof node.focus === "function" && node.focus();
</script>

<div class="stack-small">
	<!-- if a to-do item is being edited -->
	{#if editing}
		<!-- markup for editing todo: label, input text, Cancel and Save Button -->
		<form on:submit|preventDefault={onSave} class="stack-small" on:keydown={(e) => e.key === 'Escape' && onCancel()}>
			<div class="form-group">
				<!-- edit form's label -->
				<label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
				<!-- edit form's input -->
				<input
					bind:value={name}
					bind:this={nameEl}
					use:selectOnFocus
					use:focusOnInit
					type="text"
					placeholder="Enter a new name..."
					id="todo-{todo.id}"
					autocomplete="off"
					class="todo-text" />
			</div>
			<!-- edit form's buttons -->
			<div class="btn-group edit-options">
				<!-- the cancel button -->
				<button class="btn btn__primary todo-cancel" on:click={onCancel} type="button">
					Cancel<span class="visually-hidden">renaming {todo.name}</span>
				</button>
				<!-- the save button -->
				<button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
					Save<span class="visually-hidden">new name for {todo.name}</span>
				</button>
			</div>
		</form>
	<!-- if a to-do item is not being edited -->
	{:else}
		<!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
		<div class="c-cb">
			<!-- checkbox input -->
			<input type="checkbox" id="todo-{todo.id}"
				on:click={onToggle} checked={todo.completed}>
			<!-- to-do's label -->
			<label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
		</div>
		<!-- to-do item's buttons -->
		<div class="btn-options">
			<!-- the edit button -->
			<button type="button" class="btn btn__edit" on:click={onEdit} use:focusEditButton>
				<i class="fa-sharp fa-solid fa-pencil fa-lg" aria-hidden="true"></i><span class="visually-hidden"> {todo.name}</span>
			</button>
			<!-- the delete button -->
			<button type="button" class="btn btn__danger" on:click={onRemove}>
				<i class="fa-sharp fa-solid fa-trash fa-lg"></i><span class="visually-hidden"> {todo.name}</span>
			</button>
		</div>
	{/if}
</div>