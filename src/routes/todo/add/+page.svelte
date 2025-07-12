<script lang="ts">
	import { goto, replaceState } from "$app/navigation";
	import { create } from "$lib/api";
	import type { TodoRequest } from "$lib/todo.js";
	import { onMount } from "svelte";

	let title = $state("");
	let description = $state("");
	let dueDate = $state("");
	let isImportant = $state(false);
	let isUrgent = $state(false);
	let error = $state("");

	let bgColor: String = $derived.by(() => {
		console.log(isImportant, isUrgent);
		if (isImportant && isUrgent) return "danger";
		else if (isImportant) return "success";
		else if (isUrgent) return "primary";
		else return "info";
	});

	async function creatTodo() {
		if (title == "") {
			error = "Title Can't be Empty.";
			return;
		}
		const todoRequest: TodoRequest = {
			title: title,
			description: description,
			dueDate: dueDate,
			isDone: false,
			isUrgent: isUrgent,
			isImportant: isImportant,
		};
		create(todoRequest)
			.then(() => goto("/", { replaceState: true }))
			.catch((err) => (error = err.message));
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
		bind:value={title}
		placeholder="Enter title"
	></textarea>
	<div class="p-2">
		<textarea
			class="d-block w-100 border-0 mb-2 p-2"
			name="description"
			id="description"
			bind:value={description}
			placeholder="Enter description"
		></textarea>
		<input
			class="border-0 d-block mb-2"
			type="date"
			bind:value={dueDate}
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
		{#if error}
			<div class="alert alert-danger border-radius-0">
				<p><strong>Error: </strong>{error}</p>
			</div>
		{/if}
	</div>

	<button
		class={"btn btn-" + bgColor}
		onclick={creatTodo}
		style="position: fixed; right: 24px; bottom: 24px;"
	>
		<i class="bi bi-check-lg"></i>
	</button>
</div>
