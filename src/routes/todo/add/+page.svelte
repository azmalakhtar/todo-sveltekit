<script lang="ts">
	import { goto, replaceState } from "$app/navigation";
	import { create } from "$lib/api";
	import type { TodoRequest } from "$lib/todo.js";

	let error = $state("");

	const todo: TodoRequest = {
		title: "",
		description: "",
		dueDate: "",
		isDone: false,
		isUrgent: false,
		isImportant: false,
	};

	async function updateTodo() {
		create(todo)
			.then((td) => goto("/", { replaceState: true }))
			.catch((err) => (error = err.message));
	}
</script>

<input type="text" bind:value={todo.title} />
<input type="text" bind:value={todo.description} />
<input type="date" bind:value={todo.dueDate} />

<button onclick={updateTodo}>Update</button>

{#if error}
	<p style="color: red">{error}</p>
{/if}

{#if todo.isImportant}
	<p style="color: green;">Important</p>
{/if}
{#if todo.isUrgent}
	<p style="color: red;">Urgent</p>
{/if}
