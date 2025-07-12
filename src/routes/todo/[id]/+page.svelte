<script lang="ts">
	import { goto, replaceState } from "$app/navigation";
	import { update, deleteById } from "$lib/api";
	import type { TodoRequest } from "$lib/todo.js";
	import { onMount } from "svelte";

	const { data } = $props();
	const todo = data.todo;

	let isImportant = $state(todo.isImportant);
	let isUrgent = $state(todo.isUrgent);

	let bgColor: String = $derived.by(() => {
		console.log(isImportant, isUrgent);
		if (isImportant && isUrgent) return "danger";
		else if (isImportant) return "success";
		else if (isUrgent) return "primary";
		else return "info";
	});

	async function updateTodo() {
		const todoRequest: TodoRequest = {
			title: todo.title,
			description: todo.description,
			dueDate: todo.dueDate,
			isDone: todo.isDone,
			isUrgent: isUrgent,
			isImportant: isImportant,
		};
		await update(todo.id, todoRequest);
		goto("/", { replaceState: true });
	}

	async function deleteTodo() {
		console.log("dt");
		console.log(todo);
		await deleteById(todo.id);
		console.log("dt-d");
		goto("/", { replaceState: true });
	}
	onMount(() => {
		document.querySelectorAll("textarea").forEach(
			function (textarea) {
				textarea.style.height =
					textarea.scrollHeight + "px";
				textarea.style.overflowY = "hidden";

				textarea.addEventListener("input", function () {
					this.style.height = "auto";
					this.style.height =
						this.scrollHeight + "px";
				});
			},
		);
	});
</script>

<div class={"m-5 border" + " border-" + bgColor}>
	<textarea
		class={"h3 d-block w-100 border-0 mb-2 p-2" +
			" bg-" +
			bgColor +
			" text-bg-" +
			bgColor}
		name="title"
		id="title"
		bind:value={todo.title}
	></textarea>
	<div class="p-2">
		<textarea
			class="d-block w-100 border-0 mb-2 p-2 ms-1"
			name="description"
			id="description"
			bind:value={todo.description}
		></textarea>
		<input
			class="border-0 d-block mb-2"
			type="date"
			bind:value={todo.dueDate}
		/>

		<div class="row ms-1 mb-2">
			<div class="col-sm">
				<input
					type="checkbox"
					id="important"
					bind:checked={isImportant}
				/>
				<label for="important"> Important </label>
			</div>

			<div class="col-sm">
				<input
					type="checkbox"
					id="urgent"
					bind:checked={isUrgent}
				/>
				<label for="urgent"> Urgent </label>
			</div>
		</div>
	</div>

	<button
		class={"btn btn-" + bgColor}
		onclick={updateTodo}
		style="position: fixed; right: 24px; bottom: 24px;"
	>
		<i class="bi bi-check-lg"></i>
	</button>

	<button
		class={"btn btn-" + bgColor}
		onclick={deleteTodo}
		style="position: fixed; left: 24px; bottom: 24px;"
	>
		<i class="bi bi-trash-fill"></i>
	</button>
</div>
