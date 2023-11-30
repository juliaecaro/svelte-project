<!-- components/Todos.svelte -->

<script lang="ts">
	// imports
	import FilterButton from "./FilterButton.svelte";
	import Todo from "./Todo.svelte";
	import MoreActions from "./MoreActions.svelte";
	import NewTodo from "./NewTodo.svelte";
	import TodosStatus from "./TodosStatus.svelte";
	import { alert } from "../stores";
	import { Filter } from "../types/filter.enum";
	import type { TodoType } from "../types/todo.type";

	// exports
	export let todos: TodoType[] = [];

	let todosStatus: TodosStatus; // reference to TodosStatus instance

	$: newTodoId =
		todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

	// addTodo function
	function addTodo(name: string) {
		todos = [...todos, { id: newTodoId, name, completed: false }];
		$alert = `${name} has been added!`; // alert
	}

	// removeTodo function
	function removeTodo(todo: TodoType) {
		todos = todos.filter((t) => t.id !== todo.id);
		todosStatus.focus(); // give focus to status heading
		$alert = `${todo.name} has been deleted!`; // alert
	}

	// update Todo function
	function updateTodo(todo: TodoType) {
		const i = todos.findIndex((t) => t.id === todo.id);
		if (todos[i].name !== todo.name) // if the to-do's name doesn't equal the original name
			$alert = `"${todos[i].name}" has been renamed to: ${todo.name}!`; // the todo has been renamed
		if (todos[i].completed !== todo.completed) // if the to-do's toggle state doesn't equal the original toggle state
			$alert = `${todos[i].name} is now ${
				todo.completed ? "checked" : "unchecked" // the to-do is now checked/unchecked
			}!`;
		todos[i] = { ...todos[i], ...todo };
	}

	let filter: Filter = Filter.ALL;
	
	const filterTodos = (filter: Filter, todos: TodoType[]) =>
		filter === Filter.ACTIVE // filtering Active to-dos
			? todos.filter((t) => !t.completed)
			: filter === Filter.COMPLETED // filtering Completed to-dos
			? todos.filter((t) => t.completed)
			: todos;

	$: {
		if (filter === Filter.ALL) { // if the All filter button is selected
			$alert = "Viewing all tasks..."; // the alert
		} else if (filter === Filter.ACTIVE) { // if the Active filter button is selected
			$alert = "Viewing unchecked tasks..."; // the alert
		} else if (filter === Filter.COMPLETED) { // if the Completed filter button is selected
			$alert = "Viewing checked tasks..."; // the alert
		}
	}

	// upon checking/unchecking all to-dos
	const checkAllTodos = (completed: boolean) => {
		todos = todos.map((t) => ({ ...t, completed }));
		$alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} tasks!`; // alert
	};

	// upon removing any completed to-dos
	const removeCompletedTodos = () => {
		$alert = `Removed ${todos.filter((t) => t.completed).length} tasks!`; // alert
		todos = todos.filter((t) => !t.completed);
	};
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<!-- NewTodo -->
	<NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

	<!-- Filter -->
	<FilterButton bind:filter />

	<!-- TodosStatus -->
	<TodosStatus bind:this={todosStatus} {todos} />

	<!-- To-dos -->
	<ul class="todo-list stack-large" aria-labelledby="list-heading">
		{#each filterTodos(filter, todos) as todo (todo.id)}
		<li class="todo">
			<Todo {todo} on:update={(e) => updateTodo(e.detail)} on:remove={(e) =>
			removeTodo(e.detail)} />
		</li>
		{:else} <!-- if a filter has no items -->
		<li class="empty">There's nothing here!</li>
		{/each}
	</ul>

	<!-- MoreActions -->
	<MoreActions {todos}
		on:checkAll={(e) => checkAllTodos(e.detail)}
		on:removeCompleted={removeCompletedTodos}/>
</div>