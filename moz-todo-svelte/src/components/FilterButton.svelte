<!-- components/FilterButton.svelte -->

<script lang="ts">
	// import
	import { Filter } from "../types/filter.enum";

	// export
	export let filter: Filter = Filter.ALL;
</script>

<div class="filters btn-group stack-exception">
	<!-- the All button -->
	<button class="btn toggle-btn" class:btn__primary={filter === Filter.ALL} aria-pressed={filter === Filter.ALL} on:click={()=> filter = Filter.ALL} >
		<!-- hide -->
		<span class="visually-hidden">Show</span>
		<!-- show -->
		<span>all</span>
		<!-- hide -->
		<span class="visually-hidden">tasks</span>
	</button>
	<!-- the Unchecked button -->
	<button class="btn toggle-btn" class:btn__primary={filter === Filter.ACTIVE} aria-pressed={filter === Filter.ACTIVE} on:click={()=> filter = Filter.ACTIVE} >
		<!-- hide -->
		<span class="visually-hidden">Show</span>
		<!-- show -->
		<span>unchecked</span>
		<!-- hide -->
		<span class="visually-hidden">tasks</span>
	</button>
	<!-- the Checked button -->
	<button class="btn toggle-btn" class:btn__primary={filter === Filter.COMPLETED} aria-pressed={filter === Filter.COMPLETED} on:click={()=> filter = Filter.COMPLETED} >
		<!-- hide -->
		<span class="visually-hidden">Show</span>
		<!-- show -->
		<span>checked</span>
		<!-- hide -->
		<span class="visually-hidden">tasks</span>
	</button>
</div>