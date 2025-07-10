<script lang="ts">
	import type { Todo } from "$lib/todo";
	const { todo } = $props<{ todo: Todo }>();
</script>

<h2>{todo.id}</h2>
