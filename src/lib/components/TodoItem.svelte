<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Todo, TodoRequest } from "$lib/todo";
	import { update } from "$lib/api";

	const props = $props<{ todo: Todo }>();
	const todo = props.todo as Todo;

	function goToTodo() {
		goto(`/todo/${todo.id}`);
	}

	async function updateIsDone() {
		const todoRequest: TodoRequest = {
			title: todo.title,
			description: todo.description,
			dueDate: todo.dueDate,
			isDone: !todo.isDone,
			isUrgent: todo.isUrgent,
			isImportant: todo.isImportant,
		};
		update(todo.id, todoRequest)
			.then((updateTodo) => (todo.isDone = updateTodo.isDone))
			.catch((e) => console.log(e));
	}
</script>

<div
	class="row p-2"
	style="text-decoration: {todo.isDone ? 'line-through' : 'none'};"
>
	<div
		class="col-1 align-content-start justify-content-end m-0 p-0"
		onclick={updateIsDone}
		style="cursor: pointer;"
	>
		<p class="p-0 m-0 float-end">-</p>
	</div>
	<div class="col-11" onclick={goToTodo} style="cursor: pointer;">
		<p class="m-0">{todo.title}</p>
		<p class="text-secondary">{todo.description}</p>
	</div>
</div>
