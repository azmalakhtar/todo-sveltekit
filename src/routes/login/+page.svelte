<script lang="ts">
	import { goto } from "$app/navigation";
	import { login } from "$lib/api";
	import { onMount } from "svelte";

	let email = $state("a@gmail.com");
	let password = $state("a@123");

	let error = $state("");

	async function doLogin() {
		login(email, password)
			.then(() => {
				goto("/", { replaceState: true });
			})
			.catch((e: Error) => (error = e.message));
	}
	// WARN: Just for development
	onMount(doLogin);
</script>

<input type="email" placeholder="Email" bind:value={email} />
<input type="password" placeholder="Password" bind:value={password} />

<button onclick={doLogin}>Login</button>

{#if error}
	<p style="color: red;">{error}</p>
{/if}
