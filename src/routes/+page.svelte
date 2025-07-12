<script lang="ts">
	import { replaceState } from "$app/navigation";
	import { getOfDueDate } from "$lib/api";
	import TodoItem from "$lib/components/TodoItem.svelte";
	import type { Todo } from "$lib/todo";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let error: Error | null = $state(null);
	let impAndUrgentTodos: Todo[] = $state([]);
	let impAndNonUrgentTodos: Todo[] = $state([]);
	let nonImpAndUrgentTodos: Todo[] = $state([]);
	let nonImpAndNonUrgentTodos: Todo[] = $state([]);

	let date: string = $state(new Date().toISOString().split("T")[0]);

	async function getTodos() {
		getOfDueDate(date)
			.then((todos) => {
				const iut: Todo[] = [];
				const niut: Todo[] = [];
				const inut: Todo[] = [];
				const ninut: Todo[] = [];
				console.log(todos);
				todos.forEach((todo) => {
					if (todo.isImportant && todo.isUrgent)
						iut.push(todo);
					else if (todo.isImportant)
						inut.push(todo);
					else if (todo.isUrgent) niut.push(todo);
					else ninut.push(todo);
				});
				impAndUrgentTodos = [...iut];
				impAndNonUrgentTodos = [...inut];
				nonImpAndUrgentTodos = [...niut];
				nonImpAndNonUrgentTodos = [...ninut];
				console.log($state.snapshot(impAndUrgentTodos));
			})
			.catch((e) => (error = e));
	}
	$effect(() => {
		getTodos();
	});
</script>

<div class="m-4">
	<input
		class="h1 border-0"
		type="date"
		bind:value={date}
		onchange={getTodos}
	/>
	<div class="row">
		<div class="col-sm border border-danger p-0 m-1">
			<h2 class="bg-danger p-2">Important and Urgent</h2>
			<div>
				{#each impAndUrgentTodos as todo (todo.id)}
					<TodoItem {todo} />
				{/each}
			</div>
		</div>
		<div class="col-sm border border-success p-0 m-1">
			<h2 class="bg-success p-2">Important and Not Urgent</h2>
			<div>
				{#each impAndNonUrgentTodos as todo (todo.id)}
					<TodoItem {todo} />
				{/each}
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm border border-primary p-0 m-1">
			<h2 class="bg-primary p-2">Not Important and Urgent</h2>
			<div>
				{#each nonImpAndUrgentTodos as todo (todo.id)}
					<TodoItem {todo} />
				{/each}
			</div>
		</div>
		<div class="col-sm border border-info p-0 m-1">
			<h2 class="bg-info p-2">
				Not Important and Non Urgent
			</h2>
			<div>
				{#each nonImpAndNonUrgentTodos as todo (todo.id)}
					<TodoItem {todo} />
				{/each}
			</div>
		</div>
	</div>
	<button
		class="btn btn-secondary"
		style="position: fixed; right: 24px; bottom: 24px;"
		onclick={() => goto("/todo/add", { replaceState: false })}
	>
		<i class="bi bi-plus-circle"></i>
	</button>
</div>
